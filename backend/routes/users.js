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
    _id: Joi.string().hex(),
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
    avatar: Joi.string().required().regex(/^https?:\/{2}\S+/),
  }),
}), updateAvatar);

module.exports = router;
