import { Container, Row } from "react-bootstrap"
export default function Dashboard() {
    return (
        <>
            <Container className="mt-5">
                <Row className="justify-content-center text-center">
                    <h3>Congratulations!</h3><br />
                    <h5>You Are in Dashboard! Now You Are Fully Authenticated!</h5>
                </Row>
            </Container>
        </>
    )
}