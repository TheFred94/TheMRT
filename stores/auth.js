import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loginError: false, // Added loginError state
  }),
  actions: {
    async login(email, password) {
      const users = await $fetch('/users.json');
      console.log('Users', users);
      console.log('email:', email, 'password:', password);

      const user = users.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        console.log('true');
        this.user = user;
        this.loginError = false; // Reset loginError on successful login
        console.log(user);
        navigateTo('/mission-report');
      } else {
        console.log('false');
        this.loginError = true; // Set a loginError state for invalid credentials
        console.log(user);
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
