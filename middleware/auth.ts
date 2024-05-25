import { useAuthStore } from '../stores/auth'; // Assuming your store is in store/auth.js
import { navigateTo } from 'nuxt/app'; // Import navigateTo helper

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();

  if (!authStore.isLoggedIn) {
    return navigateTo('/login'); // Redirect to login page if not logged in
  }
});
