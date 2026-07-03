import api from './api';

export const authService = {
  async register(data: { email: string; password: string; firstName: string; lastName: string }) {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  async login(email: string, password: string) {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.token) {
      typeof window !== 'undefined' && localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  async logout() {
    typeof window !== 'undefined' && localStorage.removeItem('token');
  },

  async getCurrentUser() {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

export const crmService = {
  async getLeads() {
    const response = await api.get('/crm/leads');
    return response.data.leads;
  },

  async createLead(data: any) {
    const response = await api.post('/crm/leads', data);
    return response.data;
  },

  async updateLead(id: string, data: any) {
    const response = await api.put(`/crm/leads/${id}`, data);
    return response.data;
  },
};

export const bookingService = {
  async getBookings() {
    const response = await api.get('/bookings');
    return response.data.bookings;
  },

  async createBooking(data: any) {
    const response = await api.post('/bookings', data);
    return response.data;
  },

  async updateBookingStatus(id: string, status: string) {
    const response = await api.patch(`/bookings/${id}/status`, { status });
    return response.data;
  },
};

export const paymentService = {
  async createOrder(amount: number, bookingId: string) {
    const response = await api.post('/payments/orders', { amount, bookingId });
    return response.data;
  },

  async verifyPayment(orderId: string, paymentId: string, signature: string) {
    const response = await api.post('/payments/verify', { orderId, paymentId, signature });
    return response.data;
  },
};