const keystone = require('keystone')
const async = require('async')

// https://github.com/JedWatson/sydjs-site/tree/master/routes/api
module.exports = (req, res) => {
  // var view = new keystone.View(req, res);
  const locals = res.locals

  // Set locals
  locals.section = 'contacts'
  locals.data = {}
  async.series([
    (next) => {
      keystone.list('Contacts')
        .model.find()
        .exec((err, result) => {
          if (err) return res.apiError('database error', err)
          locals.data = result[0]
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
