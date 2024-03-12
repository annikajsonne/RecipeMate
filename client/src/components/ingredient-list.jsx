import React from 'react';
import styles from './ingredient-list.module.scss';

const IngredientList = ({ ingredients }) => {
  return (
    <div className="ingredient-list">
      <h4>Ingredients:</h4>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient.quantity} {ingredient.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IngredientList;