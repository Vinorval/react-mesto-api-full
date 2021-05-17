const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

// GET
module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

// POST
module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send(card))
    .catch(next);
};

// DELETE
module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена');
      }
      if (String(card.owner) !== req.user._id) {
        throw new ForbiddenError('Вы не можете удалить чужую карточку');
      }
      return Card.findByIdAndDelete(req.params.cardId)
        .then((userCard) => res.status(200).send(userCard));
    })
    .catch(next);
};

// PUT
module.exports.likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
  { new: true },
)
  .then((card) => {
    if (!card) {
      throw new NotFoundError('Карточка с указанным _id не найдена');
    }
    return res.status(200).send(card);
  })
  .catch(next);

// DELETE
module.exports.dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } }, // убрать _id из массива
  { new: true },
)
  .then((card) => {
    if (!card) {
      throw new NotFoundError('Карточка с указанным _id не найдена');
    }
    return res.status(200).send(card);
  })
  .catch(next);
