const mongoose = require('./db')

const RecipeSchema = new mongoose.Schema({
    recipeName: String,
    ingredients: Array,
    steps: Array
});

const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = { Recipe };