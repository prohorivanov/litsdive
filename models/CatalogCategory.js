const keystone = require('keystone')

/**
 * TattooCategory Model
 * ==================
 */

const CatalogCategory = new keystone.List('CatalogCategory', {
  autokey: {
    from: 'name',
    path: 'key',
    unique: true
  }
})

CatalogCategory.add({
  name: {
    type: String,
    required: true
  }
})

CatalogCategory.relationship({
  ref: 'Catalog',
  path: 'catalogs',
  refPath: 'tags'
})

CatalogCategory.register()
