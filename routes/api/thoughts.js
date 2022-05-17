const router = require('express').Router();
const {
    getThoughts,
    getThought,
    createThought,
    deleteThought,
    addReaction,
    updateThought
} = require('../../controllers/thought');

// /api/thoughts
router
    .route('/')
    .get(getThoughts)
    .post(createThought);

// /api/thoughts/:id
router
    .route('/:id')
    .get(getThought)
    .put(updateThought)
    .delete(deleteThought);


// /api/users/:user-id/friends/:friend-id
router
    .route('/:thought-id/reactions/:reaction-id')
    .post(addReaction);


module.exports = router;
