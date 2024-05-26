import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loginError: false, // Added loginError state
    authenticated: false,
  }),
  actions: {
    async authenticateUser(email, password) {
      const users = await $fetch('/users.json');

      const user = users.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        const token = useCookie('token');
        token.value = uuidv4(); // set token to cookie
        this.authenticated = true;

        this.user = user;
        this.loginError = false; // Reset loginError on successful login
        localStorage.setItem(
          'userData',
          JSON.stringify({
            id: 1,
            first_name: user.first_name,
            last_name: user.last_name,
            code_name: user.code_name,
            username: user.username,
            avatar: user.avatar,
          })
        );
        navigateTo('/mission-report');
      } else {
        this.loginError = true;
      }
    },

    logout() {
      // Remove the token cookie
      const token = useCookie('token');
      token.value = ''; // Clear the value

      // Remove userData from localStorage
      localStorage.removeItem('userData');

      // Reset user state and authentication status
      this.user = null;
      this.authenticated = false;

      // Redirect to login page
      // Replace 'login' with the route path to your login page
      navigateTo('/login');
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
