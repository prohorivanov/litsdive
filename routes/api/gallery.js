// https://github.com/JedWatson/sydjs-site/tree/master/routes/api
const keystone = require('keystone')
const async = require('async')
const prepareData = require('../utils/prepare-data')

exports.listGallery = (req, res) => {
  const locals = res.locals

  // Set locals
  locals.section = 'gallery'
  locals.data = []

  async.series([
    (next) => {
      keystone
        .list('Gallery')
        .model
        .find({name: {$ne: 'About'}})
        .where('state', 'published')
        .sort('-publishedDate')
        .limit(10)
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

exports.findGalleryByName = (req, res) => {
  // var view = new keystone.View(req, res);
  const locals = res.locals

  // Set locals
  locals.section = 'gallery'
  locals.filters = {
    name: req.query.name
  }
  locals.data = {}
  async.series([
    (next) => {
      keystone
        .list('Gallery')
        .model
        .findOne({
          state: 'published',
          key: {_id: locals.filters.name}
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

exports.findGalleryByAuthorId = (req, res) => {
  // var view = new keystone.View(req, res);
  const locals = res.locals

  // Set locals
  locals.section = 'gallery'
  locals.filters = {
    id: req.query.id
  }
  locals.data = {
    gallery: {},
    authorGallery: {}
  }
  async.series([
    (next) => {
      keystone
        .list('Gallery')
        .model
        .findOne({
          state: 'published',
          author: locals.filters.id
        })
        .exec((err, result) => {
          if (err) return res.apiError('database error', err)
          locals.data.gallery = result
          next(err)
        })
    },
    (next) => {
      keystone
        .list('User')
        .model
        .findOne({
          _id: locals.filters.id
        })
        .exec((err, result) => {
          if (err) return res.apiError('database error', err)
          locals.data.authorGallery = prepareData.getUserData(result)
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
