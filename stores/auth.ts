import { defineStore } from 'pinia';
import { useCookie } from 'nuxt/app';

interface User {
  email: string;
  password: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    loginError: false,
    authenticated: false,
  }),
  actions: {
    async authenticateUser(email: string, password: string) {
      try {
        const response = await $fetch('/api/login', {
          method: 'POST',
          body: { email, password },
        });

        if (response) {
          const token = useCookie('token');

          this.authenticated = true;
          this.user = { email };
          this.loginError = false;

          // TODO change this to the correct values
          localStorage.setItem(
            'userData',
            JSON.stringify({
              id: this.user.id,
              first_name: this.user.first_name, // Use optional chaining
              last_name: this.user.last_name,
              code_name: this.user.code_name,
              username: this.user.username,
              avatar: this.user.avatar,
            })
          );
          navigateTo('/mission-report');
          console.log('Redirect');
        } else {
          this.loginError = true;
        }
      } catch (error) {
        console.error('Authentication error:', error);
        this.loginError = true;
      }
    },

    logout() {
      const token = useCookie('token');

      localStorage.removeItem('userData');
      this.user = null;
      this.authenticated = false;
      navigateTo('/login');
    },
  },
  getters: {
    isLoggedIn(state) {
      return state.user !== null;
    },
    hasLoginError(state) {
      return state.loginError;
    },
  },
});
