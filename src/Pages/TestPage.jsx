import React, { useState } from "react";
import {
  Container,
  Navbar,
  Nav,
  Button,
  Form,
  FormControl,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import { Search, Menu, X, Phone, MessageSquare } from "lucide-react";
import uberEatsLogo from "../assets/Uber-Eats.png";
import grubHubLogo from "../assets/Grubhub-Logo.png";
import doorDashLogo from "../assets/doordashLogo.png";

const TestPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const categories = [
    { id: 1, name: "DRINKS", image: "https://via.placeholder.com/300x200" },
    { id: 2, name: "SNACKS", image: "https://via.placeholder.com/300x200" },
    { id: 3, name: "DELI", image: "https://via.placeholder.com/300x200" },
    { id: 4, name: "GROCERIES", image: "https://via.placeholder.com/300x200" },
    {
      id: 5,
      name: "CIGARETTES/VAPES",
      image: "https://via.placeholder.com/300x200",
    },
    { id: 6, name: "OTHERS", image: "https://via.placeholder.com/300x200" },
  ];

  const deliveryServices = [
    { name: "Uber Eats", color: "success", image: uberEatsLogo },
    { name: "GrubHub", color: "warning", image: grubHubLogo },
    { name: "DoorDash", color: "danger", image: doorDashLogo },
  ];
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div>
      {/* Header */}
      <Navbar bg="light" expand="md" fixed="top" className="shadow-sm">
        <Container>
          <Navbar.Brand href="#">Bengal Convenience</Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#">HOME</Nav.Link>
              <Nav.Link href="#">ABOUT</Nav.Link>
            </Nav>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
              />
              <Button variant="outline-secondary">
                <Search size={20} />
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Phone Number Section */}
      <div className="bg-light text-center py-5 mt-5">
        <Container>
          <a
            href="tel:8624021974"
            className="h3 d-block mb-4 text-decoration-none"
          >
            <Phone className="me-2" /> (862) 402 - 1974
          </a>
          <div className="d-flex justify-content-center gap-3">
            <Button variant="success" href="tel:8624021974">
              <Phone className="me-2" /> Call to Order
            </Button>
            <Button variant="primary" href="sms:8624021974">
              <MessageSquare className="me-2" /> Text to Order
            </Button>
          </div>
          <p className="text-muted mt-3">
            Fast & easy ordering - most orders ready in 15 minutes!
          </p>
        </Container>
      </div>

      {/* Delivery Services */}
      <Container className="my-4">
        <Row className="text-center">
          {deliveryServices.map((service) => (
            <Col key={service.name} sm={4} className="mb-3">
              <Button
                variant={service.name === "DoorDash" ? "" : service.color}
                className="w-100"
                style={
                  service.name === "DoorDash"
                    ? {
                        backgroundColor: isHovered ? "#660000" : "#8B0000",
                        borderColor: isHovered ? "#660000" : "#8B0000",
                        transition: "background-color 0.2s, border-color 0.2s",
                      }
                    : {}
                }
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <img
                  src={service.image}
                  alt={service.name}
                  style={{
                    maxHeight: "70px",
                    width: "auto",
                  }}
                />
              </Button>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Daily Deals Slider */}
      <Container className="my-5">
        <Card className="shadow">
          <Card.Body>
            <Card.Title className="text-center mb-4">Daily Deals</Card.Title>
            <div className="position-relative">
              <Card.Img
                src="https://via.placeholder.com/800x300"
                alt="Daily Deal"
              />
              <Button
                variant="light"
                className="position-absolute top-50 start-0 translate-middle-y ms-2"
              >
                ‹ Previous
              </Button>
              <Button
                variant="light"
                className="position-absolute top-50 end-0 translate-middle-y me-2"
              >
                Next ›
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>

      {/* Category Grid */}
      <Container className="my-5">
        <Row>
          {categories.map((category) => (
            <Col key={category.id} sm={6} lg={4} className="mb-4">
              <Card className="shadow-sm">
                <Card.Img src={category.image} alt={category.name} />
                <Card.ImgOverlay className="d-flex align-items-center justify-content-center bg-dark bg-opacity-50">
                  <Card.Title className="text-white">
                    {category.name}
                  </Card.Title>
                </Card.ImgOverlay>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Footer */}
      <footer className="bg-light py-4">
        <Container className="d-flex justify-content-between flex-wrap">
          <div className="d-flex flex-column flex-md-row gap-3">
            <a href="#" className="text-primary text-decoration-none">
              Instagram: @BENGALCONVENIENCE
            </a>
            <a href="#" className="text-primary text-decoration-none">
              Facebook: BENGAL CONVENIENCE
            </a>
          </div>
          <div className="text-muted text-center text-md-end">
            © 2024 Bengal Convenience. All rights reserved
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default TestPage;
