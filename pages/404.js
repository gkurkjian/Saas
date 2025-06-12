import { Container, Row, Col, Button } from "react-bootstrap";
import Link from 'next/link';

export default function Costume404() {
    return (
        <>
            <Container className="text-center mt-5">
                <Row>
                    <Col>
                        <h1>404 - Page Not Found</h1>
                        <Link href={'/'} passHref> <br />
                            <Button variant="primary">Go Home</Button>
                        </Link>
                    </Col>
                </Row>
            </Container>
        </>
    )
}