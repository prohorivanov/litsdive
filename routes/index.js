/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

// https://github.com/JedWatson/sydjs-site/blob/master/routes/index.js
// https://gist.github.com/JedWatson/9741171
const path = require('path')
const keystone = require('keystone')
const middleware = require('./middleware')
const importRoutes = keystone.importer(__dirname)

// Common Middleware
keystone.pre('routes', middleware.initLocals)
keystone.pre('render', middleware.flashMessages)

// Import Route Controllers
const routes = {
  api: importRoutes('./api'),
  views: importRoutes('./views')
}

// Setup Route Bindings
exports = module.exports = function (app) {
  // Allow cross-domain requests (development only)
  app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
  })

  // Views
  // app.get('/', routes.views.index)
  // app.get('/blog/:category?', routes.views.blog)
  // app.get('/blog/post/:post', routes.views.post)
  // app.get('/gallery', routes.views.gallery)
  // app.all('/contact', routes.views.contact)

  // NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
  // app.get('/protected', middleware.requireUser, routes.views.protected);

  // API
  app.options('/api*', (req, res) => {
    res.sendStatus(200)
  })
  app.all('/api*', keystone.middleware.api)
  app.all('/api/tattoo', routes.api.tattoo.findTattoo)
  app.all('/api/listTattoo', routes.api.tattoo.listTattoo)

  app.all('/api/gallery', routes.api.gallery.findGalleryByName)
  app.all('/api/galleryByAuthor', routes.api.gallery.findGalleryByAuthorId)
  app.all('/api/galleryList', routes.api.gallery.listGallery)

  app.post('/api/catalogByTags', routes.api.catalog.filtersCatalogByTags)
  app.all('/api/catalogBySlug', routes.api.catalog.findCatalogBySlug)
  app.all('/api/catalogList', routes.api.catalog.catalogList)
  app.all('/api/catalogTags', routes.api.catalog.getCatalogsTags)

  app.all('/api/post', routes.api.post.findPostBySlug)
  app.all('/api/postByAuthor', routes.api.post.findPostByAuthor)
  app.all('/api/postList', routes.api.post.postList)

  app.all('/api/user', routes.api.users.findUser)
  app.all('/api/userList', routes.api.users.listUsers)

  app.all('/api/contacts', routes.api.contacts)

  // File Upload Route
  // app.get('/api/fileupload/list', routes.api.fileupload.list);
  // app.get('/api/fileupload/:id', routes.api.fileupload.get);
  // app.all('/api/fileupload/:id/update', routes.api.fileupload.update);
  // app.all('/api/fileupload/create', routes.api.fileupload.create);
  // app.get('/api/fileupload/:id/remove', routes.api.fileupload.remove);

  app.get('*', function (req, res) {
    res.sendFile(path.join(process.cwd(), 'frontend/dist/index.html'))
  })
}
