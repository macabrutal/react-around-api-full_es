// AGREGAR getUserProfile

const router = require('express').Router();

const {
  getUser, getUserById, updateProfile, updateAvatar, getUserProfile,
} = require('../controllers/users');

// definir rutas
router.get('/', getUser);
router.get('/:id', getUserById);
router.get('/me', getUserProfile);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
