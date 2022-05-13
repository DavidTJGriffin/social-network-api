const router = require('express').Router();
const thoughtRoutes = require('./thoughts.js');
const userRoutes = require('./users.js');

router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

module.exports = router;
