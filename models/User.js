const keystone = require('keystone')
const Types = keystone.Field.Types

/**
 * User Model
 * ==========
 */
const User = new keystone.List('User')

User.add({
  name: {
    type: Types.Name,
    required: true,
    index: true
  },
  image: {
    type: Types.CloudinaryImage
  },
  email: {
    type: Types.Email,
    initial: true,
    required: true,
    unique: true,
    index: true
  },
  password: {
    type: Types.Password,
    initial: true,
    required: true
  },
  about: {
    extended: {
      type: Types.Html,
      wysiwyg: true,
      height: 400
    }
  },
  tattoos: {
    type: Types.Relationship,
    ref: 'Tattoo',
    many: true
  },
  isOnlyKeystone: {
    type: Boolean,
    label: 'User only Keystone admin',
    index: true
  }
}, 'Permissions', {
  isAdmin: {
    type: Boolean,
    label: 'Can access Keystone',
    index: true
  }
})

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function () {
  return this.isAdmin
})

User.schema.virtual('name.fullName').get(function () {
  return `${this.name.first} ${this.name.last}`
})

/**
 * Registration
 */
User.defaultColumns = 'name, email, isAdmin'
User.register()
