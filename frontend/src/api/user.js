export function getAllUsers (param = {}) {
  const endpoint = {
    url: 'userList'
  }

  const params = {
    ...param
  }

  return {...endpoint, params}
}

export function getUserById ({id}) {
  const endpoint = {
    url: 'user'
  }

  const params = {
    id
  }

  return {...endpoint, params}
}
