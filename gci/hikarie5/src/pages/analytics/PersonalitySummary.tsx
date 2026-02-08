import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import PersonalityRadar from '../../components/charts/PersonalityRadar'

interface InnerPortfolio {
  traits: Record<string, number>
  narrative?: {
    personality_profile: string
    emotional_trajectory: string
    interests_analysis: string
    life_patterns: string[]
    strengths_growth: {
      strengths: string[]
      growth_areas: string[]
    }
    long_term_story: string
  }
  highlights?: Array<{
    date: string
    summary: string
    score: number
  }>
  stats?: {
    total_entries: number
    mood_counts: Record<string, number>
  }
}

const PersonalitySummary = () => {
  const { token } = useAuthStore()
  const [portfolio, setPortfolio] = useState<InnerPortfolio | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await fetch('/api/analytics/personality', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        const data = await response.json()
        if (data.success) {
          // Check if data.traits is the full portfolio or just traits
          if (data.traits && data.traits.narrative) {
            setPortfolio(data.traits)
          } else {
            // Backward compatibility
            setPortfolio({ traits: data.traits })
          }
        }
      } catch (error) {
        console.error('Failed to fetch personality', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPortfolio()
  }, [token])

  if (loading) return <div className="text-center py-10">Loading Your Inner Portfolio...</div>

  const hasNarrative = portfolio?.narrative
  const traits = portfolio?.traits || {}

  return (
    <div className="max-w-6xl mx-auto space-y-8 px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Your Inner Portfolio
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            A comprehensive psychological profile based on your memU journey.
          </p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <Link
            to="/dashboard"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>

      {portfolio && Object.keys(traits).length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Narrative & Story */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Long-Term Summary */}
            {hasNarrative && (
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
                <h2 className="text-xl font-bold mb-4">Your Story</h2>
                <p className="text-lg leading-relaxed opacity-95">
                  {portfolio.narrative!.long_term_story}
                </p>
              </div>
            )}

            {/* Personality Profile */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Personality Profile</h2>
              {hasNarrative ? (
                <p className="text-gray-700 leading-relaxed">{portfolio.narrative!.personality_profile}</p>
              ) : (
                 <p className="text-gray-500 italic">Analysis pending next diary entry...</p>
              )}
            </div>

             {/* Emotional Trajectory */}
             <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Emotional Trajectory</h2>
              {hasNarrative ? (
                <p className="text-gray-700 leading-relaxed">{portfolio.narrative!.emotional_trajectory}</p>
              ) : (
                 <p className="text-gray-500 italic">Analysis pending...</p>
              )}
            </div>

            {/* Life Patterns */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Life Patterns & Habits</h2>
              {hasNarrative && portfolio.narrative!.life_patterns.length > 0 ? (
                <ul className="space-y-3">
                  {portfolio.narrative!.life_patterns.map((pattern, i) => (
                    <li key={i} className="flex items-start">
                      <span className="flex-shrink-0 h-5 w-5 text-indigo-500 mr-2">•</span>
                      <span className="text-gray-700">{pattern}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 italic">No strong patterns detected yet.</p>
              )}
            </div>

            {/* Highlights */}
             <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Positive Memory Highlights</h2>
              {portfolio.highlights && portfolio.highlights.length > 0 ? (
                <div className="space-y-4">
                  {portfolio.highlights.map((highlight, i) => (
                    <div key={i} className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r">
                      <div className="flex justify-between items-start">
                        <p className="text-gray-800 italic">"{highlight.summary}"</p>
                        <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">
                          {new Date(highlight.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">Keep writing to capture your golden moments.</p>
              )}
            </div>

          </div>

          {/* Right Column: Charts & Stats */}
          <div className="space-y-8">
            
            {/* Radar Chart */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 text-center">Trait Balance</h2>
              <PersonalityRadar traits={traits} />
            </div>

            {/* Strengths & Growth */}
            {hasNarrative && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Growth Analysis</h2>
                
                <div className="mb-6">
                  <h3 className="font-semibold text-green-600 mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    Your Strengths
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {portfolio.narrative!.strengths_growth.strengths.map((s, i) => (
                      <span key={i} className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-blue-600 mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                    Growth Areas
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {portfolio.narrative!.strengths_growth.growth_areas.map((s, i) => (
                      <span key={i} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Interests */}
            {hasNarrative && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Interest Analysis</h2>
                <p className="text-gray-700">{portfolio.narrative!.interests_analysis}</p>
              </div>
            )}

          </div>
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-lg shadow">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No Portfolio Yet</h3>
          <p className="mt-1 text-sm text-gray-500">Start writing diary entries to generate your personalized Inner Portfolio.</p>
          <div className="mt-6">
            <Link
              to="/diary/new"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Write First Entry
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default PersonalitySummary
