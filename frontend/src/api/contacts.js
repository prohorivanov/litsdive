
export function getContacts() {
  const endpoint = {
    url: 'contents'
  };

  const params = {
    type: 'Contacts'
  };

  return { ...endpoint, params };
}