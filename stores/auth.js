import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
  }),
  actions: {
    async login(email, password) {
      const users = await $fetch('/users.json');
      console.log('submitted');

      console.log('users', users);

      const user = users.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        console.log('true');
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
