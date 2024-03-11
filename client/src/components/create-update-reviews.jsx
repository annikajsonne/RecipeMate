import React, { useState } from 'react';
import axios from 'axios';

const ReviewForm = ({ recipeId, review, setReviews, isEditing = false }) => {
  const [description, setDescription] = useState(review ? review.description : '');
  const [rating, setRating] = useState(review ? review.rating : 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = `/api/recipes/${recipeId}/reviews`;
    const data = { description, rating };
    try {
      let response;
      if (isEditing) {
        response = await axios.put(`${endpoint}/${review._id}`, data);
      } else {
        response = await axios.post(endpoint, data);
      }
      setReviews(prev => isEditing ? prev.map(r => r._id === review._id ? response.data : r) : [...prev, response.data]);
    } catch (error) {
      console.error('Error submitting review', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={description} onChange={e => setDescription(e.target.value)} required />
      <input type="number" value={rating} onChange={e => setRating(e.target.value)} required />
      <button type="submit">{isEditing ? 'Update' : 'Submit'} Review</button>
    </form>
  );
};

export default ReviewForm;
