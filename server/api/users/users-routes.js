const express = require('express');
const router = express.Router();
const usersController = require('./users-controller');

router.post('/', usersController.create); // Create a new user
router.get('/', usersController.findAll); // Get all users
router.get('/:id', usersController.findOne); // Get a single user by ID
router.put('/:id', usersController.update); // Update a user by ID
router.delete('/:id', usersController.delete); // Delete a user by ID

module.exports = router;
