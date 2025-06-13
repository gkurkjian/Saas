'use client'
import { useState, useEffect } from 'react'
import { Navbar, Nav, Container, Button } from 'react-bootstrap'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { readToken, removeToken } from '../lib/authenticateUser'

export default function Navigation() {
  const [token, setToken] = useState(null)
  const router = useRouter()

useEffect(() => {
  const handleRouteChange = () => {
    const decoded = readToken()
    setToken(decoded)
  }

  handleRouteChange() // run on initial mount

  router.events?.on('routeChangeComplete', handleRouteChange)

  return () => {
    router.events?.off('routeChangeComplete', handleRouteChange)
  }
}, [router])

  const logout = () => {
    removeToken()
    setToken(null)
    router.push('/')
  }

  return (
    <Navbar bg="success" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <Navbar.Brand as={Link} href="/">Home Page</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            {token ? (
              <Button variant="outline-light" onClick={logout}>Logout</Button>
            ) : (
              <>
                <Nav.Link as={Link} href="/login">Login</Nav.Link>
                <Nav.Link as={Link} href="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
