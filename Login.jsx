import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const navigate = useNavigate()

  const options = [
    { role: 'Admin', route: '/admin-login', color: '#2563eb', icon: '👑', bg: 'linear-gradient(135deg, #2563eb 0%, #60a5fa 100%)' },
    { role: 'Faculty', route: '/faculty-login', color: '#16a34a', icon: '🎓', bg: 'linear-gradient(135deg, #16a34a 0%, #4ade80 100%)' },
    { role: 'Student', route: '/student-login', color: '#7c3aed', icon: '🎒', bg: 'linear-gradient(135deg, #7c3aed 0%, #c084fc 100%)' }
  ]

  return (
    <div style={{ display: 'grid', gap: 20, justifyItems: 'center', minHeight: '70vh', paddingTop: 20 }}>
      <div style={{ textAlign: 'center', maxWidth: 700 }}>
        <h1 style={{ margin: 0, color: '#0f172a', fontSize: 36 }}>Choose Your Login</h1>
        <p style={{ margin: '10px 0 0', color: '#475569', fontSize: 18 }}>Select the dashboard you want to access</p>
      </div>

      <div style={{ width: '100%', maxWidth: 980, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 18 }}>
        {options.map((item) => (
          <button key={item.role} onClick={() => navigate(item.route)} style={{
            background: '#fff',
            border: '1px solid #e2e8f0',
            borderRadius: 22,
            overflow: 'hidden',
            boxShadow: '0 12px 26px rgba(15, 23, 42, 0.08)',
            textAlign: 'left',
            cursor: 'pointer',
            padding: 0,
            transition: 'transform 0.2s ease'
          }}>
            <div style={{
              background: item.bg,
              minHeight: 120,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: 42,
              fontWeight: 800
            }}>
              {item.icon}
            </div>

            <div style={{ padding: 18 }}>
              <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: 1.1, color: item.color, textTransform: 'uppercase' }}>{item.role}</div>
              <div style={{ marginTop: 10, fontWeight: 700, color: '#0f172a', fontSize: 18 }}>Open {item.role} Portal</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
