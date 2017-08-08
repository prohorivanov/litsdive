const keystone = require('keystone')
const async = require('async')

// https://github.com/JedWatson/sydjs-site/tree/master/routes/api
module.exports = (req, res) => {
  // var view = new keystone.View(req, res);
  const locals = res.locals

  // Set locals
  locals.section = 'tattoo'
  locals.filters = {
    tattoo: req.params.post
  }
  locals.data = {
    tattooCollection: [],
    tattoo: {}
  }
  async.series([
    (next) => {
      keystone.list('Tattoo')
        .model.findOne({state: 'published', slug: locals.filters.post})
        .populate('author categories')
        .exec((err, result) => {
          if (err) return res.apiError('database error', err)
          locals.data.tattoo = result
          next(err)
        })
    },
    (next) => {
      keystone
        .list('Tattoo')
        .model.find()
        .where('state', 'published')
        .sort('-publishedDate')
        .populate('author')
        .limit(4)
        .exec((err, results) => {
          if (err) return res.apiError('database error', err)
          locals.data.tattooCollection = results
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
