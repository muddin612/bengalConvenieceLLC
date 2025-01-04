import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import { supabase } from "../DB/supabaseClient";
import { useLocation } from "react-router-dom";

const OptimizedImage = ({ src, alt, style, className }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div
      className="card-image-container position-relative"
      style={{
        height: "200px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        backgroundColor: "#f8f9fa", // Light background for consistency
        ...style,
      }}
    >
      {!imageLoaded && !error && (
        <div className="position-absolute top-50 start-50 translate-middle">
          <Spinner animation="border" variant="secondary" size="sm" />
        </div>
      )}

      <img
        src={
          error
            ? "/default-product-image.png"
            : src || "/default-product-image.png"
        }
        alt={alt}
        className={`${className} transition-opacity ${
          imageLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain", // or 'cover' depending on your preference
          objectPosition: "center",
          transition: "opacity 0.3s",
        }}
        loading="lazy"
        onLoad={() => setImageLoaded(true)}
        onError={() => setError(true)}
      />
    </div>
  );
};

export default function SearchProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Use useLocation to get the search term from URL
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("query") || "";

  useEffect(() => {
    const fetchSearchResults = async () => {
      // Reset states
      setLoading(true);
      setError(null);
      setProducts([]);

      if (!searchTerm) {
        setLoading(false);
        return;
      }

      try {
        // Perform a comprehensive search across multiple columns
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .or(
            `product_name.ilike.%${searchTerm}%,product_category.ilike.%${searchTerm}%,product_description.ilike.%${searchTerm}%`
          );

        if (error) throw error;

        setProducts(data);
      } catch (err) {
        console.error("Error fetching search results:", err);
        setError("Failed to fetch search results");
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchTerm]);

  // Render loading state
  if (loading) {
    return (
      <Container className="text-center my-4 py-5 mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  // Render error state
  if (error) {
    return (
      <Container>
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  // Render no results state
  if (products.length === 0 && !loading) {
    return (
      <Container className="py-5 mt-5">
        <Alert variant="info">No products found matching "{searchTerm}"</Alert>
      </Container>
    );
  }

  // Render search results
  return (
    <Container className="py-5 mt-5">
      <h2 className="mb-4">Search Results for "{searchTerm}"</h2>
      <Row xs={2} sm={2} md={3} lg={4} className="g-4">
        {products.map((product) => (
          <Col key={product.id}>
            <Card className="h-100 shadow-sm d-flex flex-column">
              <OptimizedImage
                src={product.product_image}
                alt={product.product_name}
                className="card-img-top"
              />
              <Card.Body className="d-flex flex-column flex-grow-1">
                <Card.Title className="mb-2">{product.product_name}</Card.Title>
                <Card.Text className="text-muted mb-2">
                  <strong>Category:</strong> {product.product_category}
                </Card.Text>
                <Card.Text className="mb-2">
                  <strong>Price:</strong> $
                  {parseFloat(product.product_price).toFixed(2)}
                </Card.Text>
                <Card.Text
                  className="flex-grow-1"
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {product.product_description}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
