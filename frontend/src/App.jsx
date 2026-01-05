import { useContext, useState } from 'react'
import { AuthContext } from './context/AuthContext'
import Login from './pages/Login'
import Register from './pages/Register'
import Videos from './pages/Videos'
import VideoPlayer from './components/VideoPlayer'
import Upload from './pages/Upload'
import ai_image from './assets/ai_image.png'

const App = () => {
  const { user, logout } = useContext(AuthContext)
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [showRegister, setShowRegister] = useState(false)
  const [showUpload, setShowUpload] = useState(false)

  if (!user) {
    return showRegister ? (
      <Register onSwitch={() => setShowRegister(false)} />
    ) : (
      <Login onSwitch={() => setShowRegister(true)} />
    )
  }

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col">
      {/* Dashboard Navbar */}
      <nav className="glass-nav sticky top-0 z-50 px-6 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img 
              src={ai_image}
              alt="Logo" 
              className="w-10 h-10 rounded-lg shadow-sm"
            />
            <span className="font-extrabold text-xl tracking-tight text-slate-900">
              Vision<span className="text-brand-primary">Guard</span>
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:block text-right mr-2">
              <p className="text-sm font-bold text-slate-900 leading-none">{user.email.split('@')[0]}</p>
              <p className="text-[10px] text-brand-primary font-bold uppercase tracking-widest mt-1">Admin Account</p>
            </div>
            <button
              onClick={logout}
              className="flex items-center px-4 py-2 text-sm font-bold text-slate-600 hover:text-red-600 bg-slate-100 hover:bg-red-50 rounded-xl transition-all duration-200 group"
            >
              <span>Sign Out</span>
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow p-6 lg:p-10 max-w-7xl mx-auto w-full animate-fade-in">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar: Upload & List */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-6 rounded-2xl shadow-soft border border-slate-100">
              <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                <span className="w-2 h-6 bg-brand-primary rounded-full mr-3"></span>
                Upload New Content
              </h2>
              <Upload />
            </div>

            <div className="bg-white rounded-2xl shadow-soft border border-slate-100 overflow-hidden">
              <div className="p-5 border-b border-slate-100 bg-slate-50/50">
                <h3 className="font-bold text-slate-800">Media Library</h3>
              </div>
              <div className="max-h-[500px] overflow-y-auto p-4">
                <Videos onSelect={setSelectedVideo} />
              </div>
            </div>
          </div>

          {/* Main: Video Player */}
          <div className="lg:col-span-8">
            <VideoPlayer video={selectedVideo} />
          </div>

        </div>
      </main>
    </div>
  )
}

export default App