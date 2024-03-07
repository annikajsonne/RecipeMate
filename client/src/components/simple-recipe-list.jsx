import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { load_recipe_list } from '../data/recipes-loader';

const SimpleRecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    load_recipe_list()
      .then(data => {
        setRecipes(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Fetching recipe list failed:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading recipes...</div>;
  }

  if (error) {
    return <div>Error loading recipes: {error.message}</div>;
  }

  if (recipes.length === 0) {
    return <div>No recipes found</div>;
  }

  return (
    <ul>
      {recipes.map(recipe => (
        <li key={recipe._id}>
          <Link to={`/recipes/${recipe._id}`}>{recipe.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default SimpleRecipeList;
