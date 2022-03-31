const router = require('express').Router();
const Blog = require('../models/Blog');
const User = require('../models/User');
const Comment = require('../models/Comment');

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

router.get('/dashboard', async (req, res) => {
  // if (!req.session.loggedIn) {
  //   res.redirect('/login');
  // } else {
  try {
    if (req.session.loggedIn) {
      const dbBlogData = await Blog.findAll({
        where: {
          user_id: req.session.userid,
        },
      });
      const blog = dbBlogData.map((blog) => blog.get({ plain: true }));
      console.log('hello');
      console.log(req.session.userid);
      // res.json(blog);
      res.render('dashboard', {
        loggedIn: req.session.loggedIn,
        blog,
      });
    } else {
      res.redirect('/login');
    }
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
    const dbCommentData = await Comment.findAll({
      include: { model: User, attributes: ['name'], raw: true },
      where: {
        blog_id: blog.id,
      },
      raw: true,
    });

    // res.json(dbCommentData);

    res.render('blog', {
      blog,
      user,
      loggedIn: req.session.loggedIn,
      comments: dbCommentData,
      commenter: req.session.userid,
    });
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

router.get('/updateblog/:id', async (req, res) => {
  if (req.session.loggedIn === false) {
    res.redirect('/');
    return;
  }
  try {
    const dbBlogData = await Blog.findByPk(req.params.id, {});
    const blog = dbBlogData.get({ plain: true });
    const dbUserData = await User.findByPk(req.session.userid);
    const user = dbUserData.get({ plain: true });
    res.render('updateblog', { user, loggedIn: req.session.loggedIn, blog });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
