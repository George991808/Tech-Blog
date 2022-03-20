const router = require('express').Router();
const Blog = require('../models/Blog');
const User = require('../models/User');

// route to get all Bloges
router.get('/', async (req, res) => {
  const BlogData = await Blog.findAll().catch((err) => {
    res.json(err);
  });
  const Blogs = BlogData.map((Blog) => Blog.get({ plain: true }));
  res.render('home', { Blogs });
});

// route to get all Bloges
router.get('/login/', async (req, res) => {
  const BlogData = await Blog.findAll().catch((err) => {
    res.json(err);
  });
  const Blogs = BlogData.map((Blog) => Blog.get({ plain: true }));
  res.render('login', { Blogs });
});
// router.get('/login', async (req, res) => {
//   // find all categories
//   // be sure to include its associated Products
//   const bookData = await User.findAll();

//   return res.json(bookData);
// });

// route to get one Blog
router.get('/Blog/:id', async (req, res) => {
  try {
    const BlogData = await Blog.findByPk(req.params.id);
    if (!BlogData) {
      res.status(404).json({ message: 'No Blog with this id!' });
      return;
    }
    const Blog = BlogData.get({ plain: true });
    res.render('Blog', Blog);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
