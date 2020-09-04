require('dotenv').config();
const express = require('express');
// eslint-disable-next-line no-undef
const { PORT } = process.env;
const signinRouter = require('./router/signin');
const loginRouter = require('./router/login');
const postRouter = require('./router/post');
const userRouter = require('./router/user');

const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(signinRouter);
app.use(loginRouter);
app.use(postRouter);
app.use(userRouter);

app.listen(PORT, () => {
  console.log('서버 실행중');
});
