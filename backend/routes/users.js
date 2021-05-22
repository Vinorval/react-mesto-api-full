const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const {
  getUsers,
  getUser,
  getMyUser,
  updateProfil,
  updateAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/me', getMyUser);
router.get('/users/:userId', celebrate({
  body: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }).unknown(true),
}), getUser);
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateProfil);
router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(/^https?:\/\/(www\.)?((\w+\-\w+)+|\w+)\.([A-z0-9]{2,})(\.\S+|\/\S+)?/),
  }),
}), updateAvatar);

module.exports = router;
