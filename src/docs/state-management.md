# ShareYourSpace State Management Approach

## Overview

ShareYourSpace uses a hybrid state management approach to handle the complex marketplace flows and ensure enterprise-grade performance and reliability:

1. **React Context API** for global state (authentication, user profile, theme)
2. **SWR** for data fetching, caching, and revalidation
3. **React Query** for complex server state management
4. **Zustand** for specific complex UI states
5. **Form state** managed through React Hook Form

## Implementation Structure

### 1. Global Context Providers

Located in `src/contexts/`:

- **AuthContext**: Manages authentication state, token refresh, and user sessions
- **UserContext**: Provides access to current user profile and company details
- **ThemeContext**: Manages UI theme preferences
- **AssistantContext**: Manages conversation with ShareYourSpace Assistant
- **NotificationContext**: Manages system notifications and alerts

#### Example Auth Context Implementation:

```typescript
// src/contexts/AuthContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { User, UserType } from '@/models/user';
import apiClient from '@/lib/api/api-client';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (userData: RegistrationData) => Promise<void>;
  isAuthenticated: boolean;
  userType: UserType | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();

  // Check if user is authenticated on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        setIsLoading(true);
        const token = getCookie('auth-token');
        
        if (token) {
          const response = await apiClient.get('/api/v1/users/me');
          setUser(response.data);
        }
      } catch (err) {
        setError(err as Error);
        deleteCookie('auth-token');
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await apiClient.post('/api/v1/auth/login', { email, password });
      setUser(response.data.user);
      setCookie('auth-token', response.data.token, { maxAge: 7 * 24 * 60 * 60 });
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await apiClient.post('/api/v1/auth/logout');
      setUser(null);
      deleteCookie('auth-token');
      router.push('/auth/login');
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegistrationData) => {
    try {
      setIsLoading(true);
      const response = await apiClient.post('/api/v1/auth/register', userData);
      setUser(response.data.user);
      setCookie('auth-token', response.data.token, { maxAge: 7 * 24 * 60 * 60 });
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isLoading,
    error,
    login,
    logout,
    register,
    isAuthenticated: !!user,
    userType: user?.userType || null,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

### 2. SWR Data Fetching

Used for most data fetching operations with the following configuration:

```typescript
// src/lib/api/swr-config.ts
import { SWRConfig } from 'swr';
import fetcher from './fetcher';

export const SwrConfigProvider: React.FC = ({ children }) => {
  return (
    <SWRConfig
      value={{
        fetcher,
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
        refreshInterval: 0,
        errorRetryCount: 3,
      }}
    >
      {children}
    </SWRConfig>
  );
};
```

```typescript
// src/lib/api/fetcher.ts
import apiClient from './api-client';

const fetcher = async (url: string) => {
  const response = await apiClient.get(url);
  return response.data;
};

export default fetcher;
```

### 3. Custom Hooks

Created for each major feature area:

```typescript
// src/hooks/useSpaces.ts
import useSWR from 'swr';
import { Space } from '@/models/space';
import apiClient from '@/lib/api/api-client';

interface UseSpacesOptions {
  district?: string;
  spaceType?: string;
  minCapacity?: number;
  complianceLevel?: string;
  minDuration?: string;
  page?: number;
  limit?: number;
}

export function useSpaces(options: UseSpacesOptions = {}) {
  const { district, spaceType, minCapacity, complianceLevel, minDuration, page = 1, limit = 10 } = options;
  
  // Build query string
  const queryParams = new URLSearchParams();
  if (district) queryParams.append('district', district);
  if (spaceType) queryParams.append('spaceType', spaceType);
  if (minCapacity) queryParams.append('minCapacity', minCapacity.toString());
  if (complianceLevel) queryParams.append('complianceLevel', complianceLevel);
  if (minDuration) queryParams.append('minDuration', minDuration);
  queryParams.append('page', page.toString());
  queryParams.append('limit', limit.toString());
  
  const queryString = queryParams.toString();
  const url = `/api/v1/spaces${queryString ? `?${queryString}` : ''}`;
  
  const { data, error, mutate } = useSWR<{ spaces: Space[], total: number }>(url);
  
  const createSpace = async (spaceData: Partial<Space>) => {
    const response = await apiClient.post('/api/v1/spaces', spaceData);
    mutate(); // Revalidate spaces list
    return response.data;
  };
  
  const updateSpace = async (id: string, spaceData: Partial<Space>) => {
    const response = await apiClient.put(`/api/v1/spaces/${id}`, spaceData);
    mutate(); // Revalidate spaces list
    return response.data;
  };
  
  return {
    spaces: data?.spaces || [],
    total: data?.total || 0,
    isLoading: !error && !data,
    isError: error,
    createSpace,
    updateSpace,
    mutate,
  };
}
```

### 4. Form State Management

Using React Hook Form with Zod for validation:

```typescript
// Example usage in a component
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const spaceFormSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  spaceType: z.string().min(1, 'Space type is required'),
  capacity: z.number().min(1, 'Capacity must be at least 1'),
  size: z.number().min(1, 'Size must be at least 1 square meter'),
  address: z.object({
    street: z.string().min(1, 'Street is required'),
    city: z.string().min(1, 'City is required'),
    postalCode: z.string().min(1, 'Postal code is required'),
    country: z.string().min(1, 'Country is required'),
    district: z.string().min(1, 'District is required'),
  }),
  amenities: z.array(z.string()).min(1, 'At least one amenity is required'),
  securityFeatures: z.array(z.string()).min(1, 'At least one security feature is required'),
  complianceLevel: z.string().min(1, 'Compliance level is required'),
  minimumBookingDuration: z.string().min(1, 'Minimum booking duration is required'),
});

type SpaceFormValues = z.infer<typeof spaceFormSchema>;

export const SpaceForm = () => {
  const { register, handleSubmit, formState: { errors }, control } = useForm<SpaceFormValues>({
    resolver: zodResolver(spaceFormSchema),
    defaultValues: {
      name: '',
      description: '',
      spaceType: '',
      capacity: 1,
      size: 1,
      address: {
        street: '',
        city: 'Munich',
        postalCode: '',
        country: 'Germany',
        district: '',
      },
      amenities: [],
      securityFeatures: [],
      complianceLevel: 'standard',
      minimumBookingDuration: 'monthly',
    },
  });
  
  const onSubmit = (data: SpaceFormValues) => {
    console.log(data);
    // Submit data to API
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Form fields */}
    </form>
  );
};
```

### 5. Optimistic Updates

For responsive user experience, we implement optimistic updates for critical actions:

```typescript
// Example with SWR
import useSWR, { mutate } from 'swr';

// In a component
const updateBooking = async (bookingId, newStatus) => {
  // Get the current data
  const currentData = cache.get(`/api/v1/bookings/${bookingId}`);
  
  // Optimistically update the UI
  mutate(
    `/api/v1/bookings/${bookingId}`,
    { ...currentData, status: newStatus },
    false
  );
  
  // Make the actual API call
  try {
    await apiClient.put(`/api/v1/bookings/${bookingId}/status`, { status: newStatus });
    // Success, revalidate to ensure data consistency
    mutate(`/api/v1/bookings/${bookingId}`);
  } catch (error) {
    // Revert to original data on error
    mutate(`/api/v1/bookings/${bookingId}`, currentData, false);
    throw error;
  }
};
```

### 6. State Persistence

Certain state is persisted across sessions:

- Authentication tokens stored in HTTP-only cookies
- User preferences stored in localStorage
- Form drafts stored in sessionStorage

### 7. Server-side State Hydration

For SEO and performance, initial state is hydrated from the server:

```typescript
// Example in a page component
export const getServerSideProps = async (context) => {
  // Fetch initial data
  const initialData = await fetchData(context);
  
  return {
    props: {
      fallback: {
        '/api/v1/endpoint': initialData,
      },
    },
  };
};

// In the page component
import { SWRConfig } from 'swr';

const Page = ({ fallback }) => {
  return (
    <SWRConfig value={{ fallback }}>
      <Component />
    </SWRConfig>
  );
};
```