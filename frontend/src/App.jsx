import { useContext, useState } from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import Upload from './pages/Upload'
import Videos from './pages/Videos'
import VideoPlayer from './components/VideoPlayer'
import { AuthContext } from './context/AuthContext'
import './App.css'

function App() {
  const { user } = useContext(AuthContext)
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
    <div className="app">
      <div className="section">
        <Upload />
      </div>

      <div className="section">
        <Videos onSelect={setSelectedVideo} />
      </div>

      <div className="section">
        <VideoPlayer video={selectedVideo} />
      </div>
    </div>
  )
}

export default App
