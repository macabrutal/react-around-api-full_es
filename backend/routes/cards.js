const router = require('express').Router();

const {
  getCards, createCards, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

// definir rutas
router.get('/', getCards);
router.post('/', createCards);
router.delete('/:cardId ', deleteCard);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes ', dislikeCard);

module.exports = router;
