const { Recipe } = require('./models');

exports.getComment = (request, response) => {
    const id = request.params.id;
    
    // Get recipe comments from database
    Recipe.findOne({ _id: id }, (error, result) => {
        if (error) {
            return response.status(400).send({
                message: 'Error'
            });
        } else {
            if (result.comments == null) {
                return response.send([]);
            } else {
                return response.send(result.comments);
            }
        }
    }).populate('comments.user', 'name');
}

exports.addComment = (request, response) => {
    const user = request.user;
    const id = request.params.id; // Recipe ID
    const comment = request.body.comment; // Comment text

    // Add a recipe comment to the database
    Recipe.updateOne({ _id: id }, { $addToSet: { comments: { user: user._id, text: comment } } }, (error, result) => {
        if (error) {
            return response.status(400).send({
                message: 'Error'
            });
        } else {
            return response.send({
                message: 'Added successfully'
            });
        }
    });
}

exports.deleteComment = (request, response) => {
    const user = request.user;
    const id = request.params.id; // Recipe ID
    const commentID = request.body.commentID; // Comment ID

    // Delete the recipe comment from the database
    Recipe.updateOne({ _id: id }, { $pull: { comments: { _id: commentID, user: user._id } } }, (error, result) => {
        if (error) {
            return response.status(400).send({
                message: 'Error'
            });
        } else {
            if (result.nModified) {
                return response.send({
                    message: 'Deleted successfully'
                });
            } else {
                return response.status(400).send({
                    message: 'Already deleted'
                });
            }
        }
    });
}