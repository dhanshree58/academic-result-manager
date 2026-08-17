import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMyResult } from '../api'
const subjects = [
  {
    name: 'Operating System',
    mse: 'operating_system_mse',
    ese: 'operating_system_ese'
  },
  {
    name: 'Data Structure',
    mse: 'data_structure_mse',
    ese: 'data_structure_ese'
  },
  {
    name: 'Computer Networks',
    mse: 'computer_networks_mse',
    ese: 'computer_networks_ese'
  },
  {
    name: 'Design and Analysis of Algorithm',
    mse: 'daa_mse',
    ese: 'daa_ese'
  }
]
const yearOptions = ['2023-24', '2024-25', '2025-26']
const semesterOptions = ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4']

const getFinalMarks = (mse = 0, ese = 0) => Number(((0.4 * Number(mse)) + (0.6 * Number(ese))).toFixed(2))

const getGrade = (value) => {
  if (value >= 90) return 'A+'
  if (value >= 80) return 'A'
  if (value >= 70) return 'B+'
  if (value >= 60) return 'B'
  if (value >= 50) return 'C'
  if (value >= 40) return 'D'
  return 'F'
}

const getStatus = (value) => (value >= 40 ? 'PASS' : 'FAIL')

export default function StudentDashboard() {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const [res, setRes] = useState(null)
  const [loading, setLoading] = useState(true)
  const [year, setYear] = useState('2025-26')
  const [semester, setSemester] = useState('Semester 1')
  const [profileOpen, setProfileOpen] = useState(false)

  const selectedYearSemesterKey = `${year} / ${semester}`
  const defaultYearSemester = '2025-26 / Semester 1'

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    navigate('/')
  }

  useEffect(() => {
    ;(async () => {
      if (!token) {
        setLoading(false)
        return
      }

      const r = await getMyResult(token)
      setRes(r)
      setLoading(false)
    })()
  }, [token])

  if (loading) {
    return <div style={{ background: '#fff', padding: 20, borderRadius: 16, border: '1px solid #e2e8f0' }}>Loading result...</div>
  }

  if (!res || res.error) {
    return (
      <div style={{ background: '#fff', padding: 28, borderRadius: 18, border: '1px solid #e2e8f0', boxShadow: '0 10px 24px rgba(15, 23, 42, 0.05)' }}>
        <h2 style={{ marginTop: 0, color: '#0f172a' }}>Student Result</h2>
        <div style={{ background: '#fef2f2', color: '#b91c1c', padding: '12px 14px', borderRadius: 12, border: '1px solid #fecaca' }}>
          No result found yet. Please wait for your marks to be published.
        </div>
      </div>
    )
  }

    const rows = subjects.map((subject) => {
    const mse = Number(res[subject.mse] || 0)
    const ese = Number(res[subject.ese] || 0)

    const final = getFinalMarks(mse, ese)
    const grade = getGrade(final)
    const status = getStatus(final)

    return {
      subject: subject.name,
      mse,
      ese,
      final,
      grade,
      status
    }
  })

  const summary = {
    percentage: Number(res.percentage || rows.reduce((sum, row) => sum + row.final, 0) / rows.length || 0).toFixed(2),
    sgpa: Number(res.sgpa || (rows.reduce((sum, row) => sum + (row.final >= 90 ? 10 : row.final >= 80 ? 9 : row.final >= 70 ? 8 : row.final >= 60 ? 7 : row.final >= 50 ? 6 : row.final >= 40 ? 5 : 0), 0) / rows.length) || 0).toFixed(2),
    grade: res.grade || rows.reduce((sum, row) => sum + row.final, 0) / rows.length >= 40 ? getGrade((rows.reduce((sum, row) => sum + row.final, 0) / rows.length)) : 'F',
    status: res.status || (rows.some((row) => row.final < 40) ? 'FAIL' : 'PASS'),
  }

  const initials = (res.name || 'S').split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase()

  return (
    <div style={{ background: '#eef3f7', minHeight: '100vh', color: '#0f172a' }}>
      <div style={{ maxWidth: 1250, margin: '20px auto 0', padding: '0 18px' }}>
        <header
          style={{
            width: '100%',
            background: '#2d3d4f',
            color: '#f8fafc',
            padding: '18px 22px',
            boxSizing: 'border-box',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: 28,
            boxShadow: '0 10px 20px rgba(15, 23, 42, 0.08)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 20, height: 20, borderRadius: 6, background: '#dbeafe', color: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800 }}>🎓</div>
            <div style={{ fontSize: 22, fontWeight: 700 }}>Student Result Manager</div>
          </div>

          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              style={{
                background: 'transparent',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                color: '#f8fafc',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              <span
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  background: '#dfe7f3',
                  color: '#1e293b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: 14,
                }}
              >
                {initials}
              </span>
            </button>

            {profileOpen && (
              <div
                style={{
                  position: 'absolute',
                  right: 0,
                  top: 'calc(100% + 10px)',
                  background: '#fff',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 16px 30px rgba(15, 23, 42, 0.12)',
                  borderRadius: 12,
                  padding: '12px 14px',
                  minWidth: 200,
                  zIndex: 12,
                }}
              >
                <div style={{ fontWeight: 800, color: '#0f172a' }}>{res.name}</div>
                <div style={{ marginTop: 4, color: '#475569', fontSize: 14 }}>{res.email}</div>
                <button onClick={logout} style={{ width: '100%', marginTop: 12, border: 'none', background: '#f97316', color: '#fff', borderRadius: 10, padding: '10px 12px', fontWeight: 700, cursor: 'pointer' }}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>
      </div>

      <main style={{ maxWidth: 1250, margin: '0 auto', padding: '32px 32px 48px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 20, marginBottom: 24 }}>
          <div>
            <div style={{ color: '#4b5563', fontSize: 12, fontWeight: 800, letterSpacing: 1.2, textTransform: 'uppercase' }}>STUDENT PORTAL</div>
            <h1 style={{ margin: '8px 0 0', fontSize: 40, lineHeight: 1.1, color: '#0f172a' }}>Dashboard</h1>
            <div style={{ marginTop: 8, color: '#64748b', fontSize: 18 }}>View and manage student academic results</div>
          </div>

          <div style={{ width: 78, height: 78, borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0f172a', fontSize: 34 }}>🎓</div>
        </div>

        <section style={{ marginBottom: 26 }}>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <div style={{ flex: 1, minWidth: 220 }}>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 700, color: '#334155' }}>Academic Year</label>
              <select value={year} onChange={(e) => setYear(e.target.value)} style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1px solid #cbd5e1', background: '#fff', fontSize: 15, color: '#0f172a', boxSizing: 'border-box' }}>
                {yearOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div style={{ flex: 1, minWidth: 220 }}>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 700, color: '#334155' }}>Semester</label>
              <select value={semester} onChange={(e) => setSemester(e.target.value)} style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1px solid #cbd5e1', background: '#fff', fontSize: 15, color: '#0f172a', boxSizing: 'border-box' }}>
                {semesterOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18, gap: 12, flexWrap: 'wrap' }}>
          <div style={{ color: '#475569', fontSize: 16 }}>
            <strong style={{ color: '#0f172a' }}>{year}</strong> · {semester}
          </div>

          <button onClick={() => window.print()} style={{ border: '1px solid #cbd5e1', background: '#fff', color: '#0f172a', borderRadius: 10, padding: '10px 14px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>🖨️</span>
            <span>Print Result</span>
          </button>
        </div>

        {selectedYearSemesterKey !== defaultYearSemester && (
          <div style={{ background: '#fff7ed', color: '#9a4d00', padding: '14px 16px', borderRadius: 12, border: '1px solid #fdba74', marginBottom: 18 }}>
            No result is available for <strong>{selectedYearSemesterKey}</strong>. The published result is currently available for <strong>{defaultYearSemester}</strong>.
          </div>
        )}

        {selectedYearSemesterKey === defaultYearSemester && (
          <>
            <div style={{ width: '100%', overflowX: 'auto', background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 760 }}>
                <thead>
                  <tr style={{ background: '#edf2f7' }}>
                    <th style={{ padding: '14px 12px', textAlign: 'left', color: '#334155', fontWeight: 700, fontSize: 13 }}>Subject</th>
                    <th style={{ padding: '14px 12px', textAlign: 'center', color: '#334155', fontWeight: 700, fontSize: 13 }}>MSE</th>
                    <th style={{ padding: '14px 12px', textAlign: 'center', color: '#334155', fontWeight: 700, fontSize: 13 }}>ESE</th>
                    <th style={{ padding: '14px 12px', textAlign: 'center', color: '#334155', fontWeight: 700, fontSize: 13 }}>Final</th>
                    <th style={{ padding: '14px 12px', textAlign: 'center', color: '#334155', fontWeight: 700, fontSize: 13 }}>Grade</th>
                    <th style={{ padding: '14px 12px', textAlign: 'center', color: '#334155', fontWeight: 700, fontSize: 13 }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.subject} style={{ borderTop: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '14px 12px', fontWeight: 600, color: '#0f172a' }}>{row.subject}</td>
                      <td style={{ padding: '14px 12px', textAlign: 'center', color: '#475569' }}>{row.mse}</td>
                      <td style={{ padding: '14px 12px', textAlign: 'center', color: '#475569' }}>{row.ese}</td>
                      <td style={{ padding: '14px 12px', textAlign: 'center', color: '#475569' }}>{row.final}</td>
                      <td style={{ padding: '14px 12px', textAlign: 'center', color: '#1e293b', fontWeight: 700 }}>{row.grade}</td>
                      <td style={{ padding: '14px 12px', textAlign: 'center', fontWeight: 700, color: row.status === 'PASS' ? '#15803d' : '#dc2626' }}>● {row.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <section style={{ marginTop: 26, background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '18px 20px' }}>
              <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: 1.2, color: '#475569', textTransform: 'uppercase', marginBottom: 10 }}>Result Summary</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 0, borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
                {[
                  { label: 'SGPA', value: summary.sgpa },
                  { label: 'Percentage', value: `${summary.percentage}%` },
                  { label: 'Grade', value: summary.grade },
                  { label: 'Overall Status', value: summary.status },
                ].map((item, index) => (
                  <div key={item.label} style={{ padding: '18px 16px', borderRight: index < 3 ? '1px solid #e2e8f0' : 'none', minHeight: 90, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#64748b', letterSpacing: 1.1, textTransform: 'uppercase', marginBottom: 8 }}>{item.label}</div>
                    <div style={{ fontSize: 30, lineHeight: 1.2, fontWeight: 800, color: item.label === 'Overall Status' ? '#15803d' : '#0f172a' }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  )
}
