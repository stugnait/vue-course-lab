import { defineStore } from 'pinia';
import { ref } from 'vue';
import { fetchProducts, fetchProductById, fetchCategories } from '@/api/products';
import type { Product, Category } from '@/types/Product';

export const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>([]);
  const product = ref<Product | null>(null);
  const categories = ref<Category[]>([]);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);


  const getAllProducts = async (params?: any) => {
    loading.value = true;
    error.value = null;
    try {
      const data = await fetchProducts(params);
      if (Array.isArray(data)) {
        products.value = data;
        console.log('Всі продукти:', products.value); // Логування для перевірки
      } else {
        throw new Error('Отримані дані не є масивом.');
      }
    } catch (err: any) {
      error.value = err.message || 'Не вдалося завантажити продукти.';
      console.error('Помилка при завантаженні продуктів:', err);
    } finally {
      loading.value = false;
    }
  };

  const getProductById = async (id: number) => {
    loading.value = true;
    error.value = null;
    try {
      const data = await fetchProductById(id);
      product.value = data;
      console.log('Отриманий продукт:', product.value); // Логування для перевірки
    } catch (err: any) {
      error.value = err.message || 'Не вдалося завантажити продукт.';
      console.error('Помилка при завантаженні продукту:', err);
    } finally {
      loading.value = false;
    }
  };


  const getAllCategories = async () => {
    loading.value = true;
    error.value = null;
    try {
      const data = await fetchCategories();
      if (Array.isArray(data)) {
        categories.value = data;
        console.log('Всі категорії:', categories.value); // Логування для перевірки
      } else {
        throw new Error('Отримані категорії не є масивом.');
      }
    } catch (err: any) {
      error.value = err.message || 'Не вдалося завантажити категорії.';
      console.error('Помилка при завантаженні категорій:', err);
    } finally {
      loading.value = false;
    }
  };

  return {
    products,
    product,
    categories,
    loading,
    error,
    getAllProducts,
    getProductById,
    getAllCategories,
  };
});
