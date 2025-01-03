import React, { useState } from "react";
import { Container, Button, Row, Col, Card } from "react-bootstrap";

import uberEatsLogo from "../assets/Uber-Eats.png";
import grubHubLogo from "../assets/Grubhub-Logo.png";
import doorDashLogo from "../assets/doordashLogo.png";

export default function Delivery() {
  const [hoveredService, setHoveredService] = useState(null);

  const deliveryServices = [
    {
      name: "Uber Eats",
      color: "success",
      image: uberEatsLogo,
      url: "https://shorturl.at/bpunf",
      description: "Fast & Reliable Delivery",
    },
    {
      name: "GrubHub",
      color: "warning",
      image: grubHubLogo,
      url: "https://www.grubhub.com/restaurant/bengal-convenience-423-main-street-west-orange/8821224",
      description: "Great Deals & Rewards",
    },
  ];

  return (
    <Container className="my-5">
      <Row className="justify-content-center g-4">
        {deliveryServices.map((service) => (
          <Col key={service.name} sm={6} md={4}>
            <Card
              className={`h-100 border-0 shadow-sm ${
                hoveredService === service.name ? "shadow-lg" : ""
              }`}
              style={{ transition: "all 0.3s ease" }}
            >
              <Card.Body className="d-flex flex-column align-items-center">
                <Button
                  as="a"
                  href={service.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant={service.name === "DoorDash" ? "" : service.color}
                  className="w-100 py-4 rounded-3 mb-3"
                  style={{
                    backgroundColor:
                      service.name === "DoorDash"
                        ? hoveredService === service.name
                          ? "#660000"
                          : "#8B0000"
                        : undefined,
                    borderColor:
                      service.name === "DoorDash"
                        ? hoveredService === service.name
                          ? "#660000"
                          : "#8B0000"
                        : undefined,
                    transition: "all 0.3s ease",
                    transform:
                      hoveredService === service.name
                        ? "scale(1.05)"
                        : "scale(1)",
                  }}
                  onMouseEnter={() => setHoveredService(service.name)}
                  onMouseLeave={() => setHoveredService(null)}
                >
                  <img
                    src={service.image}
                    alt={service.name}
                    style={{
                      maxHeight: "50px",
                      width: "auto",
                      filter: "brightness(0) invert(1)",
                    }}
                  />
                </Button>
                <h5 className="fw-bold mb-2">{service.name}</h5>
                <p className="text-muted text-center small mb-0">
                  {service.description}
                </p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Additional Info */}
      <div className="text-center mt-4">
        <p className="text-muted mb-0">
          <small className="fw-bold">
            Delivery fees and minimum order values may apply
          </small>
        </p>
      </div>
    </Container>
  );
}
