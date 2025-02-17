import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { supabase } from "../DB/supabaseClient";
import "./CSS/CategorySelected.css";

const OptimizedImage = ({ src, alt, style, className }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div
      className="position-relative w-100 h-100"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...style,
      }}
    >
      {!imageLoaded && !error && (
        <div className="position-absolute">
          <Spinner animation="border" variant="secondary" size="sm" />
        </div>
      )}

      <img
        src={
          error
            ? "https://www.russorizio.com/wp-content/uploads/2016/07/ef3-placeholder-image.jpg"
            : src
        }
        alt={alt}
        className={`${className} transition-opacity ${
          imageLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          objectFit: "contain", // or 'cover' based on your preference
          objectPosition: "center",
          transition: "opacity 0.3s",
          ...style,
        }}
        loading="lazy"
        onLoad={() => setImageLoaded(true)}
        onError={() => setError(true)}
      />
    </div>
  );
};

export default function CategorySelected() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [lastId, setLastId] = useState(null);
  const [initialLoad, setInitialLoad] = useState(true);
  const ITEMS_PER_PAGE = 12;

  const observer = useRef();
  const lastProductRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const fetchProducts = async (isInitial = false) => {
    try {
      setLoading(true);

      let query = supabase
        .from("products")
        .select("*")
        .ilike("product_category", categoryName)
        .order("id", { ascending: true })
        .limit(ITEMS_PER_PAGE);

      if (!isInitial && lastId) {
        query = query.gt("id", lastId);
      }

      const { data, error } = await query;

      if (error) throw error;

      if (data) {
        if (isInitial) {
          setProducts(data);
        } else {
          setProducts((prev) => [...prev, ...data]);
        }

        setHasMore(data.length === ITEMS_PER_PAGE);
        if (data.length > 0) {
          setLastId(data[data.length - 1].id);
        }
      }
    } catch (error) {
      console.error("Error fetching products:", error.message);
    } finally {
      setLoading(false);
      if (isInitial) {
        setInitialLoad(false);
      }
    }
  };

  const fetchNextPage = () => {
    if (!loading && hasMore) {
      fetchProducts(false);
    }
  };

  // Initial load when category changes
  useEffect(() => {
    setProducts([]);
    setLastId(null);
    setHasMore(true);
    setInitialLoad(true);
    fetchProducts(true);
  }, [categoryName]);

  // Loading skeleton
  const LoadingSkeleton = () => (
    <Row xs={2} sm={2} md={3} lg={4} className="g-4">
      {[...Array(4)].map((_, idx) => (
        <Col key={`skeleton-${idx}`}>
          <Card className="h-100 shadow-sm">
            <div
              className="bg-light d-flex justify-content-center align-items-center"
              style={{ height: "200px" }}
            >
              <Spinner
                animation="border"
                variant="secondary"
                className="position-absolute"
              />
            </div>
            <Card.Body>
              <div
                className="bg-light w-75 mb-2"
                style={{ height: "20px" }}
              ></div>
              <div
                className="bg-light w-25 mb-2"
                style={{ height: "20px" }}
              ></div>
              <div className="bg-light w-100" style={{ height: "60px" }}></div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );

  return (
    <Container className="py-5 mt-5">
      <div className="category-selected">
        <h1 className="text-center mb-4">{categoryName}</h1>

        <Row xs={2} sm={2} md={3} lg={4} className="g-4">
          {products.map((product, index) => {
            const isLastProduct = index === products.length - 1;

            return (
              <Col key={product.id} ref={isLastProduct ? lastProductRef : null}>
                <Card className="h-100 shadow-sm product-card d-flex flex-column">
                  <div
                    className="card-image-container d-flex justify-content-center align-items-center"
                    style={{
                      height: "200px",
                      overflow: "hidden",
                      backgroundColor: "#f8f9fa", // Optional light background
                    }}
                  >
                    <OptimizedImage
                      src={product.product_image}
                      alt={product.product_name}
                      className="w-100 h-100"
                      style={{
                        objectFit: "contain", // or 'cover'
                      }}
                    />
                  </div>
                  <Card.Body className="d-flex flex-column flex-grow-1">
                    <Card.Title className="mb-2">
                      {product.product_name}
                    </Card.Title>
                    <Card.Text className="text-muted mb-2">
                      ${parseFloat(product.product_price).toFixed(2)}
                    </Card.Text>
                    <Card.Text
                      className="product-description flex-grow-1"
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      <small> {product.product_description} </small>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>

        {loading && <LoadingSkeleton />}

        {!initialLoad && !loading && products.length === 0 && (
          <div className="text-center mt-4">
            <p className="text-xl font-semibold">Coming Soon!</p>
            <p className="text-gray-600 mt-2">
              We're working on adding exciting products to this category.
            </p>
          </div>
        )}
      </div>
    </Container>
  );
}
