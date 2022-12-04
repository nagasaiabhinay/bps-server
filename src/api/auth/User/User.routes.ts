import express from 'express';
import MyUserController from './User.controller';

const User = express.Router();

User.post('/create-user', MyUserController.createOrLoginUser);

// test route
User.get('/ping', (req, res) => {
    res.json({
        message: 'Server is up and running'
    });
});

export default User;
