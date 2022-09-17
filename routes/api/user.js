const router = require('express').Router();

const {
    getUser,
    getUserId,
    addFriend,
    delFriend,
    createUser,
    updateUser,
    delUser
} = require('../../controllers/user');

router
    .route('/')
    .get(getUser)
    .post(createUser);

router
    .route('/:id')
    .get(getUserId)
    .put(updateUser)
    .delete(delUser);

router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(delFriend);

module.exports = router;