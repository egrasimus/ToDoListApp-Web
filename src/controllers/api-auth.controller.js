const { Router } = require('express');
var http = require('http');
const { nanoid } = require('nanoid');
const ErrorResponse = require('../classes/error-response');
const User = require('../dataBase/models/User.model');
const Token = require('../dataBase/models/Token.model');
const { asyncHandler } = require('../middlewares/middlewares');

const router = Router();

function initRoutes() {
    router.post('/registration', asyncHandler(registration));
    router.post('/login', asyncHandler(login));
}

async function registration(req, res, next) {
    let user = await User.findOne({where:{email: req.body.email}});
    if (!req.body.login || !req.body.password || !req.body.email || !req.body.name){
        throw new  ErrorResponse("Please enter all data", 400);
    }
    if (user){
        throw new  ErrorResponse("User with this email already exist", 400);
    }
    user = await User.findOne({where:{login: req.body.login}});
    if (user){
        throw new  ErrorResponse("User with this login already exist", 400);
    }
    
    user = await User.create({...req.body});

    res.json(user);
}

async function login(req, res, next) {
    let user = await User.findOne({where:{login: req.body.login}});
    if (!user){
        throw new Error("User with this login does not exist", 400);
    }

    const password = req.body.password;
    if(password !== user.password){
        throw new Error("Password is not correct", 400);
    }

    const token = await Token.create({
        userId: user.id,
        value: nanoid(128)
    });

    let options = {
        path:"/",
        sameSite:true,
        maxAge: 1000 * 60 * 60 * 24, // would expire after 24 hours
        httpOnly: true, // The cookie only accessible by the web server
    }

    res.cookie('x-access-token', token.value, options) 
   // res.sendFile("/home/a0598837/domains/a0598837.xsph.ru/public_html/index.html")
    // res.json(token.value);
    res.redirect(301, '/main')
}

initRoutes();

module.exports = router;