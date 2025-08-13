import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { FaUsers, FaClock, FaUtensils, FaHeart, FaRegHeart } from 'react-icons/fa';
import './RecipeCard.css';

const RecipeCard = ({ recipe, onViewRecipe, onAddToFavourite, isFavourite }) => {
  return (
    <Card className="recipe-card">
      <div className="recipe-image-container">
        <Card.Img 
          variant="top" 
          src={recipe.image} 
          alt={recipe.title}
          className="recipe-image"
          loading="lazy"
        />
        <div className="favourite-overlay">
          <Button
            variant="light"
            size="sm"
            className="favourite-btn"
            onClick={(e) => {
              e.stopPropagation();
              onAddToFavourite(recipe);
            }}
          >
            {isFavourite ? (
              <FaHeart className="heart-icon filled" />
            ) : (
              <FaRegHeart className="heart-icon" />
            )}
          </Button>
        </div>
        {isFavourite && (
          <Badge bg="danger" className="favourite-badge">
            ♥ Favourite
          </Badge>
        )}
      </div>
      <Card.Body className="recipe-card-body">
        <Card.Title className="recipe-title">{recipe.title}</Card.Title>
        <Card.Text className="recipe-description">
          {recipe.description}
        </Card.Text>
        
        <div className="recipe-details">
          <div className="detail-item">
            <FaUsers className="detail-icon" />
            <span>Servings: {recipe.servings}</span>
          </div>
          <div className="detail-item">
            <FaClock className="detail-icon" />
            <span>Prep: {recipe.prep} mins</span>
          </div>
          <div className="detail-item">
            <FaUtensils className="detail-icon" />
            <span>Cook: {recipe.cook} mins</span>
          </div>
        </div>
        
        <div className="recipe-actions">
          <Button 
            variant="success" 
            className="view-recipe-btn"
            onClick={() => onViewRecipe(recipe)}
          >
            View Recipe
          </Button>
          <Button
            variant="outline-danger"
            size="sm"
            className="add-favourite-btn"
            onClick={() => onAddToFavourite(recipe)}
          >
            <FaHeart className="me-1" />
            Add to Favourite
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default RecipeCard;
