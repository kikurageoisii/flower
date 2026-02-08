import type { NLPResult } from './nlp.js'

export interface PersonalityTraits {
  extroversion: number
  proactive: number
  sensitivity: number
  planning: number
  stress_tolerance: number
  optimism: number
  sociality: number
  interest_orientation: number
  willpower: number
  energy_level: number
}

const DEFAULT_TRAITS: PersonalityTraits = {
  extroversion: 0.5,
  proactive: 0.5,
  sensitivity: 0.5,
  planning: 0.5,
  stress_tolerance: 0.5,
  optimism: 0.5,
  sociality: 0.5,
  interest_orientation: 0.5,
  willpower: 0.5,
  energy_level: 0.5
}

export interface InnerPortfolio {
  traits: PersonalityTraits
  narrative: {
    personality_profile: string
    emotional_trajectory: string
    interests_analysis: string
    life_patterns: string[]
    strengths_growth: {
      strengths: Array<{ trait: string, evidence: string }>
      growth_areas: Array<{ area: string, context: string }>
    }
    history_of_efforts: string[]
    active_roles: string[]
    long_term_story: string
    categorized_interests: {
      likes: string[]
      intellectual: string[]
      lifestyle: string[]
      social: string[]
      avoidances: string[]
    }
  }
  highlights: Array<{
    date: string
    summary: string
    score: number
  }>
  stats: {
    total_entries: number
    mood_counts: Record<string, number>
    tag_scores: Record<string, { count: number, total_score: number }>
  }
}

const UPDATE_WEIGHT = 0.05

export const updatePersonality = (
  currentData: any | null,
  analysis: NLPResult,
  date: string,
  rawText: string,
  allPreferences?: { likes: string[], dislikes: string[], interests: string[], avoidances: string[] }
): InnerPortfolio => {
  // 1. Initialize or Load State
  const traits: PersonalityTraits = { ...DEFAULT_TRAITS, ...(currentData?.traits || currentData || {}) }
  
  // Handle migration from old format (if currentData is just traits) or new format
  const stats = currentData?.stats || {
    total_entries: 0,
    mood_counts: {},
    tag_scores: {}
  }
  const highlights = currentData?.highlights || []
  
  // 2. Update Numeric Traits (Existing Logic)
  const delta: Partial<PersonalityTraits> = {}

  if (analysis.tags.some(t => ['family', 'friend', 'party', 'social', 'people'].includes(t))) {
    delta.extroversion = 0.1
    delta.sociality = 0.1
  } else if (analysis.tags.some(t => ['alone', 'book', 'game', 'solo'].includes(t))) {
    delta.extroversion = -0.05
    delta.sociality = -0.05
  }

  if (analysis.score > 1) {
    delta.optimism = 0.1
    delta.stress_tolerance = 0.05
  } else if (analysis.score < -1) {
    delta.optimism = -0.1
    delta.stress_tolerance = -0.05
  }

  if (['excited', 'happy', 'energetic'].includes(analysis.mood)) {
    delta.energy_level = 0.1
  } else if (['tired', 'exhausted', 'sleepy'].includes(analysis.mood)) {
    delta.energy_level = -0.1
  }

  if (Math.abs(analysis.score) > 3) {
    delta.sensitivity = 0.1
  }

  if (analysis.preferences.interests.length > 0) {
    delta.interest_orientation = 0.05
  }

  for (const key of Object.keys(DEFAULT_TRAITS) as Array<keyof PersonalityTraits>) {
    if (delta[key] !== undefined) {
      traits[key] = Math.max(0, Math.min(1, traits[key] + (delta[key]! * UPDATE_WEIGHT)))
    }
  }

  // 3. Update Statistics
  stats.total_entries += 1
  stats.mood_counts[analysis.mood] = (stats.mood_counts[analysis.mood] || 0) + 1
  
  analysis.tags.forEach(tag => {
    if (!stats.tag_scores[tag]) {
      stats.tag_scores[tag] = { count: 0, total_score: 0 }
    }
    stats.tag_scores[tag].count += 1
    stats.tag_scores[tag].total_score += analysis.score
  })

  // 4. Update Highlights
  if (analysis.score >= 3) {
    highlights.push({
      date,
      summary: rawText.substring(0, 100) + (rawText.length > 100 ? '...' : ''),
      score: analysis.score
    })
    // Keep top 5 highlights sorted by score
    highlights.sort((a: any, b: any) => b.score - a.score)
    if (highlights.length > 5) highlights.pop()
  }

  // 5. Generate Narratives (Rule-Based)
  const narrative = generateNarrative(traits, stats, analysis, highlights, allPreferences)

  return {
    traits,
    narrative,
    highlights,
    stats
  }
}

// --- Narrative Generators ---

function generateNarrative(
  traits: PersonalityTraits, 
  stats: any, 
  currentAnalysis: NLPResult, 
  highlights: any[],
  allPreferences?: any
) {
  return {
    personality_profile: generateProfile(traits),
    emotional_trajectory: generateEmotionalTrajectory(stats, currentAnalysis),
    interests_analysis: generateInterestsAnalysis(stats, currentAnalysis),
    life_patterns: generateLifePatterns(stats),
    strengths_growth: generateStrengthsAndGrowth(traits, stats),
    history_of_efforts: generateHistoryOfEfforts(stats),
    active_roles: generateActiveRoles(stats, currentAnalysis),
    long_term_story: generateStory(traits, stats, highlights),
    categorized_interests: categorizeInterests(allPreferences, stats)
  }
}

function generateHistoryOfEfforts(stats: any): string[] {
  const efforts = []
  const tags = stats.tag_scores ? Object.keys(stats.tag_scores) : []
  
  if (tags.some(t => ['study', 'learn', 'read', 'course', 'exam'].includes(t))) {
    efforts.push("Continuous Learning: Consistently engaging in educational activities.")
  }
  if (tags.some(t => ['work', 'project', 'job', 'career', 'code'].includes(t))) {
    efforts.push("Professional Development: Dedication to career and project goals.")
  }
  if (tags.some(t => ['gym', 'run', 'workout', 'yoga', 'health'].includes(t))) {
    efforts.push("Physical Well-being: Maintaining a regular fitness routine.")
  }
  if (tags.some(t => ['meditate', 'reflect', 'journal', 'calm'].includes(t))) {
    efforts.push("Emotional Regulation: Practicing mindfulness and self-reflection.")
  }

  if (efforts.length === 0) efforts.push("Exploration: Currently exploring various interests and activities.")
  return efforts
}

function categorizeInterests(prefs: any, stats: any) {
  const result = {
    likes: [] as string[],
    intellectual: [] as string[],
    lifestyle: [] as string[],
    social: [] as string[],
    avoidances: [] as string[]
  }

  const allInterests = new Set([
    ...(prefs?.likes || []), 
    ...(prefs?.interests || []),
    ...(stats.tag_scores ? Object.keys(stats.tag_scores).filter((t: string) => stats.tag_scores[t].count > 1) : [])
  ])

  const avoidances = new Set([...(prefs?.dislikes || []), ...(prefs?.avoidances || [])])

  allInterests.forEach((item: string) => {
    if (['book', 'read', 'study', 'learn', 'code', 'write', 'science', 'art'].some(k => item.includes(k))) {
      result.intellectual.push(item)
    } else if (['run', 'gym', 'food', 'cook', 'sleep', 'walk', 'travel', 'music'].some(k => item.includes(k))) {
      result.lifestyle.push(item)
    } else if (['friend', 'family', 'party', 'social', 'talk', 'meet'].some(k => item.includes(k))) {
      result.social.push(item)
    } else {
      result.likes.push(item)
    }
  })

  result.avoidances = Array.from(avoidances)
  
  // Deduplicate and clean
  result.intellectual = [...new Set(result.intellectual)].slice(0, 5)
  result.lifestyle = [...new Set(result.lifestyle)].slice(0, 5)
  result.social = [...new Set(result.social)].slice(0, 5)
  result.likes = [...new Set(result.likes)].slice(0, 5)
  result.avoidances = [...new Set(result.avoidances)].slice(0, 5)

  return result
}

function generateActiveRoles(stats: any, current: NLPResult): string[] {
  const roles = []
  const tags = stats.tag_scores ? Object.keys(stats.tag_scores) : []

  if (tags.some(t => ['family', 'kids', 'parent'].includes(t))) roles.push("Family Oriented")
  if (tags.some(t => ['friend', 'social', 'party'].includes(t))) roles.push("Social Connector")
  if (tags.some(t => ['work', 'leader', 'team'].includes(t))) roles.push("Team Player")
  if (tags.some(t => ['art', 'music', 'write'].includes(t))) roles.push("Creative Soul")
  if (tags.some(t => ['run', 'gym', 'sport'].includes(t))) roles.push("Active Mover")

  if (roles.length === 0) roles.push("Explorer")
  return roles
}

function generateProfile(traits: PersonalityTraits): string {
  const parts = []
  
  if (traits.extroversion > 0.6) parts.push("You thrive in social settings and gain energy from interacting with others.")
  else if (traits.extroversion < 0.4) parts.push("You value your solitude and often find recharge in quiet, independent activities.")
  
  if (traits.sensitivity > 0.6) parts.push("You have a deep emotional depth and perceive the world with high sensitivity.")
  else if (traits.sensitivity < 0.4) parts.push("You tend to maintain a level-headed and emotionally stable perspective.")

  if (traits.optimism > 0.6) parts.push("Your outlook is characteristically bright, often finding the silver lining in challenges.")
  
  if (parts.length === 0) return "Your personality is balanced and adaptable, showing a mix of various traits depending on the situation."
  
  return parts.join(" ")
}

function generateEmotionalTrajectory(stats: any, current: NLPResult): string {
  const total = stats.total_entries
  if (total < 3) return "Not enough data to determine a long-term trajectory yet."

  const happyCount = (stats.mood_counts['happy'] || 0) + (stats.mood_counts['excited'] || 0)
  const sadCount = (stats.mood_counts['sad'] || 0) + (stats.mood_counts['anxious'] || 0) + (stats.mood_counts['stressed'] || 0)
  
  let trend = ""
  if (happyCount > sadCount * 2) {
    trend = "Your emotional journey has been predominantly positive."
  } else if (sadCount > happyCount) {
    trend = "You have been navigating through some challenging emotional terrain recently."
  } else {
    trend = "Your emotions have been balanced, showing a healthy range of experiences."
  }

  return `${trend} Most recently, you felt ${current.mood}.`
}

function generateInterestsAnalysis(stats: any, current: NLPResult): string {
  // Find top tags by count
  const sortedTags = Object.entries(stats.tag_scores)
    .sort(([, a]: [string, any], [, b]: [string, any]) => b.count - a.count)
    .slice(0, 3)
    .map(([tag]) => tag)

  if (sortedTags.length === 0) return "Your interests are still emerging."

  return `You frequently engage with topics like ${sortedTags.join(', ')}. These appear to be core parts of your daily life.`
}

function generateLifePatterns(stats: any): string[] {
  const patterns = []
  
  // Check correlations
  for (const [tag, data] of Object.entries(stats.tag_scores) as [string, any][]) {
    if (data.count > 2) {
      const avgScore = data.total_score / data.count
      if (avgScore > 2) {
        patterns.push(`Activities involving "${tag}" consistently boost your mood.`)
      } else if (avgScore < -1) {
        patterns.push(`Situations related to "${tag}" tend to be challenging for you.`)
      }
    }
  }

  if (patterns.length === 0) patterns.push("Continue journaling to reveal your unique behavioral patterns.")
  return patterns.slice(0, 4) // Limit to 4
}

function generateStrengthsAndGrowth(traits: PersonalityTraits, stats: any) {
  const strengths = []
  const growth = []

  // Check stats for evidence
  const tags = stats.tag_scores ? Object.keys(stats.tag_scores) : []
  const hasWorkStress = tags.includes('work') && (stats.mood_counts['stressed'] || 0) > 0
  const hasSocial = tags.some((t: string) => ['friend', 'party', 'social'].includes(t))

  if (traits.stress_tolerance > 0.6) {
    strengths.push({
      trait: "Resilience",
      evidence: hasWorkStress 
        ? "Maintains composure even when discussing work challenges." 
        : "Consistently shows emotional stability across entries."
    })
  } else if (traits.stress_tolerance < 0.4) {
    growth.push({
      area: "Stress Management",
      context: "Frequent mentions of feeling overwhelmed or anxious."
    })
  }

  if (traits.proactive > 0.6) {
    strengths.push({
      trait: "Proactivity",
      evidence: "Frequently takes initiative in planning and executing tasks."
    })
  } else if (traits.proactive < 0.4) {
    growth.push({
      area: "Taking Initiative",
      context: "Often expresses hesitation or passivity in decision making."
    })
  }

  if (traits.sociality > 0.6) {
    strengths.push({
      trait: "Collaboration",
      evidence: hasSocial 
        ? "Thrives in group settings and values connection."
        : "Frequently reflects on positive interactions with others."
    })
  } else if (traits.sociality < 0.4) {
    strengths.push({
      trait: "Independence",
      evidence: "Finds strength and recharge in solitary activities."
    })
  }

  if (traits.optimism > 0.6) {
    strengths.push({
      trait: "Positive Outlook",
      evidence: "Maintains a hopeful perspective even in difficult entries."
    })
  }
  
  // Defaults if empty
  if (strengths.length === 0) {
    strengths.push({
      trait: "Adaptability",
      evidence: "Shows a balanced approach to various life situations."
    })
  }
  if (growth.length === 0) {
    growth.push({
      area: "Self-Reflection",
      context: "Could benefit from deeper exploration of personal values."
    })
  }

  return { strengths, growth_areas: growth }
}

function generateStory(traits: PersonalityTraits, stats: any, highlights: any[]): string {
  if (stats.total_entries < 5) {
    return "Your story is just beginning. As you document more of your life, a clearer picture of your personal journey will emerge here."
  }

  return `You are a person who values ${traits.sociality > 0.5 ? "connection" : "independence"} and approaches life with ${traits.optimism > 0.5 ? "optimism" : "realism"}. Over time, you have recorded ${stats.total_entries} memories, creating a rich tapestry of experiences. ${highlights.length > 0 ? "Your journey is punctuated by bright moments of joy, particularly when you are " + (highlights[0].summary.toLowerCase().includes('friend') ? 'with friends.' : 'engaged in what you love.') : ""}`
}
