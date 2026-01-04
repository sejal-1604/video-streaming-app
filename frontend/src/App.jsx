import { useContext, useState } from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import Upload from './pages/Upload'
import Videos from './pages/Videos'
import VideoPlayer from './components/VideoPlayer'
import { AuthContext } from './context/AuthContext'
import './App.css'

function App() {
  const { user, logout } = useContext(AuthContext)
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [showRegister, setShowRegister] = useState(false)

  if (!user) {
    return showRegister ? (
      <Register onSwitch={() => setShowRegister(false)} />
    ) : (
      <Login onSwitch={() => setShowRegister(true)} />
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with logout button */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Video Sensitivity App</h1>
              <span className="ml-4 text-sm text-gray-500">Welcome, {user.email}</span>
            </div>
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
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Upload />
          </div>

          <div className="lg:col-span-1">
            <Videos onSelect={setSelectedVideo} />
          </div>

          <div className="lg:col-span-1">
            <VideoPlayer video={selectedVideo} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
