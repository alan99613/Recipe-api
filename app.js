const express = require('express');
const searchRecipe = require('./modules/recipe');
const app = express();
const port = process.env.PORT || 8080

app.get('/api/v1/recipe', searchRecipe.getAllRecipe);

app.listen(port, () => {
    console.log(`App running on port ${port}`)
});