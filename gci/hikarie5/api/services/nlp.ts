import natural from 'natural'

const tokenizer = new natural.WordTokenizer()
const sentiment = new natural.SentimentAnalyzer('English', natural.PorterStemmer, 'afinn')

export interface NLPResult {
  mood: string
  score: number
  tags: string[]
  preferences: {
    likes: string[]
    dislikes: string[]
    interests: string[]
    avoidances: string[]
  }
}

// Basic keyword mapping for preferences (can be expanded)
const preferenceRules: Record<string, string[]> = {
  likes: ['delicious', 'love', 'enjoy', 'favorite', 'best', 'good', 'happy with'],
  dislikes: ['hate', 'bad', 'terrible', 'worst', 'dislike', 'annoying', 'pain'],
  interests: ['learn', 'study', 'read', 'watch', 'explore', 'interested', 'curious'],
  avoidances: ['avoid', 'scared', 'afraid', 'worry', 'anxious', 'stress', 'hard']
}

// Basic category mapping for tags
const tagCategories: Record<string, string[]> = {
  sweets: ['cake', 'chocolate', 'candy', 'sugar', 'cookie', 'dessert'],
  study: ['course', 'class', 'homework', 'exam', 'study', 'learn', 'school'],
  tech: ['app', 'code', 'program', 'computer', 'windows', 'linux', 'mac', 'phone'],
  family: ['mom', 'dad', 'sister', 'brother', 'family', 'parents'],
  food: ['meal', 'dinner', 'lunch', 'breakfast', 'eat', 'food']
}

export const analyzeText = (text: string): NLPResult => {
  const tokens = tokenizer.tokenize(text)
  const score = sentiment.getSentiment(tokens)

  // Determine mood based on sentiment score and keywords
  let mood = 'neutral'
  if (score > 2) mood = 'excited'
  else if (score > 0.5) mood = 'happy'
  else if (score > 0) mood = 'calm'
  else if (score < -2) mood = 'stressed'
  else if (score < -0.5) mood = 'anxious'
  else if (score < 0) mood = 'tired'

  // Extract tags (nouns/topics)
  // Simplified: check against known categories + basic noun extraction
  const tags: Set<string> = new Set()
  const lowerText = text.toLowerCase()

  for (const [category, keywords] of Object.entries(tagCategories)) {
    if (keywords.some(k => lowerText.includes(k))) {
      tags.add(category)
    }
  }
  
  // Add some tokens as tags if they are significant (simplified)
  tokens.forEach(token => {
    if (token.length > 4 && !natural.stopwords.includes(token.toLowerCase())) {
       // Ideally we would do POS tagging here to find Nouns
       // For now, just add longer non-stop words as potential event tags
       // Limit to a few to avoid spam
       if (tags.size < 10) tags.add(token.toLowerCase())
    }
  })

  // Detect preferences
  const preferences = {
    likes: [] as string[],
    dislikes: [] as string[],
    interests: [] as string[],
    avoidances: [] as string[]
  }

  // Sentence splitting
  const sentences = text.split(/[.!?]+/)
  
  sentences.forEach(sentence => {
    const lowerSentence = sentence.toLowerCase()
    
    // Check for patterns
    // Like: "Cake was delicious" -> delicious found, look for nouns near it
    // This is very simplified. A real system would use dependency parsing.
    
    if (preferenceRules.likes.some(w => lowerSentence.includes(w))) {
      // Find what is liked.
      // Heuristic: check if any tag category is present in this sentence
      for (const [category, keywords] of Object.entries(tagCategories)) {
        if (keywords.some(k => lowerSentence.includes(k))) {
          if (!preferences.likes.includes(category)) preferences.likes.push(category)
        }
      }
    }

    if (preferenceRules.dislikes.some(w => lowerSentence.includes(w))) {
      for (const [category, keywords] of Object.entries(tagCategories)) {
        if (keywords.some(k => lowerSentence.includes(k))) {
           if (!preferences.dislikes.includes(category)) preferences.dislikes.push(category)
        }
      }
    }

    if (preferenceRules.interests.some(w => lowerSentence.includes(w))) {
      for (const [category, keywords] of Object.entries(tagCategories)) {
        if (keywords.some(k => lowerSentence.includes(k))) {
           if (!preferences.interests.includes(category)) preferences.interests.push(category)
        }
      }
    }

    if (preferenceRules.avoidances.some(w => lowerSentence.includes(w))) {
      for (const [category, keywords] of Object.entries(tagCategories)) {
        if (keywords.some(k => lowerSentence.includes(k))) {
           if (!preferences.avoidances.includes(category)) preferences.avoidances.push(category)
        }
      }
    }
  })

  return {
    mood,
    score,
    tags: Array.from(tags),
    preferences
  }
}
