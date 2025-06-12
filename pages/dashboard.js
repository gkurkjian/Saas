import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import jwt_decode from 'jwt-decode';
import { Container, Row } from 'react-bootstrap';

export default function Dashboard() {
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const token = localStorage.getItem('access_token');
    if (!token) {
      console.log("❌ No token found");
      router.push('/login');
      return;
    }

    try {
      const decoded = jwt_decode(token);
      if (decoded.exp > Date.now() / 1000) {
        console.log("✅ Token OK");
        setAuthorized(true);
      } else {
        console.log("❌ Token expired");
        localStorage.removeItem('access_token');
        router.push('/login');
      }
    } catch (err) {
      console.log("❌ Invalid token:", err);
      localStorage.removeItem('access_token');
      router.push('/login');
    }
  }, []);

  if (!authorized) return null;

  return (
    <Container className="mt-5">
      <Row className="justify-content-center text-center">
        <h3>🎉 Welcome!</h3><br />
        <h5>You’re Authenticated and in the Dashboard</h5>
      </Row>
    </Container>
  );
}
