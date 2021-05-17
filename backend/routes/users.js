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
router.get('/users/:userId', getUser);
router.patch('/users/me', updateProfil);
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
