// src/services/auth.service.js
import { ref, computed } from 'vue';
import TokenService from './tokenService';
import api from './api.js';

// Reactive state
const user = ref(null);
const loading = ref(false);
const error = ref(null);

// Authentication service
export function useAuth() {
  // Auto-load user info if a token exists
  if (!user.value && TokenService.isAuthenticated()) {
    loadUserInfo();
  }

  const isAuthenticated = computed(() => !!user.value);
  const isAdmin = computed(() => user.value?.role?.slug === 'admin');
  const currentUser = computed(() => user.value);

  // Login function
  async function login(credentials) {
    loading.value = true;
    error.value = null;

    try {
      if (!credentials.email || !credentials.password) {
        throw new Error('Email and password are required');
      }

      const response = await api.post('login', credentials);
      if (response.data.token && response.data.user) {
        TokenService.setToken(response.data.token);
        user.value = response.data.user;
        return response;
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      error.value = err.response?.data?.message || 'Login failed';
      throw err;
    } finally {
      loading.value = false;
    }
  }

  // Register function
  async function register(userData) {
    loading.value = true;
    error.value = null;

    try {
      return await api.post('register', userData);
    } catch (err) {
      error.value = err.response?.data?.message || 'Registration failed';
      throw err;
    } finally {
      loading.value = false;
    }
  }

  // Logout function
  function logout() {
    user.value = null;
    TokenService.removeToken();
  }

  // Load user info function
  async function loadUserInfo() {
    loading.value = true;
    error.value = null;

    try {
      if (TokenService.isAuthenticated()) {
        const response = await api.get('me');
        if (response.data.user) {
          user.value = response.data.user;
        } else {
          throw new Error('Invalid user data');
        }
      }
    } catch (err) {
      if (err.response?.status === 401) {
        TokenService.removeToken(); // Only remove token if unauthorized
      }
      error.value = 'Failed to load user info';
    } finally {
      loading.value = false;
    }
  }

  return {
    user,
    loading,
    error,
    isAuthenticated,
    isAdmin,
    currentUser,
    login,
    register,
    logout,
    loadUserInfo,
  };
}