
export function getNews() {
  const endpoint = {
    url: 'contents'
  };

  const params = {
    type: 'News'
  };

  return { ...endpoint, params };
}
