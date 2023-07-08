const router = require('express').Router();

const {
  getUser, getUserById, createUser, updateProfile, updateAvatar,
} = require('../controllers/users');

// definir rutas
router.get('/', getUser);
router.get('/:id', getUserById);
router.post('/', createUser);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
