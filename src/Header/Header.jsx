import React, { useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../assets/bengalLogo.png";
import CustomNavigation from "./CustomNavigation";
import SearchBar from "./SearchBar";

export default function Header() {
  // Inline styles object for components that need custom styling
  const styles = {
    searchInput: {
      backgroundColor: "#333",
      border: "1px solid #444",
      color: "#fff",
    },
    logo: {
      width: "32px",
      height: "32px",
      objectFit: "contain",
      marginRight: "10px",
    },
  };

  // State to control navbar toggle
  const [expanded, setExpanded] = useState(false);

  const handleNavClick = () => {
    setExpanded(false);
  };

  return (
    <Navbar
      expand="lg"
      bg="dark"
      variant="dark"
      fixed="top"
      className="shadow"
      expanded={expanded}
    >
      <Container>
        {/* Logo and Brand Name */}
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <img
            src={logo}
            alt="Store Logo"
            style={styles.logo}
            className="d-inline-block align-top"
          />
          <small className="text-uppercase">
            Bengal Convenience &amp; Deli
          </small>
        </Navbar.Brand>

        {/* Hamburger Menu */}
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(!expanded)}
        />

        {/* Collapsible Content */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" onClick={handleNavClick}>
            <CustomNavigation />
          </Nav>
          {/* Search Form */}
          <SearchBar />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
