const mongoose = require('./db')

const RecipeSchema = new mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    recipeName: String,
    ingredients: Array,
    steps: Array
});

const recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = { recipe };