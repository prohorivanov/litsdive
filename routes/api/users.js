const keystone = require('keystone')
const async = require('async')

const getUserData = listUsers => (
  listUsers.map(r => ({
    _id: r._id,
    email: r.email,
    tattoos: r.tattoos,
    name: r.name,
    image: {
      url: r.image.url || ''
    }
  }))
)

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
        .model.find()
        .exec((err, results) => {
          if (err) return res.apiError('database error', err)
          locals.data = getUserData(results)
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
    id: req.params.id
  }
  locals.data = {}
  async.series([
    (next) => {
      keystone.list('User')
        .model.findOne({
          _id: locals.filters.id
        })
        .exec((err, result) => {
          if (err) return res.apiError('database error', err)
          locals.data = getUserData(result)
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
