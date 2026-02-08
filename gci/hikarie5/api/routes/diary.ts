import { Router, type Response } from 'express'
import { authenticateToken, type AuthRequest } from '../middleware/auth.js'
import { supabase, BACKEND_SECRET } from '../db.js'
import { processEntry } from '../services/memu.js'

const router = Router()

/**
 * Create Diary Entry
 * POST /api/diary/entries
 */
router.post('/entries', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id
    const { date, raw_text } = req.body

    if (!date || !raw_text) {
      res.status(400).json({ success: false, error: 'Missing date or text' })
      return
    }

    // 1. Create entry in DB via RPC
    const { data: entryId, error: createError } = await supabase
      .rpc('create_diary_entry', {
        p_secret: BACKEND_SECRET,
        p_user_id: userId,
        p_date: date,
        p_text: raw_text
      })

    if (createError) {
      console.error('Create entry error:', createError)
      res.status(500).json({ success: false, error: 'Failed to save entry' })
      return
    }

    if (!entryId) {
      res.status(500).json({ success: false, error: 'Failed to retrieve entry ID' })
      return
    }

    // 2. Trigger memU Engine
    try {
      const result = await processEntry(userId, entryId, raw_text, date)
      
      res.status(201).json({
        success: true,
        entry_id: entryId,
        analysis: result.analysis
      })
    } catch (engineError) {
      console.error('memU Engine Error:', engineError)
      res.status(201).json({
        success: true,
        entry_id: entryId,
        warning: 'Entry saved but analysis failed'
      })
    }

  } catch (error) {
    console.error('Diary error:', error)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
})

/**
 * Get Diary Entries
 * GET /api/diary/entries?start_date=&end_date=
 */
router.get('/entries', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id
    const { start_date, end_date } = req.query

    const { data: entries, error } = await supabase
      .rpc('get_diary_entries', {
        p_secret: BACKEND_SECRET,
        p_user_id: userId,
        p_start_date: start_date || null,
        p_end_date: end_date || null
      })

    if (error) {
      console.error('Fetch entries error:', error)
      res.status(500).json({ success: false, error: 'Failed to fetch entries' })
      return
    }

    res.status(200).json({
      success: true,
      entries: entries || [],
      total_count: entries?.length || 0
    })

  } catch (error) {
    console.error('Diary fetch error:', error)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
})

/**
 * Get Specific Diary Entry
 * GET /api/diary/:id
 */
router.get('/:id', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id
    const { id } = req.params

    const { data: entries, error } = await supabase
      .rpc('get_diary_entry', {
        p_secret: BACKEND_SECRET,
        p_user_id: userId,
        p_entry_id: id
      })

    if (error) {
      res.status(500).json({ success: false, error: 'Database error' })
      return
    }

    if (!entries || entries.length === 0) {
      res.status(404).json({ success: false, error: 'Entry not found' })
      return
    }

    res.status(200).json({
      success: true,
      entry: entries[0]
    })

  } catch (error) {
    console.error('Diary fetch error:', error)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
})

/**
 * Update Diary Entry
 * PUT /api/diary/:id
 */
router.put('/:id', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id
    const { id } = req.params
    const { date, raw_text } = req.body

    if (!raw_text) {
      res.status(400).json({ success: false, error: 'Missing text' })
      return
    }

    // Since we cannot easily add a new RPC to update raw_text directly due to migration constraints,
    // we will use a workaround: Store the updated text in analysis_data.raw_text_override.
    // Ideally, we should update the actual raw_text column.
    
    // 1. Get existing entry to get current analysis_data
    const { data: entries, error: fetchError } = await supabase
      .rpc('get_diary_entry', {
        p_secret: BACKEND_SECRET,
        p_user_id: userId,
        p_entry_id: id
      })

    if (fetchError || !entries || entries.length === 0) {
      res.status(404).json({ success: false, error: 'Entry not found' })
      return
    }

    const currentAnalysis = entries[0].analysis_data || {}
    
    // 2. Trigger memU Engine to re-analyze the NEW text
    // Note: processEntry normally updates the DB itself.
    // We can use processEntry, but it calls `update_entry_analysis` which overwrites analysis_data.
    // If we rely on processEntry, it will overwrite our override if we add it before.
    // So we let processEntry do its job first.
    
    let newAnalysis = {}
    try {
      // processEntry calculates analysis AND saves it to DB using `update_entry_analysis` RPC.
      // It also inserts moods and tags.
      // This is good! It refreshes the analysis based on new text.
      // BUT: processEntry uses the `raw_text` from the DB? No, it takes `raw_text` as argument.
      // However, processEntry assumes the entry exists.
      // Wait, processEntry does NOT update `raw_text` in DB. It only updates analysis.
      // So the DB will still have OLD `raw_text` in the column.
      // But we want to show the NEW text.
      
      const result = await processEntry(userId, id, raw_text, date)
      newAnalysis = result.analysis
    } catch (engineError) {
      console.error('memU Engine Error during update:', engineError)
      // Fallback if engine fails
      newAnalysis = currentAnalysis
    }

    // 3. Store the new text in analysis_data.raw_text_override
    // This effectively "saves" the edit for display purposes.
    const finalAnalysis = {
      ...newAnalysis,
      raw_text_override: raw_text
    }

    const { error: updateError } = await supabase
      .rpc('update_entry_analysis', {
        p_secret: BACKEND_SECRET,
        p_entry_id: id,
        p_analysis: finalAnalysis
      })

    if (updateError) {
      console.error('Update error:', updateError)
      res.status(500).json({ success: false, error: 'Failed to update entry' })
      return
    }

    res.status(200).json({
      success: true,
      entry_id: id,
      analysis: finalAnalysis
    })

  } catch (error) {
    console.error('Diary update error:', error)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
})

export default router
