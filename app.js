//Imports
const express = require('express');
var cookieParser = require('cookie-parser');
const http = require('http');
const cors = require('cors');
const apiTodosRouter = require('./src/controllers/api-todos.controller');
const apiAuthRouter = require('./src/controllers/api-auth.controller');
const apiUsersRouter = require('./src/controllers/api-users.controller');
const apiCommentRouter = require('./src/controllers/api-comment.controller');
const { notFound, errorHandler } = require('./src/middlewares/middlewares');
const { initDB } = require('./src/dataBase/dbSync');
const { host, port} = require('./initiator');

//Init zone
const app = express();

//InitDB
initDB();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())

app.use('/api/todos', apiTodosRouter);
app.use('/api/auth', apiAuthRouter);
app.use('/api/users', apiUsersRouter);
app.use('/api/comment', apiCommentRouter);

app.use(notFound);
app.use(errorHandler);

//Create server
http.createServer(app).listen(port, host ? host : null, () => {
  console.log(`Server is working on port ${port}`);
});