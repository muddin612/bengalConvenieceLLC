import React, { useState, useEffect, useCallback } from "react";
import { Container, Button, Card, Row, Col } from "react-bootstrap";
import { supabase } from "../DB/supabaseClient";
import "./CSS/DailyDeals.css";

// Loading Component
const LoadingSpinner = () => (
  <Container className="text-center my-5">
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </Container>
);

// Error Component
const ErrorMessage = ({ message }) => (
  <Container className="text-center my-5">
    <div className="alert alert-danger" role="alert">
      Error loading daily deals: {message}
    </div>
  </Container>
);

// Deal Slide Component
const DealSlide = React.memo(({ deal }) => (
  <div className="slide">
    <Card.Img
      src={deal.products.product_image}
      alt={deal.products.product_name}
      className="slide-image"
      loading="lazy"
    />
    {deal.badge && (
      <div className="slide-badge text-uppercase">{deal.badge}</div>
    )}
    <div className="slide-content">
      <h2 className="display-6 fw-bold mb-2 text-white">
        {deal.products.product_name}
      </h2>
      <p className="lead mb-3 text-light">
        {deal.products.product_description}
      </p>
      <div className="price-container">
        <h3 className="text-warning display-5 fw-bold mb-2">
          ${deal.deal_price.toFixed(2)}
        </h3>
        <span className="original-price text-light text-decoration-line-through">
          ${deal.products.product_price.toFixed(2)}
        </span>
        <span className="savings-badge">
          Save ${(deal.products.product_price - deal.deal_price).toFixed(2)}
        </span>
      </div>
      <div className="deal-duration">
        <small className="text-light">
          Valid until {new Date(deal.end_date).toLocaleDateString()}
        </small>
      </div>
    </div>
  </div>
));

// Main Component
export default function DailyDeals() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [dailyDeals, setDailyDeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cache management
  const CACHE_KEY = "dailyDeals";
  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  const checkCache = () => {
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_DURATION) {
        return data;
      }
    }
    return null;
  };

  const setCache = (data) => {
    sessionStorage.setItem(
      CACHE_KEY,
      JSON.stringify({
        data,
        timestamp: Date.now(),
      })
    );
  };

  // Fetch data
  const fetchDailyDeals = useCallback(async () => {
    try {
      // Check cache first
      const cachedData = checkCache();
      if (cachedData) {
        setDailyDeals(cachedData);
        setIsLoading(false);
        return;
      }

      const today = new Date().toISOString().split("T")[0];

      const { data, error } = await supabase
        .from("dailydeals")
        .select(
          `
          id,
          product_id,
          deal_price,
          start_date,
          end_date,
          badge,
          products!inner (
            product_name,
            product_description,
            product_price,
            product_image
          )
        `
        )
        .lte("start_date", today)
        .gte("end_date", today)
        .order("deal_price", { ascending: true });

      if (error) throw error;

      setDailyDeals(data || []);
      setCache(data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching daily deals:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Slide management
  const handleSlideChange = useCallback((newIndex) => {
    setIsSliding(true);
    setCurrentSlide(newIndex);
    setTimeout(() => setIsSliding(false), 500);
  }, []);

  const handlePrevious = useCallback(() => {
    const newIndex =
      currentSlide === 0 ? dailyDeals.length - 1 : currentSlide - 1;
    handleSlideChange(newIndex);
  }, [currentSlide, dailyDeals.length, handleSlideChange]);

  const handleNext = useCallback(() => {
    const newIndex =
      currentSlide === dailyDeals.length - 1 ? 0 : currentSlide + 1;
    handleSlideChange(newIndex);
  }, [currentSlide, dailyDeals.length, handleSlideChange]);

  // Image prefetching
  const prefetchNextImage = useCallback(() => {
    if (dailyDeals.length > 1) {
      const nextIndex = (currentSlide + 1) % dailyDeals.length;
      const nextImage = new Image();
      nextImage.src = dailyDeals[nextIndex].products.product_image;
    }
  }, [currentSlide, dailyDeals]);

  // Effects
  useEffect(() => {
    fetchDailyDeals();

    const subscription = supabase
      .channel("dailydeals_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "dailydeals" },
        fetchDailyDeals
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [fetchDailyDeals]);

  useEffect(() => {
    prefetchNextImage();
  }, [currentSlide, prefetchNextImage]);

  // Auto-advance slides
  useEffect(() => {
    if (dailyDeals.length > 1) {
      const timer = setInterval(handleNext, 5000); // Change slide every 5 seconds
      return () => clearInterval(timer);
    }
  }, [dailyDeals.length, handleNext]);

  // Early returns
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (dailyDeals.length === 0) {
    return (
      <Container className="text-center my-5">
        <div className="alert alert-info" role="alert">
          No active deals available at the moment.
        </div>
      </Container>
    );
  }

  // Main render
  return (
    <Container fluid="md" className="my-3 my-md-5">
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={12}>
          <Card className="shadow-lg border-0">
            <Card.Body className="p-2 p-md-4">
              <Card.Title className="text-center mb-4">
                <h2 className="display-6 fw-bold text-primary">
                  Daily Deals
                  <div className="border-bottom border-3 border-primary w-25 mx-auto mt-2"></div>
                </h2>
              </Card.Title>
              <div className="position-relative overflow-hidden">
                <div
                  className={`slide-container ${isSliding ? "sliding" : ""}`}
                  style={{
                    transform: `translateX(-${currentSlide * 100}%)`,
                  }}
                >
                  {dailyDeals.map((deal) => (
                    <DealSlide key={deal.id} deal={deal} />
                  ))}
                </div>

                {dailyDeals.length > 1 && (
                  <>
                    <Button
                      variant="light"
                      className="nav-button prev"
                      onClick={handlePrevious}
                      aria-label="Previous deal"
                    >
                      ‹
                    </Button>
                    <Button
                      variant="light"
                      className="nav-button next"
                      onClick={handleNext}
                      aria-label="Next deal"
                    >
                      ›
                    </Button>
                  </>
                )}
              </div>

              {dailyDeals.length > 1 && (
                <div className="slide-indicators">
                  {dailyDeals.map((_, index) => (
                    <span
                      key={index}
                      className={`indicator ${
                        currentSlide === index ? "active" : ""
                      }`}
                      onClick={() => handleSlideChange(index)}
                      role="button"
                      aria-label={`Go to deal ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
