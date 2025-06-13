import { useState } from 'react'
import { useRouter } from 'next/router'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

export default function Register() {
  const [fullName, setFullName] = useState('')
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName, userName, password }),
    })

    const data = await res.json()
    console.log("REGISTER RESPONSE:", data)

    if (res.ok && data.token) {
      localStorage.setItem('access_token', data.token)
      router.push('/dashboard')
    } else {
      alert(data.error || 'Registration failed')
    }
  }

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col xs={10} sm={8} md={6} lg={4}>
          <h2 className="text-center mb-4">Register</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Choose a username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button type="submit" variant="success" className="w-100">
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}
