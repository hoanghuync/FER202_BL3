import React from 'react';
import { Carousel, Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
  const carouselItems = [
    {
      id: 1,
      title: "Latest Smartphones",
      subtitle: "Discover the newest technology",
      description: "Get the latest smartphones with cutting-edge features and amazing performance.",
      image: "/images/iphone15promax.jpg",
      buttonText: "Shop Now",
      buttonLink: "/home"
    },
    {
      id: 2,
      title: "Premium Quality",
      subtitle: "Best brands, best prices",
      description: "Choose from top brands like Apple, Samsung, Google and more.",
      image: "/images/galaxys24ultra.jpg",
      buttonText: "Explore",
      buttonLink: "/home"
    },
    {
      id: 3,
      title: "Special Offers",
      subtitle: "Limited time deals",
      description: "Don't miss out on our exclusive offers and discounts.",
      image: "/images/pixel8pro.jpg",
      buttonText: "View Deals",
      buttonLink: "/home"
    },
    {
      id: 4,
      title: "Gaming Phones",
      subtitle: "Ultimate gaming experience",
      description: "Experience the best gaming performance with our gaming smartphones.",
      image: "/images/rogphone8pro.jpg",
      buttonText: "Game On",
      buttonLink: "/home"
    },
    {
      id: 5,
      title: "Camera Excellence",
      subtitle: "Capture every moment",
      description: "Professional photography with our camera-focused smartphones.",
      image: "/images/xiaomi14ultra.jpg",
      buttonText: "Capture More",
      buttonLink: "/home"
    }
  ];

  return (
    <div className="header-section">
      {/* Main Carousel */}
      <Carousel 
        className="hero-carousel mb-4"
        indicators={true}
        controls={true}
        interval={5000}
        pause="hover"
      >
        {carouselItems.map((item) => (
          <Carousel.Item key={item.id}>
            <div 
              className="carousel-slide"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${item.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '500px',
                display: 'flex',
                alignItems: 'center',
                color: 'white'
              }}
            >
              <Container>
                <Row className="align-items-center">
                  <Col lg={6} md={8} sm={12}>
                    <div className="carousel-content">
                      <h1 className="display-4 fw-bold mb-3" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                        {item.title}
                      </h1>
                      <h3 className="h4 mb-3 text-warning" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                        {item.subtitle}
                      </h3>
                      <p className="lead mb-4" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                        {item.description}
                      </p>
                      <Button 
                        as={Link}
                        to={item.buttonLink}
                        variant="warning" 
                        size="lg"
                        className="fw-bold px-4 py-2"
                        style={{ 
                          borderRadius: '25px',
                          boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'translateY(-2px)';
                          e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
                        }}
                      >
                        {item.buttonText}
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </Carousel.Item>
        ))}
             </Carousel>

      {/* Stats Section */}
      <div className="stats-section py-5" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <Container>
          <Row className="text-center text-white">
            <Col md={3} sm={6} className="mb-4">
              <div className="stat-item">
                <h2 className="display-4 fw-bold mb-2">1000+</h2>
                <p className="lead mb-0">Happy Customers</p>
              </div>
            </Col>
            <Col md={3} sm={6} className="mb-4">
              <div className="stat-item">
                <h2 className="display-4 fw-bold mb-2">50+</h2>
                <p className="lead mb-0">Phone Models</p>
              </div>
            </Col>
            <Col md={3} sm={6} className="mb-4">
              <div className="stat-item">
                <h2 className="display-4 fw-bold mb-2">24/7</h2>
                <p className="lead mb-0">Support</p>
              </div>
            </Col>
            <Col md={3} sm={6} className="mb-4">
              <div className="stat-item">
                <h2 className="display-4 fw-bold mb-2">100%</h2>
                <p className="lead mb-0">Quality Guarantee</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Header; 