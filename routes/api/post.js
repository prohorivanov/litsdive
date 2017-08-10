// https://github.com/JedWatson/sydjs-site/tree/master/routes/api
const keystone = require('keystone')
const async = require('async')
const prepareData = require('../utils/prepare-data')

exports.postList = (req, res) => {
  const locals = res.locals

  // Set locals
  locals.section = 'post'
  locals.data = []

  async.series([
    (next) => {
      keystone
        .list('Post')
        .model.find()
        .where('state', 'published')
        .sort('-publishedDate')
        .limit(30)
        .exec((err, results) => {
          if (err) return res.apiError('database error', err)
          locals.data = results
          next(err)
        })
    }
  ], (err) => {
    if (err) {
      locals.err = err
    }
    res.apiResponse(locals.data)
  })
}

exports.findPostBySlug = (req, res) => {
  // var view = new keystone.View(req, res);
  const locals = res.locals

  // Set locals
  locals.section = 'post'
  locals.filters = {
    slug: req.query.slug
  }
  locals.data = {}
  async.series([
    (next) => {
      keystone
        .list('Post')
        .model
        .findOne({
          state: 'published',
          slug: locals.filters.slug
        })
        .exec((err, result) => {
          if (err) return res.apiError('database error', err)
          locals.data = result
          next(err)
        })
    }
  ], (err) => {
    if (err) {
      locals.err = err
    }
    res.apiResponse(locals.data)
  })
}

exports.findPostByAuthor = (req, res) => {
  // var view = new keystone.View(req, res);
  const locals = res.locals

  console.log(req.query.id, 'req.query.id')
  // Set locals
  locals.section = 'post'
  locals.filters = {
    userId: req.query.userId
  }
  locals.data = {
    post: {},
    authorPost: {}
  }
  async.series([
    (next) => {
      keystone
        .list('Post')
        .model
        .findOne({
          state: 'published',
          author: locals.filters.userId
        })
        .exec((err, result) => {
          if (err) return res.apiError('database error', err)
          locals.data.post = result
          next(err)
        })
    },
    (next) => {
      keystone
        .list('User')
        .model
        .findOne({
          _id: locals.filters.userId
        })
        .exec((err, result) => {
          if (err) return res.apiError('database error', err)
          locals.data.authorPost = prepareData.getUserData(result)
          next(err)
        })
    }
  ], (err) => {
    if (err) {
      locals.err = err
    }
    res.apiResponse(locals.data)
  })
}
