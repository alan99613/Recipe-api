const { recipe } = require('./models');

exports.getAllRecipe = (request, response) => {
    recipe.find({}, (error, recipes) => {
        if (error)
            return response.status(400).send({
                message: 'Error'
            });
        else 
            response.send(recipes);
    });
};

exports.searchRecipeByID = (request, response) => {
    recipe.findById(request.params.id, (error, recipes) => {
        if (error)
            return response.status(400).send({
                message: 'ID format error'
            });
        else
            response.send(recipes);
    });
};

exports.searchRecipeByName = (request, response) => {
    recipe.find({ recipeName: new RegExp(request.params.name, "i") }, (error, recipes) => {
        if (error)
            return response.status(400).send({
                message: 'Error'
            });
        else 
            response.send(recipes);
    });
};