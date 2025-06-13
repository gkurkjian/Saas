import jwt_decode from 'jwt-decode'

// Store the token
export function setToken(token) {
  localStorage.setItem('access_token', token)
}

// Get the raw token from localStorage
export function getToken() {
  return localStorage.getItem('access_token') || null
}

// Decode and validate token safely
export function readToken() {
  try {
    const token = getToken()
    if (!token) return null
    return jwt_decode(token)
  } catch (err) {
    console.error('Failed to decode token:', err)
    return null
  }
}

// Remove the token from localStorage
export function removeToken() {
  localStorage.removeItem('access_token')
}

// Send credentials to backend for login
export async function authenticateUser(userName, password) {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userName, password }),
  })

  const data = await res.json()

  if (res.status === 200) {
    if (data.token) {
      setToken(data.token)
      return true
    } else {
      throw new Error('No token returned from server')
    }
  } else {
    throw new Error(data.error || 'Login failed')
  }
}

// Check if user is authenticated based on token expiry
export function isAuthenticated() {
  const token = getToken()
  if (!token) return false

  try {
    const decoded = jwt_decode(token)
    return decoded.exp > Date.now() / 1000
  } catch {
    return false
  }
}
