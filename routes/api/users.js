const router = require('express').Router();
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend
} = require('../../controllers/user');

// /api/users
router
  .route('/')
  .get(getUsers)
  .post(createUser);

// /api/users/:id
router
  .route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);
  

// /api/users/:user-id/friends/:friend-id
router
    .route('/:user-id/friends/:friend-id')
    .post(addFriend);
    

module.exports = router;
