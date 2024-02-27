const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IngredientSchema = new mongoose.Schema({
  name: String,
  quantity: String
});

const RecipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  pictureUrl: { type: String, required: false },
  prepTime: { type: Number, required: true },
  cookingTime: { type: Number, required: true },
  directions: [String],
  ingredients: [IngredientSchema],
  userReviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }] 
});

module.exports = mongoose.model('Recipe', RecipeSchema);
