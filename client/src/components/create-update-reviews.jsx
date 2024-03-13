// import React, { useState } from 'react';
// import axios from 'axios';

// const ReviewForm = ({ recipeId, review, setReviews, isEditing = false }) => {
//   const [description, setDescription] = useState(review ? review.description : '');
//   const [rating, setRating] = useState(review ? review.rating : 0);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const endpoint = `/api/recipes/${recipeId}/reviews`;
//     const data = { description, rating };
//     try {
//       let response;
//       if (isEditing) {
//         response = await axios.put(`${endpoint}/${review._id}`, data);
//       } else {
//         response = await axios.post(endpoint, data);
//       }
//       setReviews(prev => isEditing ? prev.map(r => r._id === review._id ? response.data : r) : [...prev, response.data]);
//     } catch (error) {
//       console.error('Error submitting review', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <textarea value={description} onChange={e => setDescription(e.target.value)} required />
//       <input type="number" value={rating} onChange={e => setRating(e.target.value)} required />
//       <button type="submit">{isEditing ? 'Update' : 'Submit'} Review</button>
//     </form>
//   );
// };

// export default ReviewForm;

import React, { useState } from 'react';
import axios from 'axios';

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
    <form onSubmit={handleSubmit}>
      <label htmlFor="user">User:</label>
      <input
        name="user" // Add the name attribute
        id="user"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        required
      />

      <label htmlFor="description">Review Description:</label>
      <textarea
        name="description" // Add the name attribute
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <label htmlFor="rating">Rating:</label>
      <input
        name="rating" // Add the name attribute
        type="number"
        id="rating"
        value={rating}
        min="1"
        max="5"
        onChange={(e) => setRating(e.target.value)}
        required
      />

      <button type="submit">Submit Review</button>
    </form>

  );
};

export default ReviewForm;

