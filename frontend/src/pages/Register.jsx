import { useState } from 'react'
import api from '../api/axios'

const Register = ({ onSwitch }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('viewer')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.post('/auth/register', { email, password, role })
      setMessage('Registration successful. Please login.')
      setTimeout(onSwitch, 1000)
    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <div className="section">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="viewer">Viewer</option>
          <option value="editor">Editor</option>
        </select>

        <button type="submit">Register</button>

        {message && <p>{message}</p>}

        <p style={{ marginTop: '10px' }}>
          Already have an account?{' '}
          <button type="button" onClick={onSwitch}>
            Login
          </button>
        </p>
      </form>
    </div>
  )
}

export default Register
