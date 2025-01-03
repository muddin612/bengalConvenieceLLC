import React from "react";
import { Container, Row, Col, Stack, Image } from "react-bootstrap";
import {
  Instagram,
  Facebook,
  MapPin,
  Navigation,
  Clock,
  Phone,
  Mail,
} from "lucide-react";
import logo from "../assets/bengalLogo.png";
import qr from "../assets/qr-code.png";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-3 mt-auto">
      <Container>
        <Row className="justify-content-between align-items-start mb-4">
          <Col xs={12} md={3} className="mb-4 mb-md-0">
            <div className="text-center text-md-start h-100">
              <Link to="/" className="d-block mb-3">
                <Image
                  src={logo}
                  alt="Bengal Convenience and Deli"
                  width={100}
                  height={100}
                  fluid
                />
              </Link>
              <h4 className="text-uppercase">Bengal Convenience &amp; Deli</h4>
            </div>
          </Col>
          <Col xs={12} md={3} className="mb-4 mb-md-0">
            <div className="text-center text-md-start">
              <h4 className="mb-3">Contact Us</h4>
              <Stack
                gap={2}
                className="align-items-center align-items-md-start"
              >
                <div className="d-flex align-items-center">
                  <Phone className="me-2" size={16} />
                  <span>(862) 402-1248</span>
                </div>
                <div className="d-flex align-items-center">
                  <Mail className="me-2" size={16} />
                  <span>bengalconvenience@gmail.com</span>
                </div>
              </Stack>
              {/* New Review Section with QR Code */}
              <div className="mt-4">
                <h5 className="mb-3">Leave A Review</h5>
                <a
                  href="https://g.page/r/CTMIx76bN7S4EBM/review"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={qr}
                    alt="QR Code for Review"
                    className="img-fluid"
                    width={100}
                    height={100}
                  />
                </a>
              </div>
            </div>
          </Col>

          <Col xs={12} md={3} className="mb-4 mb-md-0">
            <div className="text-center text-md-start">
              <h4 className="mb-3">Follow Us</h4>
              <Stack
                gap={2}
                className="align-items-center align-items-md-start"
              >
                <a
                  href="https://www.instagram.com/bengalconvenience/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-decoration-none d-flex align-items-center"
                >
                  <Instagram className="me-2" size={20} />
                  <span>Instagram</span>
                </a>
                <a
                  href="https://www.facebook.com/people/Bengal-Convenience/61561163715402/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-decoration-none d-flex align-items-center"
                >
                  <Facebook className="me-2" size={20} />
                  <span>Facebook</span>
                </a>
              </Stack>
            </div>
          </Col>
          <Col xs={12} md={3} className="mb-4 mb-md-0">
            <div className="text-center text-md-start">
              <h4 className="mb-3">Visit Us</h4>
              <Stack
                gap={2}
                className="align-items-center align-items-md-start"
              >
                <div className="d-flex align-items-center">
                  <MapPin className="me-2" size={16} />
                  <span>423 Main St, West Orange, NJ 07052</span>
                </div>
                <div className="d-flex align-items-center">
                  <Clock className="me-2" size={16} />
                  <span>Open Mon - Sun: 08:00 AM - 08:00 PM</span>
                </div>
                <div className="d-flex align-items-center">
                  <Clock className="me-2" size={16} />
                  <span>CLOSED FRIDAY</span>
                </div>
                <a
                  href="https://www.google.com/maps/place/Bengal+Convenience+%26+Deli/@40.7925497,-74.2329946,17z/data=!3m1!4b1!4m6!3m5!1s0x89c3aad902757b17:0xb8b4379bbec70833!8m2!3d40.7925497!4d-74.2329946!16s%2Fg%2F1tq6ff7n?entry=ttu&g_ep=EgoyMDI0MTEwNS4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-decoration-none d-flex align-items-center"
                >
                  <Navigation className="me-2" size={16} />
                  <span>Get Directions</span>
                </a>
              </Stack>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-center mt-4">
          <Col xs={12} className="text-center">
            <p className="mb-0 small">
              &copy; {new Date().getFullYear()} Bengal Convenience and Deli. All
              Rights Reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
