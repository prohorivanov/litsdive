
export function getAllAuthor() {
  const endpoint = {
    url: 'contents'
  };

  const params = {
    type: 'Author'
  };

  return { ...endpoint, params };
}

export function getAuthorById({ slug }) {
  const endpoint = {
    url: 'content'
  };

  const params = {
    slug
  };

  return { ...endpoint, params };
}