import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import { supabase } from "../DB/supabaseClient";
import { useLocation } from "react-router-dom";

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
      <Row xs={1} md={3} className="g-4">
        {products.map((product) => (
          <Col key={product.id}>
            <Card>
              <Card.Img
                variant="top"
                src={product.product_image || "/default-product-image.png"}
                alt={product.product_name}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{product.product_name}</Card.Title>
                <Card.Text>
                  <strong>Category:</strong> {product.product_category}
                  <br />
                  <strong>Price:</strong> ${product.product_price}
                </Card.Text>
                <Card.Text>{product.product_description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
