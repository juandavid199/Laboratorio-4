const API_BASE_URL = 'http://localhost:8080/api/v1';

async function handleResponse(response) {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Error HTTP ${response.status}: ${response.statusText}`);
  }
  return response.json();
}

export const api = {
  // Dashboard
  async getDashboardSummary() {
    const res = await fetch(`${API_BASE_URL}/dashboard/summary`);
    return handleResponse(res);
  },

  // Products
  async getProducts(params = {}) {
    const query = new URLSearchParams();
    if (params.search) query.append('search', params.search);
    if (params.category && params.category !== 'ALL') query.append('category', params.category);
    const url = `${API_BASE_URL}/products${query.toString() ? `?${query.toString()}` : ''}`;
    const res = await fetch(url);
    return handleResponse(res);
  },

  async getCriticalProducts() {
    const res = await fetch(`${API_BASE_URL}/products/critical`);
    return handleResponse(res);
  },

  async getOver90DaysProducts() {
    const res = await fetch(`${API_BASE_URL}/products/over90days`);
    return handleResponse(res);
  },

  async updateStock(productId, newStock) {
    const res = await fetch(`${API_BASE_URL}/products/${productId}/stock`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newStock: Number(newStock) })
    });
    return handleResponse(res);
  },

  // Suppliers
  async getSuppliers() {
    const res = await fetch(`${API_BASE_URL}/suppliers`);
    return handleResponse(res);
  },

  // Reorder
  async getReorderSuggestions() {
    const res = await fetch(`${API_BASE_URL}/reorder/suggestions`);
    return handleResponse(res);
  },

  async approveOrderSuggestion(notes = 'Aprobado desde UI de Cierre') {
    const res = await fetch(`${API_BASE_URL}/reorder/approve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notes })
    });
    return handleResponse(res);
  },

  async getHistoricalOrders() {
    const res = await fetch(`${API_BASE_URL}/reorder/orders`);
    return handleResponse(res);
  }
};

