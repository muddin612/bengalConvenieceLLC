import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Rocket, Star, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
        minHeight: "100vh",
        width: "100vw",
        margin: 0,
        padding: 0,
        overflow: "hidden",
        position: "fixed",
        top: 0,
        left: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Animated stars background */}
      {[...Array(20)].map((_, i) => (
        <Star
          key={i}
          size={Math.random() * 20 + 10}
          style={{
            position: "absolute",
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            color: "#fff",
            opacity: Math.random() * 0.7 + 0.3,
            animation: `twinkle ${Math.random() * 3 + 2}s infinite`,
          }}
        />
      ))}

      <Container className="position-relative">
        <Row className="justify-content-center text-center">
          <Col md={8} lg={6}>
            <div
              className="mb-4"
              style={{ animation: "float 3s ease-in-out infinite" }}
            >
              <Rocket
                size={100}
                style={{
                  color: "#e94560",
                  transform: "rotate(45deg)",
                }}
              />
            </div>

            <h1
              className="display-1 fw-bold mb-3"
              style={{
                color: "#fff",
                fontSize: "clamp(5rem, 15vw, 8rem)",
                textShadow: "4px 4px 0 #e94560",
              }}
            >
              404
            </h1>

            <h2
              className="mb-4"
              style={{
                color: "#fff",
                fontSize: "clamp(1.5rem, 4vw, 2rem)",
                fontWeight: "300",
              }}
            >
              Houston, We Have a Problem!
            </h2>

            <p
              className="lead mb-5"
              style={{
                color: "#a2a2a2",
                fontSize: "clamp(1rem, 2vw, 1.25rem)",
              }}
            >
              The page you're looking for has drifted into deep space.
            </p>

            <div className="d-flex gap-3 justify-content-center flex-wrap">
              <Button
                size="lg"
                className="d-flex align-items-center gap-2"
                style={{
                  backgroundColor: "#e94560",
                  border: "none",
                  padding: "0.8rem 1.5rem",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.transform = "translateY(-3px)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.transform = "translateY(0)")
                }
                onClick={() => navigate("/")}
              >
                <ArrowLeft size={20} />
                Return to Earth
              </Button>
            </div>
          </Col>
        </Row>
      </Container>

      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px) rotate(45deg); }
            50% { transform: translateY(-20px) rotate(45deg); }
            100% { transform: translateY(0px) rotate(45deg); }
          }

          @keyframes twinkle {
            0% { opacity: 0.3; }
            50% { opacity: 1; }
            100% { opacity: 0.3; }
          }

          body {
            margin: 0;
            padding: 0;
            overflow: hidden;
          }

          /* Ensure buttons stack nicely on mobile */
          @media (max-width: 576px) {
            .d-flex.gap-3 {
              flex-direction: column;
              width: 100%;
            }
            .d-flex.gap-3 button {
              width: 100%;
              justify-content: center;
            }
          }
        `}
      </style>
    </div>
  );
};

export default NotFound;
