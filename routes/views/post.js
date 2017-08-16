const keystone = require('keystone')
const async = require('async')

module.exports = function (req, res) {
  // var view = new keystone.View(req, res);
  const locals = res.locals

  // Set locals
  locals.section = 'blog'
  locals.filters = {
    post: req.params.post
  }
  locals.data = {
    posts: []
  }
  async.series([
    (next) => {
      keystone
        .list('Post')
        .model
        .findOne({
          state: 'published',
          slug: locals.filters.post
        })
        .populate('author categories')
        .exec((err, result) => {
          locals.data.post = result
          next(err)
        })
    },
    (next) => {
      keystone
        .list('Post')
        .model.find()
        .where('state', 'published')
        .sort('-publishedDate')
        .populate('author')
        .limit(4)
        .exec((err, results) => {
          locals.data.posts = results
          next(err)
        })
    }
  ], (err) => {
    if (err) {
      locals.err = err
    }
    res.json(locals)
  })

  // Render the view
  // view.render('post');
}
