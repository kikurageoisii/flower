import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import MoodChart from '../../components/charts/MoodChart'

interface MoodData {
  id: string
  date: string
  mood: string
  score: number
  summary: string
}

const MoodGraph = () => {
  const { token } = useAuthStore()
  const [moodData, setMoodData] = useState<MoodData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [timeRange, setTimeRange] = useState('all') // 'all', 'month', 'week'

  useEffect(() => {
    const fetchMoodHistory = async () => {
      try {
        const response = await fetch('/api/analytics/mood-history', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch mood history')
        }

        setMoodData(data.mood_data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (token) {
      fetchMoodHistory()
    }
  }, [token])

  const filterData = (data: MoodData[]) => {
    if (timeRange === 'all') return data

    const now = new Date()
    const cutoff = new Date()

    if (timeRange === 'week') {
      cutoff.setDate(now.getDate() - 7)
    } else if (timeRange === 'month') {
      cutoff.setMonth(now.getMonth() - 1)
    }

    return data.filter(d => new Date(d.date) >= cutoff)
  }

  const filteredData = filterData(moodData)

  // Calculate statistics
  const averageScore = filteredData.length > 0 
    ? filteredData.reduce((acc, curr) => acc + curr.score, 0) / filteredData.length 
    : 0

  const dominantMood = filteredData.length > 0
    ? filteredData.sort((a,b) => 
        filteredData.filter(v => v.mood === a.mood).length - 
        filteredData.filter(v => v.mood === b.mood).length
      ).pop()?.mood
    : 'N/A'

  if (loading) return <div className="text-center py-10">Loading mood history...</div>

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Mood Analysis
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Track your emotional trends over time.
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

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="bg-white shadow rounded-lg p-4 mb-8 flex justify-end space-x-2">
        <span className="text-sm text-gray-500 self-center mr-2">Time Range:</span>
        <button
          onClick={() => setTimeRange('week')}
          className={`px-3 py-1 text-sm rounded-md ${timeRange === 'week' ? 'bg-indigo-100 text-indigo-700 font-medium' : 'text-gray-500 hover:bg-gray-100'}`}
        >
          Last 7 Days
        </button>
        <button
          onClick={() => setTimeRange('month')}
          className={`px-3 py-1 text-sm rounded-md ${timeRange === 'month' ? 'bg-indigo-100 text-indigo-700 font-medium' : 'text-gray-500 hover:bg-gray-100'}`}
        >
          Last 30 Days
        </button>
        <button
          onClick={() => setTimeRange('all')}
          className={`px-3 py-1 text-sm rounded-md ${timeRange === 'all' ? 'bg-indigo-100 text-indigo-700 font-medium' : 'text-gray-500 hover:bg-gray-100'}`}
        >
          All Time
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Graph Area */}
        <div className="lg:col-span-2 bg-white shadow rounded-lg p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-6">
            Mood Trend
          </h3>
          <div className="h-80">
            {filteredData.length > 0 ? (
              <MoodChart data={filteredData} />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                No data available for this time range.
              </div>
            )}
          </div>
        </div>

        {/* Statistics Area */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-6">
            Summary
          </h3>
          
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium text-gray-500">Average Mood Score</p>
              <div className="mt-1 flex items-baseline">
                <span className={`text-3xl font-semibold ${averageScore >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {averageScore.toFixed(1)}
                </span>
                <span className="ml-2 text-sm text-gray-500">/ 5.0</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Positive scores indicate happiness/excitement, negative scores indicate stress/anxiety.
              </p>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <p className="text-sm font-medium text-gray-500">Dominant Mood</p>
              <div className="mt-1">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 capitalize">
                  {dominantMood}
                </span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <p className="text-sm font-medium text-gray-500">Total Entries</p>
              <div className="mt-1 text-2xl font-semibold text-gray-900">
                {filteredData.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Entries List */}
      <div className="mt-8 bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Daily Entries ({filteredData.length})
          </h3>
        </div>
        <ul className="divide-y divide-gray-200">
          {filteredData.length > 0 ? (
            // Sort by date descending for list view (newest first)
            [...filteredData].reverse().map((entry) => (
              <li key={entry.id} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                <div className="px-6 py-4 flex items-center justify-between">
                  <div className="flex-1 min-w-0 pr-4">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-indigo-600 truncate">
                        {new Date(entry.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          entry.score >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {entry.mood}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {entry.summary}
                    </p>
                  </div>
                  <div>
                    <Link
                      to={`/diary/${entry.id}`}
                      className="inline-flex items-center shadow-sm px-3 py-1.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="px-6 py-4 text-center text-gray-500">
              No entries found for this period.
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default MoodGraph
