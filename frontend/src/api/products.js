
export function getListProducts() {
  const endpoint = {
    url: 'contents'
  };

  const params = {
    type: 'Product'
  };

  return { ...endpoint, params };
}