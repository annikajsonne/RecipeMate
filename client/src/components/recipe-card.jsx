import React from 'react';
import styles from './recipe-card.module.css';

const RecipeCard = ({ recipe }) => {
    console.log('Recipe in RecipeCard:', recipe);

    const formatTime = (time) => `${time} minutes`;

    return (
        <div className={styles.recipeCard}>
            {recipe.pictureUrl && <img src={recipe.image} alt={recipe.name} className={styles.recipeCardImage} />}
            <h3 className={styles.recipeCardTitle}>{recipe.name}</h3>
            <p className={styles.recipeCardDescription}>{recipe.description}</p>
            <div className={styles.recipeCardTime}>
                <div>Prep Time: {formatTime(recipe.prepTime)}</div>
                <div>Cooking Time: {formatTime(recipe.cookTime)}</div>
                <div>Total Time: {formatTime(recipe.prepTime + recipe.cookTime)}</div>
            </div>
        </div>
    );
};

export default RecipeCard;
