import { Container, Row, Col } from "react-bootstrap";
import Login from "../pages/login";

export default function Home() {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center text-center">
          <h1>Welcome to My SaaS</h1>
          <p>This is the landing page</p>
          <h4>For user name enter: <b>bob</b></h4>
          <h4>For password enter: <b>myPassword</b></h4>
      </Row>

      <Login />
    </Container>
  );
}