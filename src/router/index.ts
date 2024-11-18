import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ProductView from '../views/ProductView.vue';
import CartView from '../views/CartView.vue';
import FavoritesView from '../views/FavoritesView.vue';
import NotFoundView from '../views/NotFoundView.vue';

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/product/:id', name: 'Product', component: ProductView, props: true },
  { path: '/cart', name: 'Cart', component: CartView },
  { path: '/favorites', name: 'Favorites', component: FavoritesView },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundView },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
