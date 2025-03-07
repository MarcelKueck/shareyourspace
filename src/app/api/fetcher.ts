import apiClient from './api-client';

// SWR fetcher function
const fetcher = async <T>(url: string): Promise<T> => {
  try {
    const response = await apiClient.get<T>(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default fetcher;

// src/lib/api/api-hooks.ts
import useSWR, { SWRConfiguration } from 'swr';
import { get, post, put, del } from './api-client';

// Generic hook for GET requests
export function useGet<T>(url: string | null, config?: SWRConfiguration) {
  const { data, error, mutate, isLoading, isValidating } = useSWR<T>(url, fetcher, config);

  return {
    data,
    error,
    mutate,
    isLoading,
    isValidating,
  };
}

// Hook for POST requests
export function usePost<T, D = any>() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = async (url: string, data: D): Promise<T | null> => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await post<T>(url, data);
      return response;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { execute, isLoading, error };
}

// Hook for PUT requests
export function usePut<T, D = any>() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = async (url: string, data: D): Promise<T | null> => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await put<T>(url, data);
      return response;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { execute, isLoading, error };
}

// Hook for DELETE requests
export function useDelete<T>() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = async (url: string): Promise<T | null> => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await del<T>(url);
      return response;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { execute, isLoading, error };
}
