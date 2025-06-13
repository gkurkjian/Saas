import { Container, Row, Col } from "react-bootstrap";

export default function Home() {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center text-center">
        <h1>Welcome to My SaaS</h1>
        <p>This is the landing page of our platform.</p>
        <h3>To get started, you can either register with your own name and password,</h3>
        <h3>or use the demo credentials provided below.</h3> <br /><br /><br />
        <h4>Username: <b>bob</b></h4>
        <h4>Password: <b>myPassword</b></h4>
      </Row>
    </Container>
  );
}