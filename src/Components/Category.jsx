import { Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { memo, useCallback, useMemo, useState, useEffect, useRef } from "react";
import "./CSS/Category.css";

const CATEGORIES = [
  {
    id: 1,
    name: "DRINKS",
    image:
      "https://images.unsplash.com/photo-1527960471264-932f39eb5846?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    name: "SNACKS",
    image:
      "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
  },
  {
    id: 3,
    name: "DELI",
    image:
      "https://plus.unsplash.com/premium_photo-1675354958496-fb4a77d596f9?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    name: "GROCERIES",
    image:
      "https://images.unsplash.com/photo-1515706886582-54c73c5eaf41?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 5,
    name: "CHIPS",
    image:
      "https://images.unsplash.com/photo-1604565011092-c0fa4416f80f?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 6,
    name: "CIGARETTES",
    image:
      "https://plus.unsplash.com/premium_vector-1727953895187-8dcbc97a5ffa?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 7,
    name: "New Jersey Lottery",
    image:
      "https://plus.unsplash.com/premium_vector-1727955580527-bcdbcf570565?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 8,
    name: "COFFEE",
    image:
      "https://plus.unsplash.com/premium_photo-1675435644687-562e8042b9db?q=80&w=2849&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 9,
    name: "OTHERS",
    image:
      "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
  },
  {
    id: 10,
    name: "DAIRY",
    image:
      "https://plus.unsplash.com/premium_vector-1708810688100-22f507769bf6?q=80&w=2630&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 11,
    name: "Cleaning Products",
    image:
      "https://plus.unsplash.com/premium_vector-1682298797113-67b918517b20?q=80&w=2980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 12,
    name: "Detergent",
    image:
      "https://plus.unsplash.com/premium_vector-1698192224633-b9b549e9b367?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

// Memoized CategoryCard component with lazy loading
const CategoryCard = memo(({ category, onClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: "50px",
        threshold: 0.1,
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <Card
      className="shadow-sm h-100 category-card"
      onClick={() => onClick(category.name)}
      ref={cardRef}
    >
      {isVisible && (
        <>
          {!imageLoaded && (
            <div
              className="placeholder-glow"
              style={{
                height: "200px",
                backgroundColor: "#e9ecef",
                position: "absolute",
                width: "100%",
              }}
            />
          )}
          <Card.Img
            loading="lazy"
            className="category-image"
            src={category.image}
            alt={category.name}
            style={{
              height: "200px",
              objectFit: "cover",
              opacity: imageLoaded ? 1 : 0,
              transition: "opacity 0.3s ease-in-out",
            }}
            onLoad={handleImageLoad}
          />
          <Card.ImgOverlay className="d-flex align-items-center justify-content-center bg-dark bg-opacity-50 hover-overlay">
            <Card.Title className="text-white text-center mb-0">
              <span className="fw-bold fs-4 text-uppercase letter-spacing-2">
                {category.name}
              </span>
              <div className="border-top border-2 border-white w-50 mx-auto mt-2"></div>
            </Card.Title>
          </Card.ImgOverlay>
        </>
      )}
      {!isVisible && (
        <div
          className="placeholder-glow"
          style={{ height: "200px", backgroundColor: "#e9ecef" }}
        />
      )}
    </Card>
  );
});

CategoryCard.displayName = "CategoryCard";

export default function Category() {
  const navigate = useNavigate();
  const categories = useMemo(() => CATEGORIES, []);

  const handleCategoryClick = useCallback(
    (categoryName) => {
      if (categoryName === "New Jersey Lottery") {
        navigate("/category/New Jersey Lottery");
      } else {
        navigate(`/category/${categoryName}`);
      }
    },
    [navigate]
  );

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4 fw-bold text-uppercase">
        Our Categories
        <div className="border-bottom border-3 border-primary w-25 mx-auto mt-2"></div>
      </h2>
      <Row>
        {categories.map((category) => (
          <Col key={category.id} sm={6} lg={4} className="mb-4">
            <CategoryCard category={category} onClick={handleCategoryClick} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
