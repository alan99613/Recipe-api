const { Recipe, User } = require('./models');

// Check if the recipes are in the favorites
function checkFavourites(request, response, recipes) {
    const SECRET = "9yEQzZvvHU3HUUpCgCWVTNVzquu5grV2";
    try{
        const token = String(request.headers.authorization).split(' ').pop();
        const tokenData = require('jsonwebtoken').verify(token, SECRET);
        const id = tokenData.id;
        User.findOne({ _id: id }, (error, result) => {
            if (error) {
                return response.status(400).send({
                    message: 'Error'
                });
            } else {
                if (result.favourites == null) {
                    for (let recipe of recipes) {
                        recipe.isFavourite = false;
                    }
                    return response.send(recipes);
                } else {
                    for (let recipe of recipes) {
                        for (let i = 0; i < result.favourites.length; i++) {
                            if (""+recipe._id == ""+result.favourites[i]) {
                                recipe.isFavourite = true;
                            } else {
                                if (recipe.isFavourite != true) {
                                    recipe.isFavourite = false;
                                }
                            }
                        }
                    }
                    return response.send(recipes);
                }
            }
        });
    } catch (error) {
        console.log(error);
        return response.status(401).send({
            message: 'verification failed'
        });
    }
}

exports.getRecipe = (request, response) => {
    if (request.query.num == null) {
        return response.status(400).send({
            message: 'Error'
        });
    } else {
        // Get a random number of recipes from the database
        Recipe.aggregate([{ $sample: { size: parseInt(request.query.num) } }], (error, recipes) => {
            if (error) {
                console.log(error);
                return response.status(400).send({
                    message: 'Error'
                });
            } else {
                if (request.headers.authorization != null) {
                    return checkFavourites(request, response, recipes);
                } else {
                    return response.send(recipes);
                }
            }
        });
    }
}

exports.searchRecipeByID = (request, response) => {
    // Get the recipe details from the database
    Recipe.findById(request.params.id, (error, recipes) => {
        if (error) {
            return response.status(400).send({
                message: 'ID format error'
            });
        } else {
            if (recipes == null) {
                return response.status(400).send({
                    message: 'No result'
                });
            } else {
                return response.send(recipes);
            }
        }
    });
}

exports.searchRecipeByName = (request, response) => {
    // Search recipes from the database by keywords
    Recipe.find({ recipeName: new RegExp(request.params.name, "i") }, (error, recipes) => {
        if (error) {
            return response.status(400).send({
                message: 'Error'
            });
        } else {
            if (recipes.length == 0) {
                return response.status(400).send({
                    message: 'No result'
                });
            } else {
                if (request.headers.authorization != null) {
                    return checkFavourites(request, response, recipes);
                } else {
                    return response.send(recipes);
                }
            }
        }
    }).lean();
}