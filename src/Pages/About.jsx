import "./CSS/About.css";
import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import {
  CheckCircle,
  Phone,
  Mail,
  Clock,
  MapPin,
  Coffee,
  ShoppingBag,
  Store,
  Heart,
} from "lucide-react";

const About = () => {
  return (
    <Container className="py-5 mt-5">
      <Row className="mb-5 text-center">
        <Col xs={12}>
          <h1 className="display-4 fw-bold">About Us</h1>
          <div className="border-bottom border-success w-25 mx-auto my-4"></div>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col xs={12}>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <Card.Title as="h2" className="text-success mb-4">
                <Store className="me-2 mb-1" size={24} />
                Our Story
              </Card.Title>
              <Card.Text className="lead text-muted">
                In June 2024, four friends came together with a shared vision:
                to revitalize the local shopping experience. Two brothers, along
                with their close friends, took the leap into business ownership
                with one goal in mind - to create more than just another
                convenience store.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-5 g-4">
        <Col md={6}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Body>
              <Card.Title as="h2" className="text-success mb-4">
                <Heart className="me-2 mb-1" size={24} />
                Our Mission
              </Card.Title>
              <Card.Text className="text-muted">
                We believe that a neighborhood store should be more than just a
                quick stop - it should be a place where the community feels
                welcome and can find everything they need. Our mission is to
                provide our customers with a convenient, friendly shopping
                experience while offering a carefully curated selection of
                products.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Body>
              <Card.Title as="h2" className="text-success mb-4">
                <ShoppingBag className="me-2 mb-1" size={24} />
                What We Offer
              </Card.Title>
              <ul className="list-unstyled">
                {[
                  { text: "Fresh cold sandwiches", icon: Coffee },
                  { text: "Refreshing beverages", icon: Coffee },
                  { text: "Variety of snacks", icon: Coffee },
                  { text: "Essential groceries", icon: ShoppingBag },
                  { text: "Everyday necessities", icon: ShoppingBag },
                ].map((item, index) => (
                  <li key={index} className="mb-3 d-flex align-items-center">
                    <CheckCircle className="text-success me-2" size={20} />
                    {item.text}
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col xs={12}>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <Card.Title as="h2" className="text-success mb-4">
                <Heart className="me-2 mb-1" size={24} />
                Community First
              </Card.Title>
              <Card.Text className="text-muted mb-4">
                As local business owners, we understand the importance of
                community. We're committed to stocking our shelves with the
                products you need and want, maintaining a clean and welcoming
                environment, and providing friendly service with a smile.
              </Card.Text>
              <Card.Text className="text-muted mb-0">
                We're more than just owners - we're your neighbors, and we look
                forward to serving you and being part of this community's daily
                life.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="text-center">
              <Card.Title as="h2" className="text-success mb-4">
                <MapPin className="me-2 mb-1" size={24} />
                Visit Us
              </Card.Title>
              <address className="text-muted mb-0">
                <p className="mb-1">423 Main Street</p>
                <p className="mb-1">West Orange, NJ 07052</p>
                <p className="mb-1 d-flex align-items-center justify-content-center">
                  <Phone className="me-2" size={18} />
                  (862) 402-1248
                </p>
                <p className="mb-1 d-flex align-items-center justify-content-center">
                  <Mail className="me-2" size={18} />
                  bengalconvenience@gmail.com
                </p>
                <p className="mb-0 d-flex align-items-center justify-content-center">
                  <Clock className="me-2" size={18} />
                  Open Mon - Sun: 08:00 AM - 08:00 PM
                </p>
                <p className="mb-0 d-flex align-items-center justify-content-center">
                  <Clock className="me-2" size={18} />
                  CLOSED FRIDAY
                </p>
              </address>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
