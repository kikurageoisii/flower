import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import MoodChart from '../../components/charts/MoodChart'

const Dashboard = () => {
  const { token } = useAuthStore()
  const [moodData, setMoodData] = useState<any[]>([])
  const [tags, setTags] = useState<any[]>([])
  const [preferences, setPreferences] = useState<any>({ likes: [], dislikes: [], interests: [], avoidances: [] })
  const [recentEntries, setRecentEntries] = useState<any[]>([])
  const [advice, setAdvice] = useState<any>({ daily: [], weekly: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = { 'Authorization': `Bearer ${token}` }

        const [moodRes, tagsRes, prefRes, entriesRes, adviceRes] = await Promise.all([
          fetch('/api/analytics/mood-history', { headers }),
          fetch('/api/analytics/tags', { headers }),
          fetch('/api/analytics/preferences', { headers }),
          fetch('/api/diary/entries', { headers }),
          fetch('/api/advice', { headers })
        ])

        const moodJson = await moodRes.json()
        const tagsJson = await tagsRes.json()
        const prefJson = await prefRes.json()
        const entriesJson = await entriesRes.json()
        const adviceJson = await adviceRes.json()

        if (moodJson.success) setMoodData(moodJson.mood_data)
        if (tagsJson.success) setTags(tagsJson.tags)
        if (prefJson.success) setPreferences(prefJson.preferences)
        if (entriesJson.success) setRecentEntries(entriesJson.entries.slice(0, 5))
        if (adviceJson.success) setAdvice(adviceJson.advice)

      } catch (error) {
        console.error('Failed to fetch dashboard data', error)
      } finally {
        setLoading(false)
      }
    }

    if (token) fetchData()
  }, [token])

  if (loading) return <div className="text-center py-10">Loading Dashboard...</div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Your Dashboard</h1>
        <Link to="/diary/new" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
          Write New Entry
        </Link>
      </div>

      {/* Resume Section Removed */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mood Graph */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">Mood Trends</h2>
          <div className="h-64">
            {moodData.length > 0 ? (
              <MoodChart data={moodData} />
            ) : (
              <p className="text-gray-500 text-center py-10">No mood data available yet.</p>
            )}
          </div>
          <div className="mt-4 text-right">
            <Link to="/analytics/mood" className="text-indigo-600 text-sm hover:underline">View Full Details &rarr;</Link>
          </div>
        </div>

        {/* Tag Cloud Summary */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">Top Topics</h2>
          <div className="flex flex-wrap gap-2 h-64 overflow-y-auto content-start">
            {tags.length > 0 ? (
              tags.slice(0, 20).map((tag: any, index: number) => (
                <span 
                  key={index} 
                  className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
                  style={{ fontSize: `${Math.max(0.8, Math.min(2, 0.8 + (tag.value / 5)))}rem` }}
                >
                  {tag.text}
                </span>
              ))
            ) : (
              <p className="text-gray-500 text-center w-full py-10">No tags generated yet.</p>
            )}
          </div>
          <div className="mt-4 text-right">
            <Link to="/analytics/tags" className="text-indigo-600 text-sm hover:underline">View All Tags &rarr;</Link>
          </div>
        </div>
      </div>

      {/* Advice Section */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-lg font-medium mb-4">Personalized Advice</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-indigo-600 mb-2">Daily Tips</h3>
            <ul className="list-disc list-inside text-sm text-gray-600">
              {advice.daily && advice.daily.length > 0 ? (
                advice.daily.map((tip: string, i: number) => <li key={i}>{tip}</li>)
              ) : (
                <li>No daily advice yet. Write more entries!</li>
              )}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-purple-600 mb-2">Weekly Focus</h3>
            <ul className="list-disc list-inside text-sm text-gray-600">
              {advice.weekly && advice.weekly.length > 0 ? (
                advice.weekly.map((tip: string, i: number) => <li key={i}>{tip}</li>)
              ) : (
                <li>Keep tracking your mood to see weekly patterns.</li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Preferences Summary */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-medium mb-4">Preferences Snapshot</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <h3 className="font-semibold text-green-600 mb-2">Likes</h3>
            <ul className="list-disc list-inside text-sm text-gray-600">
              {preferences.likes.slice(0, 5).map((item: string, i: number) => <li key={i}>{item}</li>)}
              {preferences.likes.length === 0 && <li>No likes detected yet</li>}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-red-600 mb-2">Dislikes</h3>
            <ul className="list-disc list-inside text-sm text-gray-600">
              {preferences.dislikes.slice(0, 5).map((item: string, i: number) => <li key={i}>{item}</li>)}
              {preferences.dislikes.length === 0 && <li>No dislikes detected yet</li>}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-blue-600 mb-2">Interests</h3>
            <ul className="list-disc list-inside text-sm text-gray-600">
              {preferences.interests.slice(0, 5).map((item: string, i: number) => <li key={i}>{item}</li>)}
              {preferences.interests.length === 0 && <li>No interests detected yet</li>}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-yellow-600 mb-2">Avoidances</h3>
            <ul className="list-disc list-inside text-sm text-gray-600">
              {preferences.avoidances.slice(0, 5).map((item: string, i: number) => <li key={i}>{item}</li>)}
              {preferences.avoidances.length === 0 && <li>No avoidances detected yet</li>}
            </ul>
          </div>
        </div>
        <div className="mt-4 text-right">
          <Link to="/analytics/preferences" className="text-indigo-600 text-sm hover:underline">View Preference Graph &rarr;</Link>
        </div>
      </div>

      {/* Recent Entries */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-medium mb-4">Recent Diary Entries</h2>
        <div className="overflow-hidden">
          {recentEntries.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {recentEntries.map((entry) => (
                <li key={entry.id} className="py-4 hover:bg-gray-50 transition duration-150 ease-in-out">
                  <Link to={`/diary/${entry.id}`} className="block">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <p className="text-sm font-medium text-indigo-600 truncate">
                          {new Date(entry.entry_date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                        <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                          {entry.raw_text}
                        </p>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        {entry.analysis_data?.mood && (
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            ['happy', 'excited', 'calm'].includes(entry.analysis_data.mood) ? 'bg-green-100 text-green-800' :
                            ['sad', 'anxious', 'tired'].includes(entry.analysis_data.mood) ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {entry.analysis_data.mood}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center py-6">No diary entries yet. Start writing today!</p>
          )}
        </div>
        <div className="mt-4 text-right">
          <Link to="/diary/new" className="text-indigo-600 text-sm hover:underline">Write a new entry &rarr;</Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
