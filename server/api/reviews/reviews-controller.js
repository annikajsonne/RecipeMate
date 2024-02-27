const Review = require('./reviews-model.js');
const Recipe = require('../recipes/recipes-model');
const User = require('../users/users-model');

exports.createReview = async (req, res) => {
    const { recipeId, description, rating, username } = req.body;

    try {
        // Find the user by username
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create the review with the user's ObjectId
        const newReview = new Review({
            description,
            rating,
            user: user._id, // Use the found user's ObjectId
        });

        const savedReview = await newReview.save();

        // Optionally, add the review to the recipe's userReviews array
        const recipe = await Recipe.findById(recipeId);
        if (recipe) {
            recipe.userReviews.push(savedReview._id);
            await recipe.save();
        }

        res.status(201).json(savedReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all reviews
exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single review
exports.getReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a review
exports.updateReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.json(review);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a review
exports.deleteReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        await Recipe.updateMany({}, { $pull: { userReviews: review._id } });

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
