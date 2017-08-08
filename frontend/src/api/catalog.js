
export function getListCatalog() {
  const endpoint = {
    url: 'contents'
  };

  const params = {
    type: 'Catalog'
  };

  return { ...endpoint, params };
}