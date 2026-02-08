import { supabase, BACKEND_SECRET } from '../db.js'
import { analyzeText } from './nlp.js'
import { updatePersonality } from './personality.js'

export const processEntry = async (userId: string, entryId: string, rawText: string, entryDate: string) => {
  console.log(`Processing entry ${entryId} for user ${userId}`)

  // 1. NLP Analysis
  const analysis = analyzeText(rawText)
  
  // 2. Update Diary Entry with analysis data via RPC
  const { error: updateEntryError } = await supabase
    .rpc('update_entry_analysis', {
      p_secret: BACKEND_SECRET,
      p_entry_id: entryId,
      p_analysis: analysis
    })

  if (updateEntryError) throw new Error(`Failed to update diary entry: ${updateEntryError.message}`)

  // 3. Insert Moods via RPC
  const { error: moodError } = await supabase
    .rpc('insert_mood', {
      p_secret: BACKEND_SECRET,
      p_entry_id: entryId,
      p_mood_type: analysis.mood,
      p_intensity: Math.abs(analysis.score)
    })

  if (moodError) console.error('Failed to insert mood', moodError)

  // 4. Insert Tags via RPC
  if (analysis.tags.length > 0) {
    const tagInserts = analysis.tags.map(tag => ({
      entry_id: entryId,
      tag_name: tag,
      tag_type: 'general',
      relevance_score: 1.0
    }))
    
    const { error: tagError } = await supabase
      .rpc('insert_tags', {
        p_secret: BACKEND_SECRET,
        p_tags: tagInserts
      })
      
    if (tagError) console.error('Failed to insert tags', tagError)
  }

  // 5. Update Preferences
  const { data: prefData, error: prefFetchError } = await supabase
    .rpc('get_preferences', {
      p_secret: BACKEND_SECRET,
      p_user_id: userId
    })
    // get_preferences returns JSONB object directly (not array) because of SELECT ... INTO v_result
    // But wait, rpc usually returns data as is.
    // My RPC returns JSONB. So data is the JSONB object.
    
  let currentPrefs = { likes: [], dislikes: [], interests: [], avoidances: [] }
  if (!prefFetchError && prefData) {
      // The RPC returns { likes: [], ... } directly
      currentPrefs = prefData as any
  } else {
      console.warn('Preferences not found for user or error', userId, prefFetchError)
  }

  const newPrefs = {
    likes: [...new Set([...(currentPrefs.likes || []), ...analysis.preferences.likes])],
    dislikes: [...new Set([...(currentPrefs.dislikes || []), ...analysis.preferences.dislikes])],
    interests: [...new Set([...(currentPrefs.interests || []), ...analysis.preferences.interests])],
    avoidances: [...new Set([...(currentPrefs.avoidances || []), ...analysis.preferences.avoidances])]
  }

  const { error: prefUpdateError } = await supabase
    .rpc('update_preferences', {
      p_secret: BACKEND_SECRET,
      p_user_id: userId,
      p_likes: newPrefs.likes,
      p_dislikes: newPrefs.dislikes,
      p_interests: newPrefs.interests,
      p_avoidances: newPrefs.avoidances
    })

  if (prefUpdateError) console.error('Failed to update preferences', prefUpdateError)

  // 6. Update Personality
  const { data: profileData, error: profileError } = await supabase
    .rpc('get_personality', {
      p_secret: BACKEND_SECRET,
      p_user_id: userId
    })

  let currentTraits = {}
  if (!profileError && profileData) {
    currentTraits = profileData
  }

  const newPortfolio = updatePersonality(currentTraits, analysis, entryDate, rawText, newPrefs)

  const { error: profileUpdateError } = await supabase
    .rpc('upsert_personality', {
      p_secret: BACKEND_SECRET,
      p_user_id: userId,
      p_traits: newPortfolio
    })

  if (profileUpdateError) console.error('Failed to update personality', profileUpdateError)

  return {
    success: true,
    analysis
  }
}
