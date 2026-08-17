import React, {useState, useEffect} from 'react'
import { listResults } from '../api'

export default function AdminDashboard(){
  const token = localStorage.getItem('token');
  const [results,setResults]=useState([]);
  const [loading,setLoading]=useState(false);

  useEffect(() => {
    load();
  }, []);

  const load = async ()=>{
    setLoading(true);
    const r = await listResults(token);
    setResults(Array.isArray(r) ? r : []);
    setLoading(false);
  }

  const passCount = results.filter(r => r.status === 'PASS').length;
  const failCount = results.filter(r => r.status === 'FAIL').length;
  const avg = results.length ? (results.reduce((sum, r) => sum + Number(r.percentage || 0), 0) / results.length).toFixed(2) : '0.00';

  return (
    <div style={{display:'grid',gap:20}}>
      <div style={{background:'#fff',padding:24,borderRadius:20,border:'1px solid #e2e8f0',boxShadow:'0 12px 24px rgba(15, 23, 42, 0.06)'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:12}}>
          <h2 style={{margin:0,color:'#0f172a'}}>Admin Dashboard</h2>
          <button onClick={load} style={{
            border:'none',
            background:'linear-gradient(135deg, #2563eb, #7c3aed)',
            color:'#fff',
            borderRadius:12,
            padding:'10px 16px',
            fontWeight:700,
            cursor:'pointer'
          }}>
            {loading ? 'Loading...' : 'Refresh Results'}
          </button>
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:16}}>
        {[
          { label: 'Total Students', value: results.length },
          { label: 'Passed', value: passCount },
          { label: 'Failed', value: failCount },
          { label: 'Average %', value: `${avg}%` }
        ].map(item => (
          <div key={item.label} style={{background:'#fff',padding:20,borderRadius:16,border:'1px solid #e2e8f0'}}>
            <div style={{color:'#64748b',fontSize:13,fontWeight:700,textTransform:'uppercase'}}>{item.label}</div>
            <div style={{marginTop:8,fontSize:28,fontWeight:800,color:'#0f172a'}}>{item.value}</div>
          </div>
        ))}
      </div>

      <div style={{background:'#fff',padding:20,borderRadius:20,border:'1px solid #e2e8f0'}}>
        <div style={{display:'grid',gap:12}}>
          {results.length === 0 ? (
            <div style={{padding:18,borderRadius:12,background:'#f8fafc',color:'#475569'}}>No results available yet.</div>
          ) : results.map(r=> (
            <div key={r.id} style={{border:'1px solid #e2e8f0',borderRadius:12,padding:16,background:'#f8fafc'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:10,flexWrap:'wrap'}}>
                <div>
                  <strong>{r.name}</strong>
                  <div style={{color:'#64748b'}}>{r.email}</div>
                </div>
                <div style={{fontWeight:800,color:r.status === 'PASS' ? '#15803d' : '#dc2626'}}>{r.status}</div>
              </div>
              <div style={{marginTop:10,color:'#475569'}}>
                Percentage: {r.percentage}% • Grade: {r.grade} • SGPA: {r.sgpa}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
