import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

// Імпорт компонентів
import Home from '@/pages/Home.vue';
import Products from '@/pages/Products.vue';
import ProductDetails from '@/pages/ProductDetails.vue';
import Cart from '@/pages/Cart.vue';
import Favorites from '@/pages/Favorites.vue';
import Checkout from '@/pages/Checkout.vue';
import OrderConfirmation from '@/pages/OrderConfirmation.vue';
import NotFound from '@/pages/NotFound.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/products',
        name: 'Products',
        component: Products,
    },
    {
        path: '/products/:category',
        name: 'ProductCategory',
        component: Products,
        props: true,
    },
    {
        path: '/products/:category/:id',
        name: 'ProductDetails',
        component: ProductDetails,
        props: true,
    },
    {
        path: '/cart',
        name: 'Cart',
        component: Cart,
    },
    {
        path: '/favorites',
        name: 'Favorites',
        component: Favorites,
    },
    {
        path: '/checkout',
        name: 'Checkout',
        component: Checkout,
    },
    {
        path: '/order-confirmation',
        name: 'OrderConfirmation',
        component: OrderConfirmation,
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 };
    },
});

export default router;
