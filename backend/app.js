require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, Joi, errors } = require('celebrate');
const NotFoundError = require('./errors/not-found-err');

const routeUsers = require('./routes/users');
const routeCards = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3005 } = process.env;
const app = express();

const corsOptions = {
  origin: [
    'http://vinorval.mesto.nomoredomains.club',
    'https://vinorval.mesto.nomoredomains.club',
    'http://localhost:3000',
    'http://localhost:3005',
    'https://178.154.231.103',
    'http://178.154.231.103',
  ],
  credentials: true,
};
app.use('*', cors(corsOptions));

// подключение к базе
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/^https?:\/\/(www\.)?((\w+\-\w+)+|\w+)\.([A-z0-9]{2,})(\.\S+|\/\S+)?/),
  }),
}), createUser);
app.use('/', auth, routeUsers);
app.use('/', auth, routeCards);

app.use(errorLogger);

app.use(errors());
app.use(() => { throw new NotFoundError('ресурс не найден'); });
/* eslint-disable no-unused-vars */
app.use((err, req, res, next) => {
  if (err.name === 'CastError' || err.name === 'ValidationError' || err.statusCode === 400) {
    res
      .status(400)
      .send({
        message: 'Переданы некорректные данные',
      });
  }

  const { statusCode = 500, message } = err;
  return res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});

app.listen(PORT, () => {
  /* eslint-disable no-console */
  console.log(`App listening on port ${PORT}`);
});
