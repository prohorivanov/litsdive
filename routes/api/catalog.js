// https://github.com/JedWatson/sydjs-site/tree/master/routes/api
const keystone = require('keystone')
const async = require('async')
const prepareData = require('../utils/prepare-data')

exports.catalogList = (req, res) => {
  const locals = res.locals

  // Set locals
  locals.section = 'catalog'
  locals.data = []

  async.series([
    (next) => {
      keystone
        .list('Catalog')
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

exports.findCatalogBySlug = (req, res) => {
  // var view = new keystone.View(req, res);
  const locals = res.locals

  // Set locals
  locals.section = 'catalog'
  locals.filters = {
    slug: req.query.slug
  }
  locals.data = {}
  async.series([
    (next) => {
      keystone
        .list('Catalog')
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


exports.filtersCatalogByTags = (req, res) => {
  // var view = new keystone.View(req, res);
  const locals = res.locals

  // Set locals
  locals.section = 'catalog'
  locals.filters = {
    tags: req.query.tags
  }
  locals.data = {}
  async.series([
    (next) => {
      keystone
        .list('Catalog')
        .model
        .findOne({
          state: 'published',
          tags: locals.filters.tags
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
