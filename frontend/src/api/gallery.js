export function getAllGalleries (param = {}) {
  const endpoint = {
    url: 'galleryList',
    method: 'POST'
  }

  const params = {
    ...param
  }

  return {...endpoint, params}
}

export function getGalleriesByName ({name}) {
  const endpoint = {
    url: 'gallery',
    method: 'POST'
  }

  const params = {
    name
  }

  return {...endpoint, params}
}

export function findGalleryByAuthorId ({id}) {
  const endpoint = {
    url: 'galleryByAuthor',
    method: 'POST'
  }

  const params = {
    id
  }

  return {...endpoint, params}
}
