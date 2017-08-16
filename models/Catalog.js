const keystone = require('keystone')
const Types = keystone.Field.Types

/**
 * Post Model
 * ==========
 */

const Catalog = new keystone.List('Catalog', {
  map: {name: 'title'},
  label: 'Catalog',
  autokey: {path: 'slug', from: 'title', unique: true}
})

Catalog.add({
  title: {
    type: String,
    required: true
  },
  state: {
    type: Types.Select,
    options: 'draft, published',
    default: 'published',
    index: true
  },
  price: {
    type: Types.Money,
    format: '$0,0.00',
    currency: 'ru'
  },
  image: {
    type: Types.CloudinaryImage
  },
  tags: {
    type: Types.Relationship,
    ref: 'CatalogCategory',
    many: true
  }
})

Catalog.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%'
Catalog.register()
