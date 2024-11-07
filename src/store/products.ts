import { defineStore } from 'pinia';
import { getProducts, getProductById } from '@/api/endpoints/products';
import { getCategories } from '@/api/endpoints/categories';
import type { Product } from '@/types/products';
import type { Category } from '@/types/category';

export const useProductsStore = defineStore('products', {
    state: () => ({
        products: [] as Product[],
        categories: [] as Category[],
        totalPages: 0,
        loading: false,
        error: null as string | null,
    }),
    actions: {
        async fetchProducts(params: Record<string, any> = {}) {
            this.loading = true;
            this.error = null;
            try {
                const products = await getProducts(params);
                this.products = products;
                this.totalPages = Math.ceil(products.length / params.limit || 10);
            } catch (error: any) {
                this.error = error.message;
            } finally {
                this.loading = false;
            }
        },
        async fetchProductById(id: number) {
            this.loading = true;
            this.error = null;
            try {
                return await getProductById(id);
            } catch (error: any) {
                this.error = error.message;
                return null;
            } finally {
                this.loading = false;
            }
        },
        async fetchCategories() {
            this.loading = true;
            this.error = null;
            try {
                const categories = await getCategories();
                this.categories = categories;
            } catch (error: any) {
                this.error = error.message;
            } finally {
                this.loading = false;
            }
        },
    },
    getters: {
        getProductById: (state) => (id: number) => {
            return state.products.find((product) => product.id === id) || null;
        },
    },
});