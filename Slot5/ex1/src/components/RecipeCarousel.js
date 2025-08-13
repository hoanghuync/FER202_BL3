import React from 'react';
import { Carousel, Card, Button } from 'react-bootstrap';
import { FaUsers, FaClock, FaUtensils } from 'react-icons/fa';
import './RecipeCarousel.css';

const RecipeCarousel = ({ recipes, onViewRecipe }) => {
  // Chia recipes thành các nhóm 3 để hiển thị trong carousel
  const groupedRecipes = [];
  for (let i = 0; i < recipes.length; i += 3) {
    groupedRecipes.push(recipes.slice(i, i + 3));
  }

  return (
    <section className="recipe-carousel-section">
      <div className="container">
        <h2 className="carousel-title">Featured Recipes</h2>
        <Carousel interval={5000} className="recipe-carousel">
          {groupedRecipes.map((group, groupIndex) => (
            <Carousel.Item key={groupIndex}>
              <div className="carousel-content">
                <div className="row">
                  {group.map((recipe, index) => (
                    <div key={index} className="col-md-4">
                      <Card className="carousel-recipe-card">
                        <div className="recipe-image-container">
                          <Card.Img 
                            variant="top" 
                            src={recipe.image} 
                            alt={recipe.title}
                            className="carousel-recipe-image"
                          />
                        </div>
                        <Card.Body className="carousel-recipe-card-body">
                          <Card.Title className="carousel-recipe-title">
                            {recipe.title}
                          </Card.Title>
                          <Card.Text className="carousel-recipe-description">
                            {recipe.description}
                          </Card.Text>
                          
                          <div className="carousel-recipe-details">
                            <div className="detail-item">
                              <FaUsers className="detail-icon" />
                              <span>{recipe.servings}</span>
                            </div>
                            <div className="detail-item">
                              <FaClock className="detail-icon" />
                              <span>{recipe.prep}m</span>
                            </div>
                            <div className="detail-item">
                              <FaUtensils className="detail-icon" />
                              <span>{recipe.cook}m</span>
                            </div>
                          </div>
                          
                          <Button 
                            variant="outline-success" 
                            size="sm"
                            className="carousel-view-btn"
                            onClick={() => onViewRecipe(recipe)}
                          >
                            View Recipe
                          </Button>
                        </Card.Body>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default RecipeCarousel;
