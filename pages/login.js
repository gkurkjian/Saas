import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
    const [ userName, setUserName ] = useState('');
    const [ password, setPassword ] = useState('');
    const router = useRouter();

    function handleSubmit(e) {
        e.preventDefault();  // prevent the page to reload on submit
        console.log(`user submitted the form. Name:${userName} Password: ${password}`);
        router.push('/dashboard');
    }

    return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col xs={10} sm={8} md={6} lg={4}>
          <h2 className="text-center mb-4">Login</h2>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" value={userName} onChange={(e) => setUserName(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100" onClick={handleSubmit}>Login</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}