import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState, LoginCredentials, RegisterData } from '@/types';

const API_BASE_URL = 'http://localhost:8000/api';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    // Check for stored tokens on mount
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
    const storedUser = localStorage.getItem('bitsa_user');

    if (accessToken && storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('bitsa_user');
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: credentials.email, // Backend expects username, using email as username
          password: credentials.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const user: User = {
          id: data.user.id.toString(),
          email: data.user.email,
          name: `${data.user.first_name} ${data.user.last_name}`.trim() || data.user.username,
          role: data.user.is_staff ? 'admin' : 'student',
          is_staff: data.user.is_staff,
          createdAt: new Date(data.user.date_joined),
          updatedAt: new Date(),
        };

        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
        });

        // Store tokens and user data
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        localStorage.setItem('bitsa_user', JSON.stringify(user));

        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (data: RegisterData): Promise<boolean> => {
    try {
      const trimmedName = data.name.trim();
      const nameParts = trimmedName.split(/\s+/);
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      const response = await fetch(`${API_BASE_URL}/auth/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: data.email, // Use email as username
          email: data.email,
          password: data.password,
          password_confirm: data.confirmPassword,
          first_name: firstName,
          last_name: lastName,
        }),
      });

      if (response.ok) {
        const userData = await response.json();
        const user: User = {
          id: userData.user.id.toString(),
          email: userData.user.email,
          name: `${userData.user.first_name} ${userData.user.last_name}`.trim() || userData.user.username,
          role: userData.user.is_staff ? 'admin' : 'student',
          is_staff: userData.user.is_staff,
          createdAt: new Date(userData.user.date_joined),
          updatedAt: new Date(),
        };

        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
        });

        // Store tokens and user data
        localStorage.setItem('access_token', userData.access);
        localStorage.setItem('refresh_token', userData.refresh);
        localStorage.setItem('bitsa_user', JSON.stringify(user));

        return true;
      }
      return false;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('bitsa_user');
  };

  const updateProfile = async (updates: Partial<User>): Promise<boolean> => {
    if (!authState.user) return false;

    try {
      const updatedUser = { ...authState.user, ...updates, updatedAt: new Date() };
      const users = JSON.parse(localStorage.getItem('bitsa_users') || '[]');
      const userIndex = users.findIndex((u: User) => u.id === authState.user!.id);

      if (userIndex !== -1) {
        users[userIndex] = updatedUser;
        localStorage.setItem('bitsa_users', JSON.stringify(users));
        localStorage.setItem('bitsa_user', JSON.stringify(updatedUser));

        setAuthState({
          user: updatedUser,
          isAuthenticated: true,
          isLoading: false,
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Profile update error:', error);
      return false;
    }
  };

  const value: AuthContextType = {
    ...authState,
    login,
    register,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
