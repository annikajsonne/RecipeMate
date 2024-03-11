import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Review from './reviews';
import { load_recipe_detail } from '../data/recipes-loader';

// import styles from './recipe-detail.module.css'; // Ensure this file exists and contains relevant styles

const RecipeDetail = () => {
    const { id: recipeId } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reviews, setReviews] = useState([]);
    const navigate = useNavigate();
    console.log('Params:', useParams()); // Should log the params object
    console.log('Recipe ID:', recipeId); // Should log the actual recipe ID

    const handleDelete = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this recipe?');
        if (confirmDelete) {
          try {
            const response = await fetch(`/api/recipes/${recipeId}`, {
              method: 'DELETE',
            });
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            navigate('/all-recipes'); // Redirect to the list of recipes after deletion
          } catch (err) {
            setError(err.message);
          }
        }
      };

      
    useEffect(() => {
      setIsLoading(true);
  
      // Use the loader function to fetch the recipe details
      load_recipe_detail({ params: { id: recipeId } })
        .then((loadedRecipe) => {
          setRecipe(loadedRecipe);
          if (!loadedRecipe) {
            throw new Error(`No recipe found for ID: ${recipeId}`);
          }
          return fetch(`/api/recipes/${recipeId}/reviews`); // Chain the review fetch after recipe
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok - reviews');
          }
          return response.json();
        })
        .then((loadedReviews) => {
          setReviews(loadedReviews);
        })
        .catch((err) => {
          setError(err.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
  
    }, [recipeId]); // Dependency array to ensure the effect is run when recipeId changes
  
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!recipe) return <div>Recipe not found.</div>;  

  return (
    <div>
      <h1>{recipe.name}</h1>
      <img src={recipe.image} alt={recipe.name} />
      <p>{recipe.description}</p>
      <p>Prep Time: {recipe.prepTime} minutes</p>
      <p>Cook Time: {recipe.cookTime} minutes</p>
      <h2>Ingredients</h2>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient.amount} of {ingredient.name}</li>
        ))}
      </ul>
      <h2>Directions</h2>
      <ol>
        {recipe.directions.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
      <Link to={`/create-update-recipe/${recipeId}`}>Edit Recipe</Link>
      <h2>User Reviews</h2>
      {reviews.length > 0 ? (
        reviews.map((review) => <Review key={review._id} review={review} />)
      ) : (
        <p>No reviews yet.</p>
      )}
      <button onClick={handleDelete}>Delete Recipe</button>
    </div>
  );
};

export default RecipeDetail;
