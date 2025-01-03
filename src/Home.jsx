import { Container, Button, Row, Col, Card } from "react-bootstrap";
import { Phone, MessageSquare, Clock, CheckCircle } from "lucide-react";
import Delivery from "./Components/Delivery";
import DailyDeals from "./Components/DailyDeals";
import Category from "./Components/Category";

export default function Home() {
  return (
    <Container>
      {/* Call to Action Section */}
      <Card className="border-0 bg-light shadow-sm mt-5 mb-5">
        <Card.Body className="text-center py-5">
          {/* Phone Number */}
          <a
            href="tel:8624021974"
            className="h2 d-block mb-4 text-decoration-none text-primary fw-bold"
          >
            <Phone className="me-2" strokeWidth={1.5} />
            (862) 402-1248
          </a>

          {/* Action Buttons */}
          <div className="d-flex justify-content-center gap-3 mb-4">
            <Button
              variant="success"
              href="tel:8624021974"
              className="px-4 py-2"
              size="lg"
            >
              <Phone className="me-2" size={20} />
              Call to Order
            </Button>
            <Button
              variant="primary"
              href="sms:8624021974"
              className="px-4 py-2"
              size="lg"
            >
              <MessageSquare className="me-2" size={20} />
              Text to Order
            </Button>
          </div>

          {/* Features */}
          <Row className="justify-content-center">
            <Col md={8} lg={6}>
              <div className="d-flex justify-content-center gap-4">
                <div className="text-muted">
                  <Clock className="text-primary mb-2" size={24} />
                  <p className="mb-0 small fw-bold">Ready in 15 minutes</p>
                </div>
                <div className="text-muted">
                  <CheckCircle className="text-success mb-2" size={24} />
                  <p className="mb-0 small fw-bold">Fast &amp; Easy Ordering</p>
                </div>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Main Components */}
      <div className="mb-4">
        <Delivery />
      </div>
      <div className="mb-4">
        <DailyDeals />
      </div>
      <div className="mb-4">
        <Category />
      </div>
    </Container>
  );
}
