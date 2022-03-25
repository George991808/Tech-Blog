const router = require('express').Router();
const Blog = require('../models/Blog');
const User = require('../models/User');

// GET all galleries for homepage
router.get('/', async (req, res) => {
  // if (!req.session.loggedIn) {
  //   res.redirect('/login');
  // } else {
  try {
    const dbBlogData = await Blog.findAll();
    console.log('hello');
    console.log(req.session.userid);
    const blog = dbBlogData.map((blog) => blog.get({ plain: true }));

    res.render('home', {
      loggedIn: req.session.loggedIn,
      blog,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
  // }
});

// GET one gallery
router.get('/blog/:id', async (req, res) => {
  // If the user is not logged in, redirect the user to the login page
  // if (!req.session.loggedIn) {
  //   res.redirect('/login');
  // } else {
  // If the user is logged in, allow them to view the gallery
  try {
    const dbBlogData = await Blog.findByPk(req.params.id, {});
    const blog = dbBlogData.get({ plain: true });
    const dbUserData = await User.findByPk(blog.user_id, {});
    const user = dbUserData.get({ plain: true });
    res.render('blog', { blog, user, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
  // }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/newpost', async (req, res) => {
  if (req.session.loggedIn === false) {
    res.redirect('/');
    return;
  }
  console.log(req.session.userid);
  const dbUserData = await User.findByPk(req.session.userid);
  const user = dbUserData.get({ plain: true });
  res.render('newblog', { user, loggedIn: req.session.loggedIn });
});

module.exports = router;
