const keystone = require('keystone')

/**
 * TattooCategory Model
 * ==================
 */

const TattooCategory = new keystone.List('TattooCategory', {
  autokey: {
    from: 'name',
    path: 'key',
    unique: true
  }
})

TattooCategory.add({
  name: {
    type: String,
    required: true
  }
})

TattooCategory.relationship({
  ref: 'Tattoo',
  path: 'tattoos',
  refPath: 'tags'
})

TattooCategory.register()
