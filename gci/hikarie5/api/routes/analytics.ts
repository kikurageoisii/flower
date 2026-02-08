import { Router, type Response } from 'express'
import { authenticateToken, type AuthRequest } from '../middleware/auth.js'
import { supabase, BACKEND_SECRET } from '../db.js'

const router = Router()

/**
 * Get Mood History
 * GET /api/analytics/mood-history
 */
router.get('/mood-history', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id
    
    // Use get_diary_entries RPC
    const { data: entries, error } = await supabase
      .rpc('get_diary_entries', {
        p_secret: BACKEND_SECRET,
        p_user_id: userId,
        p_start_date: null,
        p_end_date: null
      })

    if (error) {
      console.error('Mood history error:', error)
      res.status(500).json({ success: false, error: 'Failed to fetch mood history' })
      return
    }

    // Sort by date ascending for graph
    const sortedEntries = (entries || []).sort((a: any, b: any) => 
      new Date(a.entry_date).getTime() - new Date(b.entry_date).getTime()
    )

    const moodData = sortedEntries.map((e: any) => ({
      id: e.id,
      date: e.entry_date,
      mood: e.analysis_data?.mood || 'neutral',
      score: e.analysis_data?.score || 0,
      summary: (e.analysis_data?.raw_text_override || e.raw_text).substring(0, 100) + '...'
    }))

    res.status(200).json({
      success: true,
      mood_data: moodData
    })

  } catch (error) {
    console.error('Analytics error:', error)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
})

/**
 * Get Personality Profile
 * GET /api/analytics/personality
 */
router.get('/personality', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id

    const { data: profile, error } = await supabase
      .rpc('get_personality', {
        p_secret: BACKEND_SECRET,
        p_user_id: userId
      })

    if (error) {
      console.error('Personality fetch error:', error)
      res.status(500).json({ success: false, error: 'Failed to fetch personality' })
      return
    }

    res.status(200).json({
      success: true,
      traits: profile || {},
      last_updated: new Date().toISOString() // Approximate since RPC only returns traits
    })

  } catch (error) {
    console.error('Analytics error:', error)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
})

/**
 * Get Tags (Tag Cloud)
 * GET /api/analytics/tags
 */
router.get('/tags', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id

    // Fetch entries via RPC and aggregate tags
    const { data: entries, error } = await supabase
      .rpc('get_diary_entries', {
        p_secret: BACKEND_SECRET,
        p_user_id: userId,
        p_start_date: null,
        p_end_date: null
      })

    if (error) {
      console.error('Tags fetch error:', error)
      res.status(500).json({ success: false, error: 'Failed to fetch tags' })
      return
    }

    // Aggregate tags from analysis_data
    const tagCounts: Record<string, number> = {}
    entries?.forEach((e: any) => {
      const tags = e.analysis_data?.tags || []
      tags.forEach((tag: string) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1
      })
    })

    const tagList = Object.entries(tagCounts).map(([text, value]) => ({ text, value }))
    // Sort by frequency
    tagList.sort((a, b) => b.value - a.value)

    res.status(200).json({
      success: true,
      tags: tagList
    })

  } catch (error) {
    console.error('Analytics error:', error)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
})

/**
 * Get Preferences
 * GET /api/analytics/preferences
 */
router.get('/preferences', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id

    const { data: prefs, error } = await supabase
      .rpc('get_preferences', {
        p_secret: BACKEND_SECRET,
        p_user_id: userId
      })

    if (error) {
      console.error('Preferences fetch error:', error)
      res.status(500).json({ success: false, error: 'Failed to fetch preferences' })
      return
    }

    res.status(200).json({
      success: true,
      preferences: {
        likes: prefs?.likes || [],
        dislikes: prefs?.dislikes || [],
        interests: prefs?.interests || [],
        avoidances: prefs?.avoidances || []
      }
    })

  } catch (error) {
    console.error('Analytics error:', error)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
})

export default router
