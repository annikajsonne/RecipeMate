const Review = ({ review }) => {
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