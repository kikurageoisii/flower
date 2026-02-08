import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

const ResumePage = () => {
  const { token } = useAuthStore()
  const [portfolio, setPortfolio] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const headers = { 'Authorization': `Bearer ${token}` }
        const response = await fetch('/api/analytics/personality', { headers })
        const data = await response.json()
        if (data.success) {
          setPortfolio(data.traits)
        }
      } catch (error) {
        console.error('Failed to fetch portfolio', error)
      } finally {
        setLoading(false)
      }
    }

    if (token) fetchPortfolio()
  }, [token])

  if (loading) return <div className="text-center py-10">Loading Resume...</div>

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Your Personal Resume</h1>
        <div className="space-x-4">
            <Link to="/dashboard" className="text-indigo-600 hover:text-indigo-800 font-medium">
                Go to Dashboard &rarr;
            </Link>
        </div>
      </div>

      <div className="bg-white shadow-xl rounded-lg overflow-hidden border-t-4 border-indigo-600">
        <div className="p-8 space-y-10">
          
          {/* 1. Strengths & Weaknesses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-lg uppercase tracking-wider text-gray-500 font-bold mb-4 border-b-2 border-gray-100 pb-2">Strengths</h3>
              <div className="space-y-4">
                {portfolio?.narrative?.strengths_growth?.strengths?.length > 0 ? (
                  portfolio.narrative.strengths_growth.strengths.map((item: any, i: number) => (
                    <div key={i} className="bg-green-50 p-4 rounded-lg border border-green-100">
                      <span className="inline-block px-3 py-1 bg-green-200 text-green-800 text-sm font-bold rounded-full mb-2">
                        {item.trait}
                      </span>
                      <p className="text-gray-700 italic">"{item.evidence}"</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 italic p-4 bg-gray-50 rounded-lg border border-gray-100">
                    Not enough data yet. Write more diary entries to unlock your strengths analysis.
                  </p>
                )}
              </div>
            </div>
            <div>
              <h3 className="text-lg uppercase tracking-wider text-gray-500 font-bold mb-4 border-b-2 border-gray-100 pb-2">Growth Areas</h3>
              <div className="space-y-4">
                {portfolio?.narrative?.strengths_growth?.growth_areas?.length > 0 ? (
                  portfolio.narrative.strengths_growth.growth_areas.map((item: any, i: number) => (
                    <div key={i} className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                      <span className="inline-block px-3 py-1 bg-blue-200 text-blue-800 text-sm font-bold rounded-full mb-2">
                        {item.area}
                      </span>
                      <p className="text-gray-700 italic">"{item.context}"</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 italic p-4 bg-gray-50 rounded-lg border border-gray-100">
                    Not enough data yet. Write more diary entries to identify growth areas.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* 2. History of Efforts */}
          <div>
            <h3 className="text-lg uppercase tracking-wider text-gray-500 font-bold mb-4 border-b-2 border-gray-100 pb-2">History of Efforts</h3>
            <ul className="space-y-3">
              {portfolio?.narrative?.history_of_efforts?.length > 0 ? (
                 portfolio.narrative.history_of_efforts.map((item: string, i: number) => (
                  <li key={i} className="flex items-start text-gray-700 bg-gray-50 p-3 rounded-md">
                    <span className="mr-3 text-indigo-500 font-bold text-xl">•</span>
                    <span className="self-center">{item}</span>
                  </li>
                ))
              ) : (
                <li className="text-gray-500 italic p-4 bg-gray-50 rounded-lg border border-gray-100 list-none">
                  Not enough data yet. Write more diary entries to reveal your history of efforts.
                </li>
              )}
            </ul>
          </div>

          {/* 3. Categorized Interests */}
          <div>
            <h3 className="text-lg uppercase tracking-wider text-gray-500 font-bold mb-4 border-b-2 border-gray-100 pb-2">Interests Profile</h3>
            
            {portfolio?.narrative?.categorized_interests ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Intellectual */}
                <div className="bg-gray-50 p-5 rounded-lg">
                   <h4 className="text-sm font-bold text-gray-700 mb-3 uppercase flex items-center">
                        <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                        Intellectual
                   </h4>
                   <div className="flex flex-wrap gap-2">
                     {portfolio.narrative.categorized_interests.intellectual.length > 0 ? (
                       portfolio.narrative.categorized_interests.intellectual.map((t: string, i: number) => (
                         <span key={i} className="text-sm text-gray-700 bg-white border border-gray-200 px-2 py-1 rounded shadow-sm">{t}</span>
                       ))
                     ) : <span className="text-sm text-gray-400 italic">None detected</span>}
                   </div>
                </div>
                
                {/* Lifestyle */}
                <div className="bg-gray-50 p-5 rounded-lg">
                   <h4 className="text-sm font-bold text-gray-700 mb-3 uppercase flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        Lifestyle
                   </h4>
                   <div className="flex flex-wrap gap-2">
                     {portfolio.narrative.categorized_interests.lifestyle.length > 0 ? (
                       portfolio.narrative.categorized_interests.lifestyle.map((t: string, i: number) => (
                         <span key={i} className="text-sm text-gray-700 bg-white border border-gray-200 px-2 py-1 rounded shadow-sm">{t}</span>
                       ))
                     ) : <span className="text-sm text-gray-400 italic">None detected</span>}
                   </div>
                </div>

                {/* Social */}
                <div className="bg-gray-50 p-5 rounded-lg">
                   <h4 className="text-sm font-bold text-gray-700 mb-3 uppercase flex items-center">
                        <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                        Social
                   </h4>
                   <div className="flex flex-wrap gap-2">
                     {portfolio.narrative.categorized_interests.social.length > 0 ? (
                       portfolio.narrative.categorized_interests.social.map((t: string, i: number) => (
                         <span key={i} className="text-sm text-gray-700 bg-white border border-gray-200 px-2 py-1 rounded shadow-sm">{t}</span>
                       ))
                     ) : <span className="text-sm text-gray-400 italic">None detected</span>}
                   </div>
                </div>

                {/* General Likes */}
                <div className="bg-gray-50 p-5 rounded-lg">
                   <h4 className="text-sm font-bold text-gray-700 mb-3 uppercase flex items-center">
                        <span className="w-2 h-2 bg-pink-500 rounded-full mr-2"></span>
                        General Likes
                   </h4>
                   <div className="flex flex-wrap gap-2">
                     {portfolio.narrative.categorized_interests.likes.length > 0 ? (
                       portfolio.narrative.categorized_interests.likes.map((t: string, i: number) => (
                         <span key={i} className="text-sm text-gray-700 bg-white border border-gray-200 px-2 py-1 rounded shadow-sm">{t}</span>
                       ))
                     ) : <span className="text-sm text-gray-400 italic">None detected</span>}
                   </div>
                </div>

                 {/* Avoidances */}
                 <div className="bg-red-50 p-5 rounded-lg sm:col-span-2 lg:col-span-1">
                   <h4 className="text-sm font-bold text-red-700 mb-3 uppercase flex items-center">
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                        Avoidances
                   </h4>
                   <div className="flex flex-wrap gap-2">
                     {portfolio.narrative.categorized_interests.avoidances.length > 0 ? (
                       portfolio.narrative.categorized_interests.avoidances.map((t: string, i: number) => (
                         <span key={i} className="text-sm text-red-700 bg-white border border-red-200 px-2 py-1 rounded shadow-sm">{t}</span>
                       ))
                     ) : <span className="text-sm text-gray-400 italic">None detected</span>}
                   </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 italic p-4 bg-gray-50 rounded-lg border border-gray-100">
                Not enough data yet. Write more diary entries to unlock your interests profile.
              </p>
            )}
          </div>

        </div>
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 text-center">
           <Link to="/analytics/personality" className="text-indigo-600 font-semibold hover:text-indigo-800">
              View Full Detailed Portfolio &rarr;
           </Link>
        </div>
      </div>
    </div>
  )
}

export default ResumePage