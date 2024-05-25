import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
  }),
  actions: {
    async login(email, password) {
      const users = await $fetch('/users.json');

      const user = users.find(
        (user) => user.email === email.value && user.password === password.value
      );

      if (user) {
        this.user = user;
        navigateTo('/mission-report');
      } else {
        this.loginError = true; // Set a loginError state for invalid credentials
      }
    },
    logout() {
      this.user = null;
      // Handle logout logic (e.g., remove tokens, redirect to login)
    },
  },
  getters: {
    isLoggedIn() {
      return this.user !== null;
    },
    hasLoginError() {
      return this.loginError;
    },
  },
});
