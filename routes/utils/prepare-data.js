exports.getUsersData = listUsers => (
  listUsers.map(r => ({
    _id: r._id,
    email: r.email,
    tattoos: r.tattoos,
    name: r.name,
    fullName: r.name.fullName,
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
  fullName: users.name.fullName,
  image: {
    url: users.image.url || ''
  }
})
