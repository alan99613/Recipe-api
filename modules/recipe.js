const { Recipe } = require('./models');

exports.getAllRecipe = (request, response) => {
    Recipe.find({}, (error, recipes) => {
        if (error) {
            return response.status(400).send({
                message: 'Error'
            });
        } else {
            return response.send(recipes);
        }
    });
}

exports.searchRecipeByID = (request, response) => {
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
                return response.send(recipes);
            }
        }
    });
}