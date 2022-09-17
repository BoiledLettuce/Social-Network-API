const router = require('express').Router();

const {
    getThought,
    getThoughtId,
    createReaction,
    delReaction,
    createThought,
    updateThought,
    delThought
} = require('../../controllers/thought');

router
    .route('/:id')
    .get(getThoughtId)
    .put(updateThought)
    .delete(delThought);

router
    .route('/')
    .get(getThought)
    .post(createThought);

router
    .route('/:thoughtId/reactions')
    .post(createReaction);

router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(delReaction);

module.exports = router;