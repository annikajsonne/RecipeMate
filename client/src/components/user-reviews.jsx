import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserReviews = ({ recipeId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/api/recipes/${recipeId}/reviews`);
        setReviews(response.data);
      } catch (error) {
        setError('Error fetching reviews');
        console.error('Error fetching reviews', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [recipeId]);

  if (loading) return <div>Loading reviews...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h3>User Reviews</h3>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map(review => (
            <li key={review._id}>
              <strong>{review.user}</strong> 
              <p>Rating: {review.rating}</p> 
              <p>{review.description}</p> 
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
};

export default UserReviews;
