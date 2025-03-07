import { SWRConfig } from 'swr';
import fetcher from './fetcher';

export const SwrConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <SWRConfig
      value={{
        fetcher,
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
        refreshInterval: 0,
        errorRetryCount: 3,
        dedupingInterval: 1000, // Dedupe requests within 1 second
        shouldRetryOnError: true,
        suspense: false, // Enable this for React Suspense mode
      }}
    >
      {children}
    </SWRConfig>
  );
};

// Example usage in _app.tsx:
/*
import { SwrConfigProvider } from '@/lib/api/swr-config';

function MyApp({ Component, pageProps }) {
  return (
    <SwrConfigProvider>
      <Component {...pageProps} />
    </SwrConfigProvider>
  );
}
*/