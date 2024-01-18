const BASE_URL = 'https://fakestoreapi.com';

export function getData<T>(url: string): Promise<T> {
  return fetch(`${BASE_URL}${url}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return response.json();
    })
    .catch((error) => {
      throw new Error(`Fetch error: ${error.message}`);
    });
}
