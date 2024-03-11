// const Review = ({ review }) => {
//     return (
//       <div>
//         <p>{review.description}</p>
//         <p>Rating: {review.rating}</p>
//         <p>Reviewed by: {review.user}</p>
//         <p>Date: {new Date(review.createdAt).toLocaleDateString()}</p>
//       </div>
//     );
//   };

//   export default Review;

  import React from 'react';
  import axios from 'axios';
  
  const Review = ({ review, setReviews }) => {
    const handleDelete = async () => {
      if (window.confirm('Are you sure you want to delete this review?')) {
        try {
          await axios.delete(`/api/recipes/${review.recipeId}/reviews/${review._id}`);
          setReviews(prev => prev.filter(r => r._id !== review._id));
        } catch (error) {
          console.error('Error deleting review', error);
        }
      }
    };
  
    return (
      <div>
        <p>{review.description}</p>
        <p>Rating: {review.rating}</p>
        <p>Reviewed by: {review.user}</p>
        <p>Date: {new Date(review.createdAt).toLocaleDateString()}</p>
      </div>
    );
  };
  
  export default Review;
  