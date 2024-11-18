import axios from 'axios';
import type { Product, Category } from '../types/Product';

const API_URL = 'https://api.escuelajs.co/api/v1';


export const fetchProducts = async (params?: any): Promise<Product[]> => {
  try {
    const response = await axios.get<Product[]>(`${API_URL}/products`, { params });
    console.log('fetchProducts response:', response.data); // Логування відповіді
    return response.data;
  } catch (error) {
    console.error('fetchProducts помилка:', error);
    throw error;
  }
};


export const fetchProductById = async (id: number): Promise<Product> => {
  try {
    const response = await axios.get<Product>(`${API_URL}/products/${id}`);
    console.log('fetchProductById response:', response.data); // Логування відповіді
    return response.data;
  } catch (error) {
    console.error('fetchProductById помилка:', error);
    throw error;
  }
};


export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await axios.get<Category[]>(`${API_URL}/categories`);
    console.log('fetchCategories response:', response.data); // Логування відповіді
    return response.data;
  } catch (error) {
    console.error('fetchCategories помилка:', error);
    throw error;
  }
};
