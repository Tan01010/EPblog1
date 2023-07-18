const express = require('express');
const router = express.Router();
const adminController = require('./controllers/adminController')
const postController = require('./controllers/postController')

// Define your routes here
router.get('/', (req, res) => {
    res.render('home');
});

router.get('/blog', postController.getPosts, (req, res) => {
  res.render('blog', {posts: req.body.posts1});
});

router.get('/blog/post/:postId', postController.showPost)

router.get('/admin/login', (req, res) => {
  res.render('admin-login', {err: req.flash('errors')})
})

router.post('/login', adminController.login);

router.use(function(req, res, next) {
  res.locals.flash = req.flash();
  next();
});

router.get('/admin/posts', postController.getPosts, (req, res) => {
  res.render('admin-posts', {posts: req.body.posts1})
})

router.get('/admin/change-password', /* adminController.mustBeLoggedIn,  */(req, res) => {
  res.render('admin-change_password')
})

router.post('/admin/change-password/do', adminController.changepassword)

router.get('/admin/create-post', (req, res) => {
  res.render('create-post')
})
router.post('/admin/create-post/do', postController.createPost)

router.get('/admin/update-post/:id', postController.updatepage)
router.post('/admin/update-post/:id', postController.updatePost)

router.get('/admin/delete/:id', postController.deletePost)

module.exports = router;
