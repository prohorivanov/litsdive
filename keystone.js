// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config()

// Require keystone
const keystone = require('keystone')
const wysiwyg = require('./wysiwyg-conf')

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({
  'name': 'tattoobunker',
  'brand': 'tattoobunker',

  'stylus': 'public',
  'static': 'public',
  'favicon': 'public/favicon.ico',
  'views': 'templates/views',
  'view engine': 'pug',

  'auto update': true,
  'session': true,
  'auth': true,
  'user model': 'User',
  'cookie secret': 'secret',
  'cloudinary config': {
    cloud_name: 'tattoobunker',
    api_key: '515927175562849',
    api_secret: 'WovDBOUFNpN49cFadIS-RhAEKv8'
  },
  'cloudinary folders': true,
  'google api key': 'AIzaSyBKNPgliajVi0PwIjFjYphp0uG-1IqRRn8',
  'wysiwyg additional options': wysiwyg.wysiwygConf
})

// Load your project's Models
keystone.import('models')

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
  _: require('lodash'),
  env: keystone.get('env'),
  utils: keystone.utils,
  editable: keystone.content.editable
})

// Load your project's Routes
keystone.set('routes', require('./routes'))

// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
  posts: ['posts', 'post-categories'],
  galleries: 'galleries',
  tattoo: ['tattoos', 'tattoo-categories'],
  contacts: 'contacts',
  users: 'users',
  catalog: 'catalogs'
})

// Start Keystone to connect to your database and initialise the web server

keystone.start()
