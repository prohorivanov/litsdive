export function getAllAuthor () {
  const endpoint = {
    url: 'userList'
  }

  return {...endpoint}
}

export function getAuthorById ({id}) {
  const endpoint = {
    url: 'user'
  }

  const params = {
    id
  }

  return {...endpoint, params}
}
