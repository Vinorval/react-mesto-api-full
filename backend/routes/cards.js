const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/cards', getCards);
router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(/^https?:\/{2}\S+/),
  }),
}), createCard);
router.delete('/cards/:cardId', celebrate({
  body: Joi.object().keys({
    _id: Joi.string().hex(),
  }).unknown(true),
}), deleteCard);
router.put('/cards/:cardId/likes', celebrate({
  body: Joi.object().keys({
    _id: Joi.string().hex(),
  }),
}), likeCard);
router.delete('/cards/:cardId/likes', celebrate({
  body: Joi.object().keys({
    _id: Joi.string().hex(),
  }),
}), dislikeCard);

module.exports = router;
