import { useContext, useState } from 'react'
import { AuthContext } from './context/AuthContext'
import Login from './pages/Login'
import Register from './pages/Register'
import ViewerDashboard from './pages/ViewerDashboard'
import EditorDashboard from './pages/EditorDashboard'

const App = () => {
  const { user, logout } = useContext(AuthContext)
  const [showRegister, setShowRegister] = useState(false)

  if (!user) {
    return showRegister ? (
      <Register onSwitch={() => setShowRegister(false)} />
    ) : (
      <Login onSwitch={() => setShowRegister(true)} />
    )
  }

  // Role-based dashboard routing
  if (user.role === 'viewer') {
    return <ViewerDashboard user={user} logout={logout} />
  }

  // Editor and Admin get the same dashboard (with upload access)
  return <EditorDashboard user={user} logout={logout} />
}

export default App