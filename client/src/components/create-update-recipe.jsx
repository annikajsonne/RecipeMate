import { useLoaderData, Link, Form } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import styles from './create-update-recipe.module.css';
import { useNavigate } from 'react-router-dom';

export default function CreateUpdateRecipe() {
  const recipe = useLoaderData();
  const [ingredients, setIngredients] = useState(recipe?.ingredients || [{ name: '', amount: '' }]);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (recipe && recipe.ingredients) {
      setIngredients(recipe.ingredients);
    }
  }, [recipe]);

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = ingredients.map((ingredient, i) => {
      if (index === i) {
        return { ...ingredient, [field]: value };
      }
      return ingredient;
    });
    setIngredients(newIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', amount: '' }]);
  };

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const json = Object.fromEntries(formData.entries());

    const method = recipe ? 'PUT' : 'POST';
    const url = recipe ? `/api/recipes/${recipe._id}` : '/api/recipes';

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(json),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Success:', responseData);
        alert('Recipe saved successfully!');
        navigate('/all-recipes'); // Redirect to the list of recipes after success
      } else {
        const errorText = await response.text();
        throw new Error(`Server responded with ${response.status}: ${errorText}`);
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      alert(`An error occurred: ${err.message}`);
    }
  };


  return (
    <Form onSubmit={handleSubmit} className={styles.form}>
      <h2>{recipe ? 'Update Recipe' : 'Create Recipe'}</h2>
      <div className={styles.formSection}>
        <label className={styles.formLabel}>
          Name:
          <input name="name" defaultValue={recipe?.name || ''} className={styles.formInput} required />
        </label>
      </div>
      <div className={styles.formSection}>
        <label className={styles.formLabel}>
          Description:
          <textarea name="description" defaultValue={recipe?.description || ''} className={styles.formInput} required />
        </label>
      </div>
      <div className={styles.formSection}>
        <label className={styles.formLabel}>
          Prep Time (min):
          <input type="number" name="prepTime" defaultValue={recipe?.prepTime || ''} className={styles.formInput} required />
        </label>
      </div>
      <div className={styles.formSection}>
        <label className={styles.formLabel}>
          Cook Time (min):
          <input type="number" name="cookTime" defaultValue={recipe?.cookTime || ''} className={styles.formInput} required />
        </label>
      </div>
      
      <div>
        <h3>Ingredients</h3>
        {ingredients.map((ingredient, index) => (
          <div key={index} className={styles.ingredientSection}>
            <input
              name={`ingredients[${index}][name]`}
              value={ingredient.name}
              onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
              className={styles.ingredientInput}
              required
            />
            <input
              name={`ingredients[${index}][amount]`}
              value={ingredient.amount}
              onChange={(e) => handleIngredientChange(index, 'amount', e.target.value)}
              className={styles.ingredientInput}
              required
            />
            <button type="button" onClick={() => removeIngredient(index)} className={styles.removeButton}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addIngredient} className={styles.addButton}>
          Add Ingredient
        </button>
      </div>
      
      <div className={styles.formSection}>
        <label className={styles.formLabel}>
          Image URL:
          <input type="url" name="image" defaultValue={recipe?.image || ''} className={styles.formInput} />
        </label>
      </div>
      <input type="submit" value={recipe ? 'Update Recipe' : 'Create Recipe'} className={styles.formSubmitButton} />
    </Form>
  );
}
