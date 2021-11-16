const { Router } = require('express');
const ErrorResponse = require('../classes/error-response');
const User = require('../dataBase/models/User.model');
const { asyncHandler, requireToken } = require('../middlewares/middlewares');

const router = Router();

function initRoutes() {
    router.get('/me', asyncHandler(requireToken), asyncHandler(getInfo));
    router.patch('/me',  asyncHandler(requireToken), asyncHandler(updateInfo));
    router.delete('/logout', asyncHandler(requireToken), asyncHandler(logout));
}

async function getInfo(req, res, next) {
    const user = await User.findOne({
        where: {
            id: req.token.userId,
        }
    });

    res.status(200).json( user );
}

async function updateInfo(req, res) {
    const user = await User.findOne({
        where: {
            id: req.token.userId,
        } 
    });

    await user.update({...req.body},{returning: true});
    res.status(200).json(user);
}

async function logout(req, res, next) {
    await req.token.destroy();
    res.status(200).json(req.token);
}

initRoutes();

module.exports = router;