const keystone = require('keystone')
const async = require('async')
const prepareData = require('../utils/prepare-data')

// https://github.com/JedWatson/sydjs-site/tree/master/routes/api
exports.listUsers = (req, res) => {
  // var view = new keystone.View(req, res);
  const locals = res.locals

  // Set locals
  locals.section = 'tattoo'
  locals.data = []
  async.series([
    (next) => {
      keystone
        .list('User')
        .model
        .find()
        .where('isOnlyKeystone').exists(false)
        .exec((err, results) => {
          if (err) return res.apiError('database error', err)
          locals.data = prepareData.getUsersData(results)
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

exports.findUser = (req, res) => {
  // var view = new keystone.View(req, res);
  const locals = res.locals

  // Set locals
  locals.section = 'user'
  locals.filters = {
    id: req.query.id
  }
  locals.data = {}
  async.series([
    (next) => {
      keystone
        .list('User')
        .model
        .findOne({
          _id: locals.filters.id
        })
        .exec((err, result) => {
          if (err) return res.apiError('database error', err)
          locals.data = prepareData.getUserData(result)
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
