const { Router } = require('express');
const { nanoid } = require('nanoid');
const ErrorResponse = require('../classes/error-response');
const User = require('../dataBase/models/User.model');
const Token = require('../dataBase/models/Token.model');
const ToDo = require('../dataBase/models/ToDo.model');
const Comment = require('../dataBase/models/Comment.model');
const { asyncHandler, requireToDoID, requireToken } = require('../middlewares/middlewares');

const router = Router();

function initRoutes() {
    
    router.post('/', asyncHandler(requireToken), asyncHandler(requireToDoID), asyncHandler(createComment))
    router.patch('/:id', asyncHandler(requireToken), asyncHandler(requireToDoID), asyncHandler(updateComment))
    router.patch('/isdone/:id', asyncHandler(requireToken), asyncHandler(requireToDoID), asyncHandler(isDoneComment))
    router.delete('/', asyncHandler(requireToken), asyncHandler(requireToDoID), asyncHandler(deleteComment))
    router.delete('/:id', asyncHandler(requireToken), asyncHandler(requireToDoID), asyncHandler(deleteCommentByID))
}

async function createComment(req, res) {
    
    const comment = await Comment.create({...req.body, todoId:req.todo.id});
    res.status(200).json(comment.toJSON());
}

async function updateComment(req, res) {
    const comment = await Comment.findByPk(req.params.id,{
        where:{
            todoId: req.todo.id,
        }
    });

    if(!comment){
        throw new ErrorResponse("Comment not found", 404); 
    }

    await comment.update({...req.body},{returning: true});
    res.status(200).json({comment: comment});
}

async function isDoneComment(req, res) {
    const comment = await Comment.findByPk(req.params.id,{
        where:{
            todoId: req.todo.id,
        }
    });

    if(!comment){
        throw new ErrorResponse("Comment not found", 404); 
    }

    await comment.update({status: req.body.status},{returning: true});
    res.status(200).json({comment});
}

async function deleteComment(req, res) {
    const comment = await Comment.destroy({
        where:{
            todoId: req.todo.id,
        }
    });

    if(!comment){
        throw new ErrorResponse("Comments not found", 404); 
    }

    const todo =  await ToDo.findAll({
        where:{
            id: req.todo.id,
        },
        include: [Comment]
    });
    
    res.status(200).json({"massage": "Все удалено", todo});
}

async function deleteCommentByID(req, res) {
    const comment = await Comment.findByPk(req.params.id,{
        where:{
            todoId: req.todo.id,
        }
    });

    if(!comment){
        throw new ErrorResponse("Comments not found", 404); 
    }

    await comment.destroy();

    const todo =  await ToDo.findAll({
        where:{
            id: req.todo.id,
        },
        include: [Comment]
    });
    
    res.status(200).json({todo});
}


initRoutes();

module.exports = router;