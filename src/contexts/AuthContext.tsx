import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { User, UserType } from '@/models/user';
import apiClient from '@/lib/api/api-client';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';

interface RegistrationData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  userType: UserType;
  // Other fields will be type-specific
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  logout: () => Promise<void>;
  register: (userData: RegistrationData) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (token: string, newPassword: string) => Promise<void>;
  isAuthenticated: boolean;
  userType: UserType | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
          const response = await apiClient.get<{ user: User }>('/api/v1/users/me');
          setUser(response.data.user);
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

  const login = async (email: string, password: string, rememberMe = false) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await apiClient.post<{ user: User; token: string }>('/api/v1/auth/login', {
        email,
        password,
        rememberMe,
      });

      setUser(response.data.user);

      // Token is set via HTTP-only cookie in the server response
      // This is just for redundancy or client-side usage if needed
      setCookie('auth-token', response.data.token, {
        maxAge: rememberMe ? 30 * 24 * 60 * 60 : 7 * 24 * 60 * 60,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });

      // Redirect based on user type
      if (response.data.user.userType === UserType.CORPORATE) {
        router.push('/dashboard/corporate');
      } else {
        router.push('/dashboard/startup');
      }
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
      setError(null);

      const response = await apiClient.post<{ user: User; token: string }>(
        '/api/v1/auth/register',
        userData
      );

      setUser(response.data.user);
      setCookie('auth-token', response.data.token, {
        maxAge: 7 * 24 * 60 * 60,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });

      // Redirect to email verification page
      router.push('/auth/verify-email');
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await apiClient.post('/api/v1/auth/forgot-password', { email });
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updatePassword = async (token: string, newPassword: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await apiClient.post('/api/v1/auth/reset-password', { token, newPassword });
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    isLoading,
    error,
    login,
    logout,
    register,
    resetPassword,
    updatePassword,
    isAuthenticated: !!user,
    userType: user?.userType || null,
    clearError,
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
