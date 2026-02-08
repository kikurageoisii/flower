import { Router, type Response } from 'express'
import { authenticateToken, type AuthRequest } from '../middleware/auth.js'
import { supabase, BACKEND_SECRET } from '../db.js'

const router = Router()

/**
 * Get Homepage Advice
 * GET /api/advice
 */
router.get('/', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id

    // 1. Get latest diary entry for mood via RPC
    const { data: entries, error: entryError } = await supabase
      .rpc('get_diary_entries', {
        p_secret: BACKEND_SECRET,
        p_user_id: userId,
        p_start_date: null,
        p_end_date: null
      })

    let latestEntry = null
    if (!entryError && entries && entries.length > 0) {
      latestEntry = entries[0]
    }

    // 2. Get personality via RPC
    const { data: profile, error: profileError } = await supabase
      .rpc('get_personality', {
        p_secret: BACKEND_SECRET,
        p_user_id: userId
      })

    const mood = latestEntry?.analysis_data?.mood || 'neutral'
    const traits = profile || {} // RPC returns the traits JSONB directly

    // 3. Generate Advice Logic
    const dailyAdvice: string[] = []
    const weeklyAdvice: string[] = []

    // Mood-based advice
    if (mood === 'anxious' || mood === 'stressed') {
      dailyAdvice.push('Take 5 minutes to breathe deeply and ground yourself.')
      dailyAdvice.push('Break your tasks into smaller, manageable steps today.')
    } else if (mood === 'tired') {
      dailyAdvice.push('Prioritize rest today. It’s okay to do less.')
      dailyAdvice.push('Try to get to bed 30 minutes earlier tonight.')
    } else if (mood === 'happy' || mood === 'excited') {
      dailyAdvice.push('Use this energy to tackle a difficult task you’ve been putting off.')
      dailyAdvice.push('Share your positivity with a friend or colleague.')
    } else {
      dailyAdvice.push('A steady day is a good day. Maintain your rhythm.')
    }

    // Personality-based advice (Weekly)
    // extroversion: number // 0-1
    if ((traits.extroversion || 0.5) < 0.3) {
      weeklyAdvice.push('Challenge yourself to initiate one social interaction this week.')
    } else if ((traits.extroversion || 0.5) > 0.7) {
      weeklyAdvice.push('Make sure to schedule some quiet time for reflection this week.')
    }

    if ((traits.stress_tolerance || 0.5) < 0.4) {
       weeklyAdvice.push('Practice mindfulness or meditation to build resilience.')
    }

    if ((traits.interest_orientation || 0.5) > 0.6) { // Growth oriented
      weeklyAdvice.push('Look for a new book or course to satisfy your curiosity.')
    }

    // Default if empty
    if (weeklyAdvice.length === 0) {
      weeklyAdvice.push('Reflect on your goals for the week.')
    }

    res.status(200).json({
      success: true,
      advice: {
        daily: dailyAdvice,
        weekly: weeklyAdvice
      }
    })

  } catch (error) {
    console.error('Advice error:', error)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
})

export default router
