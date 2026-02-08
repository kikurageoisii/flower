import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import ResumePage from './ResumePage'

const Home = () => {
  const { isAuthenticated } = useAuthStore()

  if (isAuthenticated) {
    return <ResumePage />
  }

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block xl:inline">Your personal diary,</span>{' '}
          <span className="block text-indigo-600 xl:inline">reimagined.</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          memU analyzes your daily entries to help you understand your mood, preferences, and personality growth over time.
        </p>
        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
          <div className="rounded-md shadow">
            <Link
              to="/signup"
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
            >
              Get Started
            </Link>
          </div>
          <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
            <Link
              to="/login"
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
            >
              Log In
            </Link>
          </div>
        </div>

        <div className="mt-16 border-t border-gray-200 pt-10">
          <blockquote className="text-xl italic text-gray-600">
            "Keep your face always toward the sunshine—and shadows will fall behind you."
          </blockquote>
          <p className="mt-4 text-gray-500 font-medium">- Walt Whitman</p>
        </div>
      </div>
    </div>
  )
}

export default Home
