const { recipe } = require('./models');

exports.getAllRecipe = (request, response) => {
    recipe.find({}, (error, recipes) => {
        if (error)
            console.log(error);
        else 
            response.send(recipes);
    });
};