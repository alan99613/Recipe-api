const mongoose = require('./db');

const RecipeSchema = new mongoose.Schema({
    recipeName: String,
    ingredients: Array,
    steps: Array
});

const UserSchema = new mongoose.Schema({
    name: String,
    username: { type: String, unique: true },
    password: String,
    favourites: [{ type : mongoose.Schema.Types.ObjectId, ref: 'Recipe' }]
});

const Recipe = mongoose.model('Recipe', RecipeSchema);
const User = mongoose.model('User', UserSchema);

module.exports = { Recipe, User };