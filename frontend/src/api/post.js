export function getPostList () {
  const endpoint = {
    url: 'postList'
  }

  return {...endpoint}
}

export function getPost ({ slug }) {
  const endpoint = {
    url: 'post',
    method: 'POST'
  }

  const params = {
    slug
  }

  return {...endpoint, params}
}
