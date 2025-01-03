import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Award, Star } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

const NewJerseyLottery = () => {
  const winningTickets = [
    {
      amount: "$500",
      date: "11/10/2024",
      location: "BENGAL CONVENIENCE",
      game: "ULTIMATE SPECTACULAR",
      img: "https://www.njlottery.com/content/dam/portal/images/instant-games/01877/thumb-rc@2X.png",
    },
    {
      amount: "$500",
      date: "11/17/2024",
      location: "BENGAL CONVENIENCE",
      game: "Crossword Bonanza",
      img: "https://www.njlottery.com/content/dam/portal/images/instant-games/01891/thumb-rc@2X.png",
    },
  ];

  const sortedTickets = [...winningTickets].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA;
  });

  return (
    <Container fluid className="py-5 px-3 px-md-4 mt-5">
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold d-flex align-items-center justify-content-center">
          <Award className="me-3" size={48} />
          New Jersey Lottery
        </h1>
      </div>

      {/* Winners Display */}
      <Row className="g-4">
        {sortedTickets.map((ticket, index) => (
          <Col xs={12} sm={6} lg={4} xl={3} key={index}>
            <Card className="border-4 border-warning h-100">
              <Card.Header className="bg-success text-white text-center py-3">
                <div className="d-flex justify-content-center align-items-center gap-2">
                  <Star size={24} fill="yellow" color="yellow" />
                  <h4 className="mb-0">WINNING TICKET</h4>
                  <Star size={24} fill="yellow" color="yellow" />
                </div>
                <h5 className="mb-0 mt-2 text-white">SOLD HERE!</h5>
              </Card.Header>

              <Card.Body className="text-center">
                <h2 className="display-3 fw-bold mb-3">{ticket.amount}</h2>
                <h3 className="mb-4">{ticket.date}</h3>
                <p className="mb-2 fw-bold">{ticket.location}</p>
                <div className="mt-4">
                  <img
                    src={ticket.img}
                    alt={ticket.game}
                    className="img-fluid"
                    style={{ maxHeight: "100px" }}
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Disclaimer */}
      <div className="mt-5 text-center">
        <img
          src="https://www.njlottery.com/content/dam/portal/images/NewJerseyLottery_Logo_Full%20Color.png"
          alt="NJ Lottery Logo"
          className="me-3"
          style={{ height: "40px" }}
        />
        <small className="text-muted">
          Must be 18 or older to play. Please play responsibly. If you or
          someone you know has a gambling problem, call 1-800-GAMBLER.
        </small>
      </div>
    </Container>
  );
};

export default NewJerseyLottery;
