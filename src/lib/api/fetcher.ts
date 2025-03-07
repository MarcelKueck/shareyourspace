import apiClient from './api-client';

/**
 * A fetcher function for SWR to make API requests
 * @param url The URL to fetch
 * @returns Promise that resolves to the response data
 */
const fetcher = async <T>(url: string): Promise<T> => {
  try {
    const response = await apiClient.get<T>(url);
    return response.data;
  } catch (error) {
    // Re-throw for SWR's error handling
    throw error;
  }
};

/**
 * A posting fetcher function that can be used with SWR's mutate
 * @param url The URL to post to
 * @param data The data to post
 * @returns Promise that resolves to the response data
 */
export const posterFetcher = async <T, D>(url: string, data: D): Promise<T> => {
  try {
    const response = await apiClient.post<T>(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * A fetcher function for SWR to make URL parameterized API requests
 * @param args An array where first item is the URL and the rest are query parameters
 * @returns Promise that resolves to the response data
 */
export const parameterizedFetcher = async <T>(...args: any[]): Promise<T> => {
  const [url, ...params] = args;

  // Convert params to query string if needed
  const queryParams = new URLSearchParams();
  if (params.length === 1 && typeof params[0] === 'object') {
    Object.entries(params[0]).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, String(value));
      }
    });
  }

  const queryString = queryParams.toString();
  const fullUrl = queryString ? `${url}?${queryString}` : url;

  return fetcher<T>(fullUrl);
};

export default fetcher;
