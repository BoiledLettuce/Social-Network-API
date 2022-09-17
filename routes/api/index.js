const router = require('express').Router();
const userRoute = require('./user');
const thoughtRoute = require('./thought');
router.use('/users', userRoute);
router.use('/thoughts', thoughtRoute);
module.exports = router;