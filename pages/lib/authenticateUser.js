import jwt_decode from 'jwt-decode';

const TOKEN_KEY = 'access_token';

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function readToken() {
  try {
    const token = getToken();
    return token ? jwt_decode(token) : null;
  } catch {
    return null;
  }
}

export function isAuthenticated() {
  const token = getToken();
  if (!token) return false;

  try {
    const decoded = jwt_decode(token);
    return decoded.exp > Date.now() / 1000;
  } catch {
    return false;
  }
}

export async function authenticateUser(username, password) {
  const res = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();

  if (res.status === 200 && data.token) {
    setToken(data.token);
    return { success: true, token: data.token };
  } else {
    throw new Error(data.error || 'Login failed');
  }
}
