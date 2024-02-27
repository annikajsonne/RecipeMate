const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());

// Register routes
const recipesRoutes = require('./api/recipes/recipes-routes.js');
const reviewsRoutes = require('./api/reviews/reviews-routes.js');
const usersRoutes = require('./api/users/users-routes.js');

app.use('/api/recipes', recipesRoutes);
app.use('/api/recipes/:recipeId/reviews', reviewsRoutes);
app.use('/api/users', usersRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
