import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Login from './pages/Login'
import AdminLogin from './pages/AdminLogin'
import FacultyLogin from './pages/FacultyLogin'
import StudentLogin from './pages/StudentLogin'
import FacultyDashboard from './pages/FacultyDashboard'
import StudentDashboard from './pages/StudentDashboard'
import AdminDashboard from './pages/AdminDashboard'

function TopBar(){
  return null
}

export default function App(){
  return (
    <div style={{
      minHeight: '100vh',
      padding: 24,
      fontFamily: 'Inter, Arial, sans-serif',
      background: 'linear-gradient(135deg, #e0f2fe 0%, #f8fafc 30%, #eef2ff 100%)',
      color: '#0f172a'
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <TopBar />
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/admin-login" element={<AdminLogin/>} />
          <Route path="/faculty-login" element={<FacultyLogin/>} />
          <Route path="/student-login" element={<StudentLogin/>} />
          <Route path="/faculty" element={<FacultyDashboard/>} />
          <Route path="/student" element={<StudentDashboard/>} />
          <Route path="/admin" element={<AdminDashboard/>} />
        </Routes>
      </div>
    </div>
  )
}
