import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Radar, Pie, Bar } from 'react-chartjs-2'
import { useAuthStore } from '../../store/authStore'

// Register ChartJS components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale
)

interface Preferences {
  likes: string[]
  dislikes: string[]
  interests: string[]
  avoidances: string[]
}

const PreferenceGraph = () => {
  const { token } = useAuthStore()
  const [preferences, setPreferences] = useState<Preferences>({
    likes: [],
    dislikes: [],
    interests: [],
    avoidances: []
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const response = await fetch('/api/analytics/preferences', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch preferences')
        }

        setPreferences(data.preferences)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (token) {
      fetchPreferences()
    }
  }, [token])

  if (loading) return <div className="text-center py-10">Loading preferences...</div>

  // Prepare data for Radar Chart (Overall Balance)
  const radarData = {
    labels: ['Likes', 'Dislikes', 'Interests', 'Avoidances'],
    datasets: [
      {
        label: 'Preference Distribution',
        data: [
          preferences.likes.length,
          preferences.dislikes.length,
          preferences.interests.length,
          preferences.avoidances.length
        ],
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 1,
      },
    ],
  }

  // Prepare data for Bar Chart (Positive vs Negative)
  const barData = {
    labels: ['Positive (Likes + Interests)', 'Negative (Dislikes + Avoidances)'],
    datasets: [
      {
        label: 'Count',
        data: [
          preferences.likes.length + preferences.interests.length,
          preferences.dislikes.length + preferences.avoidances.length
        ],
        backgroundColor: [
          'rgba(34, 197, 94, 0.6)', // Green for positive
          'rgba(239, 68, 68, 0.6)', // Red for negative
        ],
        borderColor: [
          'rgba(34, 197, 94, 1)',
          'rgba(239, 68, 68, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  // Prepare data for Pie Chart (Detailed Breakdown)
  const pieData = {
    labels: ['Likes', 'Dislikes', 'Interests', 'Avoidances'],
    datasets: [
      {
        data: [
          preferences.likes.length,
          preferences.dislikes.length,
          preferences.interests.length,
          preferences.avoidances.length
        ],
        backgroundColor: [
          'rgba(34, 197, 94, 0.6)',  // Green - Likes
          'rgba(239, 68, 68, 0.6)',  // Red - Dislikes
          'rgba(59, 130, 246, 0.6)', // Blue - Interests
          'rgba(234, 179, 8, 0.6)',  // Yellow - Avoidances
        ],
        borderColor: [
          'rgba(34, 197, 94, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(234, 179, 8, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Preference Analysis
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Understand what you love, hate, and are interested in.
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

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Radar Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4 text-center">Preference Balance</h3>
          <div className="h-64 flex justify-center">
            <Radar data={radarData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4 text-center">Positive vs Negative</h3>
          <div className="h-64 flex justify-center">
            <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Pie Chart */}
         <div className="bg-white p-6 rounded-lg shadow lg:col-span-1">
          <h3 className="text-lg font-medium text-gray-900 mb-4 text-center">Distribution</h3>
          <div className="h-64 flex justify-center">
            <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>

        {/* Detailed Lists */}
        <div className="bg-white p-6 rounded-lg shadow lg:col-span-2">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Detailed Breakdown</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-green-600 mb-2 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Likes ({preferences.likes.length})
              </h4>
              <ul className="list-disc list-inside text-sm text-gray-600 pl-4">
                {preferences.likes.length > 0 ? (
                  preferences.likes.map((item, i) => <li key={i}>{item}</li>)
                ) : (
                  <li className="text-gray-400 italic">No likes recorded yet</li>
                )}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-red-600 mb-2 flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                Dislikes ({preferences.dislikes.length})
              </h4>
              <ul className="list-disc list-inside text-sm text-gray-600 pl-4">
                {preferences.dislikes.length > 0 ? (
                  preferences.dislikes.map((item, i) => <li key={i}>{item}</li>)
                ) : (
                  <li className="text-gray-400 italic">No dislikes recorded yet</li>
                )}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-blue-600 mb-2 flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                Interests ({preferences.interests.length})
              </h4>
              <ul className="list-disc list-inside text-sm text-gray-600 pl-4">
                {preferences.interests.length > 0 ? (
                  preferences.interests.map((item, i) => <li key={i}>{item}</li>)
                ) : (
                  <li className="text-gray-400 italic">No interests recorded yet</li>
                )}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-yellow-600 mb-2 flex items-center">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                Avoidances ({preferences.avoidances.length})
              </h4>
              <ul className="list-disc list-inside text-sm text-gray-600 pl-4">
                {preferences.avoidances.length > 0 ? (
                  preferences.avoidances.map((item, i) => <li key={i}>{item}</li>)
                ) : (
                  <li className="text-gray-400 italic">No avoidances recorded yet</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PreferenceGraph
