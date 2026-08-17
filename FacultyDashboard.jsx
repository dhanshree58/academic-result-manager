import React, {useState, useEffect} from 'react'
import { upsertResult, listResults, getStudents } from '../api'

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
];

const validateMarks = (data) => {
  const values = [];

  for (const subject of subjects) {
    const mse = Number(data[subject.mse]);
    const ese = Number(data[subject.ese]);

    if (Number.isNaN(mse) || Number.isNaN(ese)) {
      return `${subject.name} marks must be numeric.`;
    }

    if (mse < 0 || mse > 100 || ese < 0 || ese > 100) {
      return `${subject.name} marks must be between 0 and 100.`;
    }

    values.push(mse, ese);
  }

  if (values.every((v) => v === 0)) {
    return 'Please enter at least one valid score before saving.';
  }

  return '';
};

  


export default function FacultyDashboard(){
  const token = localStorage.getItem('token');
  const [studentId,setStudentId]=useState('');
  const [students,setStudents]=useState([]);
const [form, setForm] = useState({
  operating_system_mse: 0,
  operating_system_ese: 0,

  data_structure_mse: 0,
  data_structure_ese: 0,

  computer_networks_mse: 0,
  computer_networks_ese: 0,

  daa_mse: 0,
  daa_ese: 0
});
  const [results,setResults]=useState([]);
  const [message,setMessage]=useState('');
  const [messageKind,setMessageKind]=useState('success');

  useEffect(() => {
    (async () => {
      const students = await getStudents(token);
      if (Array.isArray(students)) setStudents(students);
    })();
  }, [token]);

  const submit=async e=>{
    e.preventDefault();
    const id = Number(studentId);
    if (!id || id <= 0) {
      setMessage('Please select a valid student.');
      setMessageKind('error');
      return;
    }

    const validationError = validateMarks(form);
    if (validationError) {
      setMessage(validationError);
      setMessageKind('error');
      return;
    }

    const payload = { student_id: id, ...form };
    const r = await upsertResult(token, payload);
    const finalMessage = r.message || r.error || 'Unexpected response';
    setMessage(finalMessage);
    setMessageKind(r.error ? 'error' : 'success');
  }

  const search = async ()=>{
    const res = await listResults(token);
    setResults(res);
  }

  return (
    <div style={{display:'grid',gap:20}}>
      <div style={{background:'#fff',padding:24,borderRadius:20,border:'1px solid #e2e8f0',boxShadow:'0 12px 24px rgba(15, 23, 42, 0.06)'}}>
        <h2 style={{marginTop:0,color:'#0f172a'}}>Faculty Dashboard</h2>
        <div style={{marginBottom:18}}>
          <label style={{display:'block',marginBottom:8,fontWeight:700,color:'#334155'}}>Select Student</label>
          <select value={studentId} onChange={e=>setStudentId(e.target.value)} style={{
            width:'100%',
            maxWidth:500,
            padding:'12px 14px',
            borderRadius:12,
            border:'1px solid #cbd5e1',
            background:'#fff',
            fontSize:15
          }}>
            <option value="">Select student</option>
            {students.map(student => (
              <option key={student.id} value={student.id}>{student.name} ({student.email})</option>
            ))}
          </select>
          {message && (
            <div style={{
              marginTop:12,
              padding:'10px 12px',
              borderRadius:10,
              border: messageKind === 'error' ? '1px solid #fecaca' : '1px solid #bbf7d0',
              background: messageKind === 'error' ? '#fef2f2' : '#f0fdf4',
              color: messageKind === 'error' ? '#b91c1c' : '#166534',
              fontWeight:600
            }}>
              {message}
            </div>
          )}
        </div>

        <form
  onSubmit={submit}
  style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: 16
  }}
>
  {subjects.map((subject) => (
    <div
      key={subject.name}
      style={{
        border: '1px solid #e2e8f0',
        borderRadius: 16,
        padding: 16,
        background: '#f8fafc'
      }}
    >
      <h4
        style={{
          marginTop: 0,
          color: '#0f172a'
        }}
      >
        {subject.name}
      </h4>

      <div style={{ display: 'grid', gap: 10 }}>

        {/* MSE */}
        <div>
          <label
            style={{
              display: 'block',
              marginBottom: 6,
              fontWeight: 600,
              color: '#334155'
            }}
          >
            MSE
          </label>

          <input
            type="number"
            min="0"
            max="100"
            value={form[subject.mse]}
            onChange={e =>
              setForm({
                ...form,
                [subject.mse]: e.target.value
              })
            }
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: 10,
              border: '1px solid #cbd5e1',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* ESE */}
        <div>
          <label
            style={{
              display: 'block',
              marginBottom: 6,
              fontWeight: 600,
              color: '#334155'
            }}
          >
            ESE
          </label>

          <input
            type="number"
            min="0"
            max="100"
            value={form[subject.ese]}
            onChange={e =>
              setForm({
                ...form,
                [subject.ese]: e.target.value
              })
            }
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: 10,
              border: '1px solid #cbd5e1',
              boxSizing: 'border-box'
            }}
          />
        </div>

      </div>
    </div>
  ))}

  {/* SAVE / UPDATE BUTTON */}
  <div
    style={{
      gridColumn: '1 / -1',
      marginTop: 8
    }}
  >
    <button
      type="submit"
      style={{
        border: 'none',
        background: 'linear-gradient(135deg, #16a34a, #22c55e)',
        color: '#fff',
        borderRadius: 12,
        padding: '14px 24px',
        fontSize: 16,
        fontWeight: 800,
        cursor: 'pointer',
        minWidth: 180
      }}
    >
      Save / Update Result
    </button>
  </div>
</form>
      </div>

      <div style={{background:'#fff',padding:24,borderRadius:20,border:'1px solid #e2e8f0'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12,flexWrap:'wrap',gap:12}}>
          <h3 style={{margin:0,color:'#0f172a'}}>Recent Results</h3>
          <button onClick={search} style={{
            border:'none',
            background:'#e2e8f0',
            color:'#0f172a',
            borderRadius:10,
            padding:'10px 14px',
            fontWeight:700,
            cursor:'pointer'
          }}>Load Results</button>
        </div>

        <div style={{display:'grid',gap:12}}>
          {results.map(r => (
            <div key={r.id} style={{border:'1px solid #e2e8f0',borderRadius:12,padding:16,background:'#f8fafc'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:8}}>
                <div>
                  <strong>{r.name}</strong> ({r.email})
                </div>
                <div style={{fontWeight:700,color:r.status === 'PASS' ? '#15803d' : '#dc2626'}}>{r.status}</div>
              </div>
              <div style={{marginTop:8,color:'#475569'}}>
                {r.percentage}% • {r.grade} • SGPA {r.sgpa}
              </div>
              <div style={{marginTop:10}}>
                <button onClick={()=>{ const w=window.open(); w.document.write(JSON.stringify(r, null, 2)); }}>Print</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
