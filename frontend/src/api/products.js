export function getProductsTags () {
  const endpoint = {
    url: 'catalogTags'
  }
  return {...endpoint}
}

export function getListProducts () {
  const endpoint = {
    url: 'catalogList'
  }

  const params = {}

  return {...endpoint, params}
}

/**
 *
 * @param {String} slug
 * @returns {{params: {slug: *}}}
 */
export function getProductBySlug ({slug}) {
  const endpoint = {
    url: 'catalogBySlug'
  }

  const params = {
    slug
  }

  return {...endpoint, params}
}

/**
 *
 * @param {Array} tags
 * @returns {{params: {tags: *}}}
 */
export function getProductsByTags ({tags}) {
  const endpoint = {
    url: 'catalogByTags'
  }

  const params = {
    tags
  }

  return {...endpoint, params}
}
