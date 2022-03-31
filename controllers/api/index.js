const router = require('express').Router();
const userRoutes = require('./userRoutes');
const blogRoutes = require('./blogRoutes');
const commentRoutes = require('./commentRoutes');

// const User = require('../../models/User');
// router.get('/login', async (req, res) => {
//   // find all categories
//   // be sure to include its associated Products
//   const bookData = await User.findAll();

//   return res.json(bookData);
// });
router.use('/users', userRoutes);
router.use('/blogs', blogRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
