exports.getUsersData = listUsers => (
  listUsers.map(r => ({
    _id: r._id,
    email: r.email,
    tattoos: r.tattoos,
    name: r.name,
    image: {
      url: r.image.url || ''
    }
  }))
)

exports.getUserData = users => ({
  _id: users._id,
  email: users.email,
  tattoos: users.tattoos,
  name: users.name,
  image: {
    url: users.image.url || ''
  }
})
