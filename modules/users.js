const { User } = require('./models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET = "9yEQzZvvHU3HUUpCgCWVTNVzquu5grV2";

exports.register = async (request, response) => {
    // Check if the username exists
    const user = await User.findOne({
        username: request.body.username
    });

    if (user) {
        return response.status(422).send({
            message: 'Username already exists'
        });
    } else {
        // Encryption password
        const hash = bcryptjs.hashSync(request.body.password, bcryptjs.genSaltSync(5));

        // Add to database
        await User.create({
            name: request.body.name,
            username: request.body.username,
            password: hash
        });
    
        return response.send({
            message: 'Registered successfully'
        });
    }
}

exports.login = async (request, response) => {
    // Check if the username exists
    const user = await User.findOne({
        username: request.body.username
    });

    if (!user) {
        return response.status(422).send({
            message: 'Username does not exist'
        });
    }

    // Check if the password is correct
    const isPasswordValid = bcryptjs.compareSync(request.body.password, user.password);
    if (!isPasswordValid) {
        return response.status(422).send({
            message: 'Incorrect password'
        });
    }

    // Generate token
    const token = jwt.sign({
        id: String(user._id),
    }, SECRET, { expiresIn: '7d' });

    return response.send({ id: user._id, token: token });
}

exports.auth = async (request, response, next) => {
    // The header does not include authorization
    if (request.headers.authorization == null) {
        return response.status(401).send({
            message: 'verification failed'
        });
    }

    // Check the token
    const token = String(request.headers.authorization).split(' ').pop();
    try{
        const tokenData = jwt.verify(token, SECRET);
        const id = tokenData.id;
        request.user = await User.findById(id);
        next();
    } catch (error) {
        return response.status(401).send({
            message: 'verification failed'
        });
    }
}

exports.changePassword = async (request, response) => {
    const user = request.user;

    // Check if the password is correct
    const isPasswordValid = bcryptjs.compareSync(request.body.password, user.password);
    if (!isPasswordValid) {
        return response.status(422).send({
            message: 'Incorrect password'
        });
    }

    // Encryption the new password
    const hash = bcryptjs.hashSync(request.body.newPassword, bcryptjs.genSaltSync(5));

    // Change the password
    await User.updateOne({ _id: user._id }, { password: hash }, (error, result) => {
        if (error) {
            return response.status(400).send({
                message: 'Error'
            });
        } else {
            return response.send({
                message: 'Password changed successfully'
            });
        }
    });
}

exports.changeName = async (request, response) => {
    const user = request.user;

    if (request.body.password == null || request.body.newName == null) {
        return response.status(400).send({
            message: 'Error'
        });
    }

    // Check if the password is correct
    const isPasswordValid = bcryptjs.compareSync(request.body.password, user.password);
    if (!isPasswordValid) {
        return response.status(422).send({
            message: 'Incorrect password'
        });
    }

    // Change the name
    await User.updateOne({ _id: user._id }, { name: request.body.newName }, (error, result) => {
        if (error) {
            return response.status(400).send({
                message: 'Error'
            });
        } else {
            return response.send({
                message: 'Name changed successfully'
            });
        }
    });
}