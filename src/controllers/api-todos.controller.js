const { Router } = require('express');
const ErrorResponse = require('../classes/error-response');
const ToDo = require('../dataBase/models/ToDo.model');
const Comment = require('../dataBase/models/Comment.model');
const { asyncHandler, requireToken } = require('../middlewares/middlewares');

const router = Router();

function initRoutes() {
    router.get('/',  asyncHandler(getToDos));
    router.get('/:id', asyncHandler(requireToken), asyncHandler(getToDoById));
    router.post('/', asyncHandler(requireToken), asyncHandler(createTodo));
    router.patch('/:id', asyncHandler(requireToken), asyncHandler(updateTodo));
    router.delete('/:id', asyncHandler(requireToken), asyncHandler(deleteToDoByID));
    router.delete('/', asyncHandler(requireToken), asyncHandler(deleteToDo));
}

async function getToDos(req, res, next) {
    const todos = await ToDo.findAll(
    //     {
    //     where: {
    //         userId: req.token.userId,
    //     },
    //     include: [Comment] 
    // }
    );
    res.status(200).json( todos );
}

async function getToDoById(req, res, next) {
    const todo = await ToDo.findOne({
        where:{
            id: req.params.id,
            userId: req.token.userId,
        },
        include: [Comment]
    });

    if (!todo) {
        throw new ErrorResponse('No todo found', 404);
    }

    res.status(200).json(todo);
}

async function createTodo(req, res) {
    const todo = await ToDo.create({...req.body, userId:req.token.userId});
    res.status(200).json({
        "message": "ToDo сохранено",
        todo
    });
}

async function updateTodo(req, res) {
    const todo = await ToDo.findOne({
        where:{
            id: req.params.id,
            userId: req.token.userId,
        }
    });

    if(!todo){
        throw new ErrorResponse("ToDo not found", 404); 
    }

    await todo.update({...req.body},{returning: true});
    res.status(200).json({
        "message": "ToDo обнавлено",
        todo
    });
}

async function deleteToDoByID(req, res) {
    const todo = await ToDo.findOne({
        where:{
            id: req.params.id,
            userId: req.token.userId,
        },
        include: [Comment]
    });

    if(!todo){
        throw new ErrorResponse("ToDo not found", 404); 
    }

    //await Comment.destroy({
    //    where:{
    //        todoId: req.params.id,
    //    }
    //});

    await todo.destroy();

    res.status(200).json({
        message: "ToDo удалено",
        todo
    });
}

async function deleteToDo(req, res) {
    let todos = await ToDo.destroy({
        where: {
            userId: req.token.userId,
        },
      });
      res.status(200).json({
        message: "Все ToDo удалены",
        todos
    });
}

initRoutes();

module.exports = router;