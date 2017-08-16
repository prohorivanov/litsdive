const keystone = require('keystone')
const Types = keystone.Field.Types

/**
 * Post Model
 * ==========
 */

const Tattoo = new keystone.List('Tattoo', {
  map: {name: 'title'},
  label: 'Tattoo',
  autokey: {path: 'slug', from: 'title', unique: true}
})

Tattoo.add({
  title: {
    type: String,
    required: true
  },
  state: {
    type: Types.Select,
    options: 'draft, published, archived',
    default: 'draft',
    index: true
  },
  author: {
    type: Types.Relationship,
    ref: 'User',
    index: true
  },
  image: {
    type: Types.CloudinaryImage
  },
  tags: {
    type: Types.Relationship,
    ref: 'TattooCategory',
    many: true
  }
})

Tattoo.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%'
Tattoo.register()
