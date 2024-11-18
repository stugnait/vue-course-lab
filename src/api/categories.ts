import axios from 'axios';
import type { Category } from '../types/Product';

const API_URL = 'https://api.escuelajs.co/api/v1';

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await axios.get<Category[]>(`${API_URL}/categories`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

