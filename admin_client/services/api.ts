
import axios from 'axios';

// Base API configuration
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    // Check if running in browser
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login if unauthorized
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    console.log("hello",response.data);
    // Server returns { success: true, data: { userId, email, name, token } }
    // We need to structure it as { token, user: { userId, email, name } } for the frontend
    const { token, ...userData } = response.data.data;
    return {
      token,
      user: userData
    };
  },
  
  getProfile: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  updateProfile: async (data: any) => {
    const response = await api.put('/auth/profile', data);
    return response.data;
  }
};

export const websiteService = {
  getAll: async () => {
    const response = await api.get('/websites');
    // Server returns { success: true, data: { websites: [...], pagination: {...} } }
    // So we return response.data.data.websites to get the actual array
    return response.data.data.websites;
  },

  getById: async (id: string) => {
    const response = await api.get(`/websites/${id}`);
    // Server returns { success: true, data: { pageId, slug, title, ... } }
    return response.data.data;
  },

  update: async (id: string, data: any) => {
    const response = await api.put(`/websites/${id}`, data);
    // Server returns { success: true, message: "...", data: {...} }
    return response.data.data;
  },
  
  delete: async (id: string) => {
    const response = await api.delete(`/websites/${id}`);
    // Server returns { success: true, message: "Website deleted" }
    return response.data;
  },

  getBySlug: async (slug: string) => {
    const response = await api.get(`/websites/${slug}`);
    return response.data.data;
  },

  updateBySlug: async (slug: string, data: any) => {
    const response = await api.put(`/websites/${slug}`, data);
    return response.data.data;
  }
};

export default api;
