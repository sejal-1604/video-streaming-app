import { useState, useContext } from 'react'
import api from '../api/axios'
import { AuthContext } from '../context/AuthContext'

const Login = ({ onSwitch }) => {
  const { login } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    setLoading(true)

    try {
      const res = await api.post('/auth/login', {
        email,
        password
      })

      // Save token & user in context + localStorage
      login(res.data.token, res.data.user)

      setMessage('Login successful')
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="section">
      <form onSubmit={handleSubmit}>
        <h2 style={{ marginBottom: '12px' }}>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {message && (
          <p style={{ marginTop: '10px', color: '#dc2626' }}>
            {message}
          </p>
        )}

        <p style={{ marginTop: '14px', fontSize: '14px' }}>
          Don’t have an account?{' '}
          <button
            type="button"
            onClick={onSwitch}
            style={{
              background: 'none',
              color: '#2563eb',
              padding: 0
            }}
          >
            Register
          </button>
        </p>
      </form>
    </div>
  )
}

export default Login
