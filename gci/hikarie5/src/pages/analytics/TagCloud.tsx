import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../../store/authStore'
import { Link } from 'react-router-dom'

interface TagData {
  text: string
  value: number
}

const TagCloud = () => {
  const { token } = useAuthStore()
  const [tags, setTags] = useState<TagData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch('/api/analytics/tags', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch tags')
        }

        setTags(data.tags)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (token) {
      fetchTags()
    }
  }, [token])

  // Helper to calculate font size based on frequency
  const getFontSize = (value: number, max: number) => {
    const minSize = 1 // rem
    const maxSize = 3 // rem
    if (max === 0) return minSize
    
    // Logarithmic scale for smoother sizing
    // return minSize + (value / max) * (maxSize - minSize)
    return Math.max(minSize, Math.min(maxSize, minSize + (value / 5)))
  }

  const maxCount = tags.length > 0 ? Math.max(...tags.map(t => t.value)) : 0

  if (loading) return <div className="text-center py-10">Loading tags...</div>

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Tag Analysis
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Overview of the topics and emotions in your diary entries.
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Tag Cloud Area */}
        <div className="lg:col-span-2 bg-white shadow rounded-lg p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-6">
            Word Cloud
          </h3>
          
          {tags.length > 0 ? (
            <div className="flex flex-wrap gap-4 items-center justify-center min-h-[300px] p-4 border-2 border-dashed border-gray-200 rounded-lg">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className={`inline-block transition-all duration-300 hover:scale-110 cursor-default px-2 py-1 rounded ${
                    index % 5 === 0 ? 'text-indigo-600' :
                    index % 5 === 1 ? 'text-purple-600' :
                    index % 5 === 2 ? 'text-blue-600' :
                    index % 5 === 3 ? 'text-pink-600' :
                    'text-teal-600'
                  }`}
                  style={{ 
                    fontSize: `${getFontSize(tag.value, maxCount)}rem`,
                    fontWeight: tag.value > 1 ? 600 : 400
                  }}
                  title={`${tag.value} occurrences`}
                >
                  {tag.text}
                </span>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-500">
              No tags found. Write more diary entries to generate tags!
            </div>
          )}
        </div>

        {/* Statistics / List View */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Frequency Breakdown
          </h3>
          
          <div className="flow-root mt-6">
            <ul className="-my-5 divide-y divide-gray-200">
              {tags.length > 0 ? (
                tags.map((tag, index) => (
                  <li key={index} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          #{tag.text}
                        </p>
                      </div>
                      <div className="inline-flex items-center text-sm font-semibold text-gray-900">
                        {tag.value}
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <li className="py-4 text-center text-sm text-gray-500">No data available</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TagCloud
