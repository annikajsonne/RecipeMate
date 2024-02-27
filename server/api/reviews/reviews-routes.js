const express = require('express');
const router = express.Router();
const reviewsController = require('./reviews-controller');

router.post('/', reviewsController.createReview);
router.get('/', reviewsController.getAllReviews);
router.get('/:id', reviewsController.getReview);
router.put('/:id', reviewsController.updateReview);
router.delete('/:id', reviewsController.deleteReview);

module.exports = router;
