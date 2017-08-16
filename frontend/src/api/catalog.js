export function getListCatalog (param = {}) {
  const endpoint = {
    url: 'catalog'
  }

  const params = {
    ...param
  }

  return {...endpoint, params}
}
