import axios from 'axios';
import type { Category } from '@/types/category';

const BASE_URL = 'https://api.escuelajs.co/api/v1';

export const getCategories = async (): Promise<Category[]> => {
    try {
        const response = await axios.get(`${BASE_URL}/categories`);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching categories:', error);
        throw new Error(error.response?.data?.message || 'Failed to fetch categories');
    }
};