const postsCollection = require('../db').collection("posts");
const ObjectId = require('mongodb').ObjectId

exports.getPosts = async function(req, res, next) {
  const posts = await postsCollection.find({}).toArray()
  req.body.posts1 = posts

  next()
}

exports.createPost = async function(req, res) {
  postsCollection.insertOne({title: req.body.title, content: req.body.content})
  res.redirect('/admin/posts')
}

exports.updatepage = async function(req, res) {
  const document1 = await postsCollection.findOne({_id: new ObjectId(req.params.id)})
  const title = document1.title
  const content = document1.content
  res.render('admin-update-post', {title: title, content: content, id: req.params.id})
}

exports.updatePost = async function(req, res) {
  const postID = req.params.id
  const post = await postsCollection.findOne({_id: new ObjectId(postID)})

  const newTitle = req.body.title
  const newContent = req.body.content

  postsCollection.updateOne(post, {$set: {title: newTitle, content: newContent}})

  res.redirect('/admin/posts')
}

exports.deletePost = async function(req, res) {
  const postID = req.params.id
  const post = await postsCollection.findOne({_id: new ObjectId(postID)})

  postsCollection.deleteOne(post)

  res.redirect('/admin/posts')
}

exports.showPost = async function(req, res) {
  const postID = req.params.postId
  const post = await postsCollection.findOne({_id: new ObjectId(postID)})

  res.render('post', {post: post})
}