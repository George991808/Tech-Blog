const router = require('express').Router();
const { User, Blog } = require('../../models');

router.post('/', async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.body.post);
    console.log(req.body.name);
    console.log(req.session.userid);
    const newBlog = await Blog.create({
      post: req.body.post,
      name: req.body.name,
      user_id: req.session.userid,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

// router.get('/login', async (req, res) => {
//   // find all categories
//   // be sure to include its associated Products
//   const bookData = await User.findAll();

//   return res.json(bookData);
// });

router.delete('/:id', async (req, res) => {
  console.log('hi' + req.params.id);
  try {
    const BlogData = await Blog.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!BlogData) {
      res.status(404).json({ message: 'No Blog found with this id!' });
      console.log('uyi' + req.params.id);
      return;
    }

    res.status(200).json(BlogData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
