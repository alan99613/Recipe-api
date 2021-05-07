const express = require('express');
const searchRecipe = require('./modules/recipe');
const user = require('./modules/users');
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.get('/api/v1/recipe', searchRecipe.getAllRecipe);
app.get('/api/v1/recipe/id/:id', searchRecipe.searchRecipeByID);
app.get('/api/v1/recipe/name/:name', searchRecipe.searchRecipeByName);

app.post('/api/v1/register', user.register);
app.post('/api/v1/login', user.login);
app.put('/api/v1/user', user.auth, user.changePassword);

app.listen(port, () => {
    console.log(`App running on port ${port}`)
});