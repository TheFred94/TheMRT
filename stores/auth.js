import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
  }),
  actions: {
    async login(email, password) {
      const users = await $fetch('/users.json');
      console.log('submitted');
      console.log('username', email.value);
      console.log('password', password.value);
      console.log('users', users);

      const user = users.find(
        (user) => user.email === email.value && user.password === password.value
      );

      if (user) {
        console.log('true');
        navigateTo('/mission-report');
      } else {
        console.log('false');
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
  },
});
