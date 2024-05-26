import { defineNuxtRouteMiddleware } from 'nuxt/app';

import { useAuthStore } from '../stores/auth';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const token = useCookie('token');
  const authStore = useAuthStore();

  if (token.value) {
    try {
      const response = await $fetch('/api/verify-token', {
        method: 'POST',
        body: { token: token.value },
      });

      if (response.valid) {
        authStore.authenticated = true;
      } else {
        authStore.authenticated = false;
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      authStore.authenticated = false;
    }
  } else {
    authStore.authenticated = false;
  }

  if (!authStore.authenticated && to.name !== 'login') {
    return navigateTo('/login');
  }

  if (authStore.authenticated && to.name === 'login') {
    return navigateTo('/mission-report');
  }
});
