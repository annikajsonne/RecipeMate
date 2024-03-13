import React, { useState } from 'react';
import axios from 'axios';
import styles from './create-update-reviews.module.scss';

const ReviewForm = ({ recipeId, setReviews }) => {
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(0);
  const [user, setUser] = useState(''); // New state for the user

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const reviewData = {
      description: formData.get('description'),
      rating: Number(formData.get('rating')), // Convert to number if necessary
      user: formData.get('user')
    };
  
    try {
      const response = await axios.post(`/api/recipes/${recipeId}/reviews`, reviewData);
      console.log('Response:', response.data);
      if (response.status === 201) {
        alert('Review saved successfully!');
        setReviews(prev => [...prev, response.data]);
        e.target.reset();
      } else {
        throw new Error(`Server responded with ${response.status}`);
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert(`An error occurred: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.reviewForm}>
      <h3 className={styles.reviewFormTitle}>Add a Review</h3>
      <label htmlFor="user" className={styles.reviewLabel}>User:</label>
      <input
        name="user"
        id="user"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        required
        className={styles.reviewInput}
      />

      <label htmlFor="description" className={styles.reviewLabel}>Review Description:</label>
      <textarea
        name="description"
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className={styles.reviewTextarea}
      />

      <label htmlFor="rating" className={styles.reviewLabel}>Rating:</label>
      <input
        name="rating"
        type="number"
        id="rating"
        value={rating}
        min="1"
        max="5"
        onChange={(e) => setRating(e.target.value)}
        required
        className={styles.reviewInput}
      />

      <button type="submit" className={styles.submitButton}>Submit Review</button>
    </form>
  );
};

export default ReviewForm;

