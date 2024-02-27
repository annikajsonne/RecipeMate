const express = require('express');
const router = express.Router();
const recipesController = require('./recipes-controller');

// Route to create a new recipe
router.post('/', recipesController.create);

// Route to get all recipes
router.get('/', recipesController.findAll);

// Route to get a single recipe by id
router.get('/:id', recipesController.findOne);

// Route to update a recipe by id
router.put('/:id', recipesController.update);

// Route to delete a recipe by id
router.delete('/:id', recipesController.delete);

module.exports = router;
