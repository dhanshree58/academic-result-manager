const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api';

export async function login(email, password){
  const res = await fetch(`${API_BASE}/auth/login`, {
    method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({email,password})
  });
  return res.json();
}

export async function upsertResult(token, payload){
  const res = await fetch(`${API_BASE}/results`, {method:'POST', headers:{'Content-Type':'application/json', Authorization:`Bearer ${token}`}, body:JSON.stringify(payload)});
  return res.json();
}

export async function getMyResult(token, studentId){
  const url = studentId ? `${API_BASE}/results/${studentId}` : `${API_BASE}/results/me`;
  const res = await fetch(url, {headers:{ Authorization:`Bearer ${token}`}});
  return res.json();
}

export async function getStudents(token){
  const res = await fetch(`${API_BASE}/results/students`, {headers:{ Authorization:`Bearer ${token}`}});
  return res.json();
}

export async function listResults(token, q){
  const url = new URL(`${API_BASE}/results`);
  if (q) url.searchParams.set('q', q);
  const res = await fetch(url.toString(), {headers:{ Authorization:`Bearer ${token}`}});
  return res.json();
}
