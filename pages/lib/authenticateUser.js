import jwt_decode from 'jwt-decode';

export async function authenticateUser(user, password) {
  const res = await fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify({ username: user, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();

  if (res.status === 200) {
    localStorage.setItem('access_token', data.token); // Store JWT locally
    console.log("Token received:", data.token);
    return true;
  } else {
    throw new Error(data.error || 'Login failed');
  }
}

export function isAuthenticated() {
  const token = localStorage.getItem('access_token');
  if(!token) return false;

  try {
    const decode = jwt_decode(token);
    return decode.exp > Date.now() / 1000;
  } catch { 
    return false;
  }
}
