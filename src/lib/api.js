// API utility functions for frontend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

// Products API
export const productsAPI = {
    // Get all products with filters
    getAll: async (params = {}) => {
        const queryParams = new URLSearchParams(params).toString();
        const url = `${API_BASE_URL}/api/products${queryParams ? `?${queryParams}` : ''}`;

        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
    },

    // Get single product
    getById: async (id) => {
        const res = await fetch(`${API_BASE_URL}/api/products/${id}`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch product');
        return res.json();
    },

    // Get featured products
    getFeatured: async () => {
        return productsAPI.getAll({ featured: 'true', limit: 6 });
    },

    // Get best selling products
    getBestSelling: async () => {
        return productsAPI.getAll({ bestSelling: 'true', limit: 8 });
    },

    // Search products
    search: async (query) => {
        return productsAPI.getAll({ search: query });
    },

    // Get by category
    getByCategory: async (category) => {
        return productsAPI.getAll({ category });
    },
};

// Orders API
export const ordersAPI = {
    // Create new order (ghost checkout - no auth required)
    create: async (orderData) => {
        const res = await fetch(`${API_BASE_URL}/api/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData),
        });

        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.error || 'Failed to create order');
        }

        return res.json();
    },

    // Get user orders (optional - if logged in)
    getAll: async () => {
        const res = await fetch(`${API_BASE_URL}/api/orders`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch orders');
        return res.json();
    },
};

// Reviews API
export const reviewsAPI = {
    // Get reviews for a product
    getByProduct: async (productId) => {
        const res = await fetch(`${API_BASE_URL}/api/reviews/${productId}`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch reviews');
        return res.json();
    },

    // Create review
    create: async (reviewData) => {
        const res = await fetch(`${API_BASE_URL}/api/reviews`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reviewData),
        });

        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.error || 'Failed to create review');
        }

        return res.json();
    },
};

// Newsletter API
export const newsletterAPI = {
    // Subscribe to newsletter
    subscribe: async (email) => {
        const res = await fetch(`${API_BASE_URL}/api/newsletter`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });

        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.error || 'Failed to subscribe');
        }

        return res.json();
    },
};

// Contact API
export const contactAPI = {
    // Submit contact form
    submit: async (contactData) => {
        const res = await fetch(`${API_BASE_URL}/api/contact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(contactData),
        });

        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.error || 'Failed to send message');
        }

        return res.json();
    },
};
