const express = require('express');
const searchRecipe = require('./modules/recipe');
const app = express();
const port = process.env.PORT || 8080

app.get('/api/v1/recipe', searchRecipe.getAllRecipe);
app.get('/api/v1/recipe/id/:id', searchRecipe.searchRecipeByID);
app.get('/api/v1/recipe/name/:name', searchRecipe.searchRecipeByName);

app.listen(port, () => {
    console.log(`App running on port ${port}`)
});