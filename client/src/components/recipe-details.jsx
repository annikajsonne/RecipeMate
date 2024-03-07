import React from 'react';
import IngredientList from './ingredient-list';
import UserReviews from './user-reviews';

const RecipeDetail = () => {
    const recipe = useLoaderData(); 
  
    return (
      <div>
        <h2>{recipe.name}</h2>
        {recipe.pictureUrl && <img src={recipe.pictureUrl} alt={recipe.name} />}
        <p>{recipe.description}</p>
        <IngredientList ingredients={recipe.ingredients} />
        <UserReviews recipeId={recipe._id} />
      </div>
    );
  };
  
  export default RecipeDetail;