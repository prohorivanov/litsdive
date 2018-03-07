const keystone = require('keystone')
const Types = keystone.Field.Types

/**
 * Post Model
 * ==========
 */

const Contacts = new keystone.List('Contacts', {
  label: 'Contacts'
})

Contacts.add({
  location: {
    type: Types.Location,
    defaults: {
      country: 'Russia'
    }
  },

  email: {
    type: Types.Email
  },
  content: {
    type: Types.Html,
    wysiwyg: true,
    height: 400
  },
  socials: {
    vk: {
      type: Types.Url
    },
    fb: {
      type: Types.Url
    }
  },
  mapEmbed: {
    type: Types.Text
  }
})

Contacts.register()
