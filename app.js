const express = require('express');
const searchRecipe = require('./modules/recipe');
const user = require('./modules/users');
const favourite = require('./modules/favourites');
const comment = require('./modules/comments');
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.get('/api/v1/recipe', searchRecipe.getAllRecipe);
app.get('/api/v1/recipe/id/:id', searchRecipe.searchRecipeByID);
app.get('/api/v1/recipe/name/:name', searchRecipe.searchRecipeByName);

app.post('/api/v1/register', user.register);
app.post('/api/v1/login', user.login);
app.put('/api/v1/user', user.auth, user.changePassword);

app.get('/api/v1/favourite', user.auth, favourite.getFavourite);
app.put('/api/v1/favourite/:id', user.auth, favourite.addFavourite);
app.delete('/api/v1/favourite/:id', user.auth, favourite.deleteFavourites);

app.get('/api/v1/comment/:id', comment.getComment);
app.put('/api/v1/comment/:id', user.auth, comment.addComment);
app.delete('/api/v1/comment/:id', user.auth, comment.deleteComment);

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});