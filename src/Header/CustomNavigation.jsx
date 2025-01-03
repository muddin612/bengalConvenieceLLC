// CustomNavigation.jsx
import Nav from "react-bootstrap/Nav";
import { Link, useResolvedPath, useMatch, useLocation } from "react-router-dom";
import "./NavLink.css";

function CustomNavigation() {
  const location = useLocation();
  const categoryMatch = location.pathname.match(/\/category\/(.+)/);
  const isNewJerseyLottery = location.pathname === "/new-jersey-lottery";
  const currentCategory = categoryMatch
    ? decodeURIComponent(categoryMatch[1])
    : null;
  return (
    <Nav className="me-auto navigation-container">
      <CustomLink to="/">Home</CustomLink>
      <CustomLink to="/about">About</CustomLink>
      {isNewJerseyLottery && (
        <Nav.Link className="nav-link active" disabled>
          new-jersey-lottery
        </Nav.Link>
      )}
      {currentCategory && (
        <Nav.Link className="nav-link active" disabled>
          {currentCategory}
        </Nav.Link>
      )}
    </Nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isMatch = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <Nav.Link
      active={isMatch}
      className={`nav-link ${isMatch ? "active" : ""}`}
      as={Link}
      to={to}
      {...props}
    >
      {children}
    </Nav.Link>
  );
}

export default CustomNavigation;
