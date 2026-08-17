import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../api'

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())

export default function AdminLogin(){
  const [email, setEmail] = useState('admin@vit.edu')
  const [password, setPassword] = useState('adminpass')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()

    if (!email.trim() || !password.trim()) {
      setError('Email and password are required.')
      return
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.')
      return
    }

    setLoading(true)
    setError('')

    const r = await login(email.trim(), password)
    setLoading(false)

    if (r.token) {
      localStorage.setItem('token', r.token)
      localStorage.setItem('role', r.role)
      navigate('/admin')
      return
    }

    setError(r.error || 'Admin login failed')
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
      <form onSubmit={submit} style={{ width: '100%', maxWidth: 440, background: '#fff', border: '1px solid #dbeafe', borderRadius: 24, boxShadow: '0 16px 40px rgba(37, 99, 235, 0.12)', padding: 30 }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ width: 72, height: 72, margin: '0 auto 12px', borderRadius: 18, background: 'linear-gradient(135deg, #2563eb, #60a5fa)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 30, fontWeight: 800 }}>A</div>
          <h2 style={{ margin: 0, color: '#0f172a' }}>Admin Login</h2>
          <p style={{ margin: '8px 0 0', color: '#475569' }}>Access the admin dashboard</p>
        </div>

        <div style={{ display: 'grid', gap: 16 }}>
          <div>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 700, color: '#334155' }}>Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@vit.edu" style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid #cbd5e1', boxSizing: 'border-box', fontSize: 15 }} />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 700, color: '#334155' }}>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid #cbd5e1', boxSizing: 'border-box', fontSize: 15 }} />
          </div>

          {error && <div style={{ background: '#fef2f2', color: '#b91c1c', border: '1px solid #fecaca', borderRadius: 10, padding: '10px 12px', fontWeight: 600 }}>{error}</div>}

          <button type="submit" disabled={loading} style={{ border: 'none', background: loading ? '#93c5fd' : 'linear-gradient(135deg, #2563eb, #60a5fa)', color: '#fff', borderRadius: 12, padding: '14px 16px', fontWeight: 800, fontSize: 16, cursor: loading ? 'not-allowed' : 'pointer' }}>
            {loading ? 'Signing in...' : 'Login as Admin'}
          </button>
        </div>
      </form>
    </div>
  )
}
