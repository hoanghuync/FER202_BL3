import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import RecipeCard from './RecipeCard';
import './RecipeList.css';

const RecipeList = ({ recipes, onViewRecipe, onAddToFavourite, favourites }) => {
  return (
    <section className="recipe-list-section">
      <Container>
        <Row>
          {recipes.map((recipe, index) => (
            <Col key={index} lg={4} md={6} className="mb-4">
              <RecipeCard 
                recipe={recipe} 
                onViewRecipe={onViewRecipe}
                onAddToFavourite={onAddToFavourite}
                isFavourite={favourites.some(fav => fav.title === recipe.title)}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default RecipeList;
