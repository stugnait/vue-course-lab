import axios from 'axios';
import type { Product } from '@/types/products';

const BASE_URL = 'https://api.escuelajs.co/api/v1';

export const getProducts = async (params: Record<string, any> = {}): Promise<Product[]> => {
    try {
        const response = await axios.get(`${BASE_URL}/products`, { params });
        return response.data;
    } catch (error: any) {
        console.error('Error fetching products:', error);
        throw new Error(error.response?.data?.message || 'Failed to fetch products');
    }
};

export const getProductById = async (id: number): Promise<Product> => {
    try {
        const response = await axios.get(`${BASE_URL}/products/${id}`);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching product details:', error);
        throw new Error(error.response?.data?.message || 'Failed to fetch product details');
    }
};