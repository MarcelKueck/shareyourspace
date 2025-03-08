import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, UserType } from '@/models/user';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import { get, post } from '@/lib/api/api-client';

interface AuthState {
  user: User | null;
  userType: UserType | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: Error | null;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  logout: () => Promise<void>;
  register: (userData: RegistrationData) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (token: string, newPassword: string) => Promise<void>;
  clearError: () => void;
  refreshToken: () => Promise<boolean>;
}

export interface RegistrationData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  userType: UserType;
  // Other fields will be type-specific
  [key: string]: any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Token refresh interval in milliseconds (15 minutes)
const TOKEN_REFRESH_INTERVAL = 15 * 60 * 1000;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    userType: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  const router = useRouter();

  // Check if user is authenticated on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        setState((prev) => ({ ...prev, isLoading: true }));
        const token = getCookie('auth-token');

        if (token) {
          // Verify the token and get user data
          const csrfToken = getCookie('csrf-token');

          const response = await get<{ user: User }>('/api/v1/users/me', {
            headers: {
              Authorization: `Bearer ${token}`,
              'X-CSRF-Token': csrfToken || '',
            },
          });

          setState({
            user: response.user,
            userType: response.user.userType,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } else {
          setState({
            user: null,
            userType: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
        }
      } catch (err) {
        console.error('Authentication initialization error:', err);
        setState({
          user: null,
          userType: null,
          isAuthenticated: false,
          isLoading: false,
          error: err as Error,
        });
        deleteCookie('auth-token');
      }
    };

    initAuth();
  }, []);

  // Set up token refresh interval
  useEffect(() => {
    if (!state.isAuthenticated) return;

    const intervalId = setInterval(() => {
      refreshToken();
    }, TOKEN_REFRESH_INTERVAL);

    return () => clearInterval(intervalId);
  }, [state.isAuthenticated]);

  const refreshToken = async (): Promise<boolean> => {
    try {
      const response = await post<{ token: string }>('/api/v1/auth/refresh-token');

      // Token is set via HTTP-only cookie in the server response
      // This is just for redundancy
      if (response.token) {
        setCookie('auth-token', response.token, {
          maxAge: 7 * 24 * 60 * 60, // 7 days
          path: '/',
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
        });
        return true;
      }
      return false;
    } catch (err) {
      console.error('Token refresh failed:', err);
      // If refresh fails, log the user out
      await logout();
      return false;
    }
  };

  const login = async (email: string, password: string, rememberMe = false) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      // Get CSRF token first
      const csrfResponse = await get<{ csrfToken: string }>('/api/v1/auth/csrf');
      setCookie('csrf-token', csrfResponse.csrfToken, {
        maxAge: 60 * 60, // 1 hour
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });

      const response = await post<{ user: User; token: string }>(
        '/api/v1/auth/login',
        {
          email,
          password,
          rememberMe,
        },
        {
          headers: {
            'X-CSRF-Token': csrfResponse.csrfToken,
          },
        }
      );

      // Update state with user data
      setState({
        user: response.user,
        userType: response.user.userType,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      // Redirect based on user type
      if (response.user.userType === UserType.CORPORATE) {
        router.push('/dashboard/corporate');
      } else {
        router.push('/dashboard/startup');
      }
    } catch (err) {
      setState((prev) => ({ ...prev, isLoading: false, error: err as Error }));
      throw err;
    }
  };

  const logout = async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true }));

      // Get CSRF token
      const csrfToken = getCookie('csrf-token');

      await post(
        '/api/v1/auth/logout',
        {},
        {
          headers: {
            'X-CSRF-Token': csrfToken || '',
          },
        }
      );

      setState({
        user: null,
        userType: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });

      // Clear cookies
      deleteCookie('auth-token');
      deleteCookie('csrf-token');

      router.push('/auth/login');
    } catch (err) {
      setState((prev) => ({ ...prev, isLoading: false, error: err as Error }));
    }
  };

  const register = async (userData: RegistrationData) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      // Get CSRF token first
      const csrfResponse = await get<{ csrfToken: string }>('/api/v1/auth/csrf');

      const response = await post<{ user: User; token: string }>(
        '/api/v1/auth/register',
        userData,
        {
          headers: {
            'X-CSRF-Token': csrfResponse.csrfToken,
          },
        }
      );

      setState({
        user: response.user,
        userType: response.user.userType,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      // Redirect to email verification page
      router.push('/auth/verify-email');
    } catch (err) {
      setState((prev) => ({ ...prev, isLoading: false, error: err as Error }));
      throw err;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      // Get CSRF token first
      const csrfResponse = await get<{ csrfToken: string }>('/api/v1/auth/csrf');

      await post(
        '/api/v1/auth/forgot-password',
        { email },
        {
          headers: {
            'X-CSRF-Token': csrfResponse.csrfToken,
          },
        }
      );

      setState((prev) => ({ ...prev, isLoading: false }));
    } catch (err) {
      setState((prev) => ({ ...prev, isLoading: false, error: err as Error }));
      throw err;
    }
  };

  const updatePassword = async (token: string, newPassword: string) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      // Get CSRF token first
      const csrfResponse = await get<{ csrfToken: string }>('/api/v1/auth/csrf');

      await post(
        '/api/v1/auth/reset-password',
        { token, newPassword },
        {
          headers: {
            'X-CSRF-Token': csrfResponse.csrfToken,
          },
        }
      );

      setState((prev) => ({ ...prev, isLoading: false }));
    } catch (err) {
      setState((prev) => ({ ...prev, isLoading: false, error: err as Error }));
      throw err;
    }
  };

  const clearError = () => {
    setState((prev) => ({ ...prev, error: null }));
  };

  const value = {
    ...state,
    login,
    logout,
    register,
    resetPassword,
    updatePassword,
    clearError,
    refreshToken,
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
