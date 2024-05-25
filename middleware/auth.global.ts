import { useAuthStore } from '../stores/auth';
import { navigateTo } from 'nuxt/app';

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  if (!authStore.isLoggedIn && to.path !== '/login') {
    // Check if user is not logged in and not already on login page
    return navigateTo('/login'); // Redirect to login page
  }
});
