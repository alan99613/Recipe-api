const { Recipe, User } = require('./models');

exports.getFavourite = (request, response) => {
    const user = request.user;

    // Get all favorites from the database
    User.findOne({ _id: user._id }, (error, result) => {
        if (error) {
            return response.status(400).send({
                message: 'Error'
            });
        } else {
            if (result.favourites == null) { // No favorites
                return response.send([]);
            } else {
                return response.send(result.favourites);
            }
        }
    }).populate('favourites');
}

exports.addFavourite = (request, response) => {
    const user = request.user;
    const id = request.params.id;

    // Check if the ID exists
    Recipe.findOne({ _id: id }, (error, result) => {
        if (error) {
            return response.status(400).send({
                message: 'ID format error'
            });
        } else {
            if (result) {
                // Add the ID to database
                User.updateOne({ _id: user._id }, { $addToSet: { favourites: id } }, (error, result) => {
                    if (error) {
                        return response.status(400).send({
                            message: 'Error'
                        });
                    } else {
                        if (result.nModified) {
                            return response.send({
                                message: 'Added successfully'
                            });
                        } else {
                            return response.status(400).send({
                                message: 'Already added to favorites'
                            });
                        }
                    }
                });
            } else {
                return response.status(400).send({
                    message: 'ID does not exist'
                });
            }
        }
    });
}

exports.deleteFavourites = (request, response) => {
    const user = request.user;
    const id = request.params.id;

    // Delete the ID from database
    User.updateOne({ _id: user._id }, { $pull: { favourites: id } }, (error, result) => {
        if (error) {
            return response.status(400).send({
                message: 'ID format error'
            });
        } else {
            if (result.nModified) {
                return response.send({
                    message: 'Deleted successfully'
                });
            } else {
                return response.status(400).send({
                    message: 'Already deleted from favorite'
                });
            }
        }
    });
}