const router = require('express').Router();
const Blog = require('../models/Blog');

// route to get all Bloges
router.get('/', async (req, res) => {
  const BlogData = await Blog.findAll().catch((err) => {
    res.json(err);
  });
  const Bloges = BlogData.map((Blog) => Blog.get({ plain: true }));
  res.render('login', { Blogs });
});

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
