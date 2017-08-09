const keystone = require('keystone')
const Types = keystone.Field.Types

/**
 * Gallery Model
 * =============
 */

const Gallery = new keystone.List('Gallery', {
  autokey: {from: 'name', path: 'key', unique: true}
})

Gallery.add({
  name: {
    type: String,
    required: true
  },
  state: {
    type: Types.Select,
    options: 'draft, published, archived',
    default: 'draft',
    index: true
  },
  publishedDate: {
    type: Date,
    default: Date.now
  },
  heroImage: {
    type: Types.CloudinaryImage
  },
  images: {
    type: Types.CloudinaryImages
  },
  author: {
    type: Types.Relationship,
    ref: 'User',
    index: true
  }
})

Gallery.register()
