import { useState } from 'react'
import Videos from './Videos'
import VideoPlayer from '../components/VideoPlayer'

const ViewerDashboard = ({ user, logout }) => {
  const [selectedVideo, setSelectedVideo] = useState(null)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Video Sensitivity App</h1>
              <span className="ml-4 px-2 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-full">
                Viewer
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Welcome, {user.email}</span>
              <button
                onClick={logout}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Video Library</h2>
          <p className="mt-2 text-gray-600">Browse and watch videos that have been processed for sensitivity analysis.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Video List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Available Videos</h3>
              </div>
              <div className="p-6">
                <Videos onSelect={setSelectedVideo} />
              </div>
            </div>
          </div>

          {/* Video Player */}
          <div className="lg:col-span-1">
            <VideoPlayer video={selectedVideo} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default ViewerDashboard
