import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

const DiaryEntry = () => {
  const { token } = useAuthStore()
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(false)
  const [error, setError] = useState('')
  const [analysis, setAnalysis] = useState<any>(null)
  const [isReadOnly, setIsReadOnly] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    if (id && id !== 'new') {
      fetchEntry(id)
    }
  }, [id])

  const fetchEntry = async (entryId: string) => {
    setFetching(true)
    setError('')
    try {
      const response = await fetch(`/api/diary/${entryId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      
      if (!response.ok) throw new Error(data.error || 'Failed to fetch entry')
      
      const entry = data.entry
      setDate(entry.entry_date)
      // Check for raw_text_override in analysis_data
      const text = entry.analysis_data?.raw_text_override || entry.raw_text
      setContent(text)
      setAnalysis(entry.analysis_data)
      setIsReadOnly(true)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setFetching(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccessMessage('')
    setAnalysis(null)

    try {
      let url = '/api/diary/entries'
      let method = 'POST'
      
      // If editing existing entry
      if (id && id !== 'new' && !isReadOnly) {
        url = `/api/diary/${id}`
        method = 'PUT'
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          date,
          raw_text: content
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save entry')
      }

      setAnalysis(data.analysis)
      setSuccessMessage('Daily is completed')
      setIsReadOnly(true) // Switch back to read-only after save
      
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      {fetching && <div className="text-center py-4">Loading entry...</div>}
      
      <div className="bg-white shadow sm:rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {isReadOnly ? 'Diary Entry' : 'New Diary Entry'}
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            {isReadOnly ? 'View your past memories.' : 'Share your thoughts and let memU analyze your day.'}
          </p>
        </div>
        
        <div className="px-4 py-5 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {successMessage && <div className="text-green-600 font-medium">{successMessage}</div>}
            {error && <div className="text-red-500">{error}</div>}
            
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <div className="mt-1">
                <input
                  type="date"
                  name="date"
                  id="date"
                  required
                  disabled={isReadOnly}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border disabled:bg-gray-100"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                Dear Diary...
              </label>
              <div className="mt-1">
                <textarea
                  id="content"
                  name="content"
                  rows={10}
                  required
                  disabled={isReadOnly}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border disabled:bg-gray-100"
                  placeholder="Today I felt..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3"
              >
                {isReadOnly ? 'Back' : 'Cancel'}
              </button>
              
              {isReadOnly ? (
                <button
                  type="button"
                  onClick={() => {
                    setIsReadOnly(false)
                    setSuccessMessage('')
                  }}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Edit
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Save Entry'}
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Analysis Result */}
        {analysis && (
          <div className="px-4 py-5 sm:px-6 bg-indigo-50 border-t border-gray-200">
            <h4 className="text-md font-medium text-indigo-900 mb-4">memU Analysis</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Mood</p>
                <div className="mt-1 flex items-center">
                  <span className={`px-2 py-1 rounded text-sm font-medium ${
                    analysis.mood === 'happy' || analysis.mood === 'excited' ? 'bg-green-100 text-green-800' :
                    analysis.mood === 'sad' || analysis.mood === 'anxious' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {analysis.mood.charAt(0).toUpperCase() + analysis.mood.slice(1)}
                  </span>
                  <span className="ml-2 text-xs text-gray-500">(Score: {analysis.score.toFixed(2)})</span>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">Tags</p>
                <div className="mt-1 flex flex-wrap gap-2">
                  {analysis.tags.length > 0 ? (
                    analysis.tags.map((tag: string, i: number) => (
                      <span key={i} className="px-2 py-1 bg-white border border-gray-200 rounded text-xs text-gray-600">
                        #{tag}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-gray-400">No tags detected</span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="text-sm text-indigo-600 hover:text-indigo-900 font-medium"
              >
                &larr; Back to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DiaryEntry
