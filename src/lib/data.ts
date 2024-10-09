// NOTE: This is where you could wire up your own data providers:
// GraphQL, Databases, REST APIs, CDNs, proxies, S3, Matrix, IPFS, you name it…
import { API_URL } from '../app/constants.js';
import type { Endpoint, EndpointsToOperations } from '../types/entities.js';

export async function fetchData<Selected extends Endpoint>(endpoint: Selected) {
  const apiEndpoint = `${API_URL}${endpoint}`;

  console.info(`Fetching ${apiEndpoint}…`);
  return fetch(apiEndpoint)
    .then((r) => r.json() as unknown as Promise<ReturnType<EndpointsToOperations[Selected]>>)
    .catch((e) => {
      console.error(e);
      throw Error('Invalid API data!');
    });
}

// NOTE: These helpers are useful for unifying paths, app-wide
export function url(path = '') {
  const baseURL = process.env.SITE ? `${process.env.SITE}/${path}` : `${import.meta.env.SITE}/${path}`;
  return baseURL;
}

export function api(path: string) {
  const baseURL = process.env.PUBLIC_API_URL
    ? `${process.env.PUBLIC_API_URL}${path}`
    : `${import.meta.env.PUBLIC_API_URL}${path}`;
  return baseURL;
}
