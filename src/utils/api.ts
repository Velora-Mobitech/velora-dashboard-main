// API utility functions for Velora Dashboard

const API_BASE_URL = "https://web-production-ff0fb.up.railway.app/api";

// Helper function to get auth token
const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('velora_token');
  }
  return null;
};

// Helper function to make authenticated API requests
const makeAuthenticatedRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

// Authentication APIs
export const authAPI = {
  login: async (email: string, password: string) => {
    const loginUrl = `${API_BASE_URL}/auth/login`;
    console.log("AuthAPI Login URL:", loginUrl);
    console.log("AuthAPI Request payload:", { email, password });
    
    const response = await fetch(loginUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },

  register: async (userData: { name: string; email: string; password: string; role: string }) => {
    const registerUrl = `${API_BASE_URL}/auth/register`;
    console.log("AuthAPI Register URL:", registerUrl);
    console.log("AuthAPI Register payload:", userData);
    
    const response = await fetch(registerUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return response.json();
  },

  getProfile: async () => {
    const profileUrl = '/auth/profile';
    console.log("AuthAPI Profile URL:", `${API_BASE_URL}${profileUrl}`);
    return makeAuthenticatedRequest(profileUrl);
  },

  updateProfile: async (userData: any) => {
    const updateProfileUrl = '/auth/profile';
    console.log("AuthAPI Update Profile URL:", `${API_BASE_URL}${updateProfileUrl}`);
    console.log("AuthAPI Update Profile payload:", userData);
    return makeAuthenticatedRequest(updateProfileUrl, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },
};

// Employee APIs working 
export const employeeAPI = {
  getDashboard: async () => {
    return makeAuthenticatedRequest('/employee/dashboard');
  },

  getProfile: async () => {
    return makeAuthenticatedRequest('/employee/profile');
  },

  updateProfile: async (profileData: any) => {
    return makeAuthenticatedRequest('/employee/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },

  updateLocation: async (locationData: any) => {
    return makeAuthenticatedRequest('/employee/location', {
      method: 'POST',
      body: JSON.stringify(locationData),
    });
  },

  updateStatus: async (statusData: any) => {
    return makeAuthenticatedRequest('/employee/status', {
      method: 'PUT',
      body: JSON.stringify(statusData),
    });
  },

  getAnalytics: async () => {
    return makeAuthenticatedRequest('/employee/analytics');
  },

  clockIn: async () => {
    return makeAuthenticatedRequest('/employee/clock-in', { method: 'POST' });
  },

  clockOut: async () => {
    return makeAuthenticatedRequest('/employee/clock-out', { method: 'POST' });
  },
};

// Company APIs
export const companyAPI = {
  getDashboard: async () => {
    return makeAuthenticatedRequest('/company/dashboard');
  },

  getEmployees: async () => {
    return makeAuthenticatedRequest('/company/employees');
  },

  getAnalytics: async () => {
    return makeAuthenticatedRequest('/company/analytics');
  },

  getReports: async () => {
    return makeAuthenticatedRequest('/company/reports');
  },
};

// Admin APIs
export const adminAPI = {
  getUsers: async (params?: { page?: number; limit?: number; role?: string; search?: string }) => {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    const queryString = queryParams.toString();
    return makeAuthenticatedRequest(`/users${queryString ? `?${queryString}` : ''}`);
  },

  getUserById: async (id: string) => {
    return makeAuthenticatedRequest(`/users/${id}`);
  },

  createUser: async (userData: any) => {
    return makeAuthenticatedRequest('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  updateUser: async (id: string, userData: any) => {
    return makeAuthenticatedRequest(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },

  deleteUser: async (id: string) => {
    return makeAuthenticatedRequest(`/users/${id}`, { method: 'DELETE' });
  },
};

// Analytics APIs
export const analyticsAPI = {
  getOverview: async () => {
    return makeAuthenticatedRequest('/analytics/overview');
  },

  getPerformance: async () => {
    return makeAuthenticatedRequest('/analytics/performance');
  },

  getProductivity: async () => {
    return makeAuthenticatedRequest('/analytics/productivity');
  },

  getReports: async () => {
    return makeAuthenticatedRequest('/analytics/reports');
  },
};

// Backend APIs
export const backendAPI = {
  getSystemStatus: async () => {
    return makeAuthenticatedRequest('/backend/status');
  },

  getLogs: async (params?: { level?: string; limit?: number }) => {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    const queryString = queryParams.toString();
    return makeAuthenticatedRequest(`/backend/logs${queryString ? `?${queryString}` : ''}`);
  },

  getMetrics: async () => {
    return makeAuthenticatedRequest('/backend/metrics');
  },

  getHealth: async () => {
    return makeAuthenticatedRequest('/backend/health');
  },
};

// Dashboard APIs
export const dashboardAPI = {
  getDashboard: async () => {
    return makeAuthenticatedRequest('/dashboard');
  },

  getStats: async () => {
    return makeAuthenticatedRequest('/dashboard/stats');
  },

  getNotifications: async () => {
    return makeAuthenticatedRequest('/dashboard/notifications');
  },

  markNotificationAsRead: async (notificationId: string) => {
    return makeAuthenticatedRequest('/dashboard/notifications/read', {
      method: 'POST',
      body: JSON.stringify({ notificationId }),
    });
  },
};

export { API_BASE_URL };
