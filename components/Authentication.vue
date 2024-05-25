<template>
  <div class="flex h-screen flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="mx-auto h-10 w-auto"
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company"
      />
      <h2
        class="font-header2 mt-10 text-center leading-9 tracking-tight text-gray-900"
      >
        Sign in to MRT
      </h2>
    </div>

    <div
      :class="{ 'bg-Sc': !loggedIn.value, 'bg-green-500': loggedIn.value }"
      class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm p-8 rounded-lg border-solid border-St border-2"
    >
      <form
        class="space-y-6"
        @submit.prevent="login"
      >
        <div>
          <div>
            <h4>
              {{ hasLoginError ? 'Wrong credentials' : 'Enter credentials' }}
            </h4>
          </div>
        </div>
        <div>
          <label
            for="email"
            class="block text-Tx leading-6"
            >Email address</label
          >
          <div class="mt-2">
            <input
              v-model="email"
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              :class="{
                'border-solid border-2 border-color-Tp block text-Tx bg-TxGray10 w-full rounded-md py-1.5 ring-inset ring-gray-300 placeholder:text-TxGray focus:ring-2 focus:ring-inset focus:ring-Tx sm:leading-6': true,
                'border-invalid': hasLoginError,
              }"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block leading-6 text-Tx"
              >Password</label
            >
          </div>
          <div class="mt-2">
            <input
              v-model="password"
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              :class="{
                'border-solid border-2 border-color-Tp block text-Tx bg-TxGray10 w-full rounded-md py-1.5 ring-inset ring-gray-300 placeholder:text-TxGray focus:ring-2 focus:ring-inset focus:ring-Tx sm:leading-6': true,
                'border-invalid': hasLoginError,
              }"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex font-paragraphAc w-full justify-center rounded-md bg-Ac px-3 py-1.5 text-sm font-semibold leading-6 text-Sc hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'Vue'; // Import necessary functions from Vue
import { useAuthStore } from '/stores/auth'; // Import the auth store

const email = ref('');
const password = ref('');
const loggedIn = ref(false);

const authStore = useAuthStore();

const isLoggedIn = computed(() => authStore.isLoggedIn);
const hasLoginError = computed(() => authStore.hasLoginError);

async function login() {
  await authStore.login(email.value, password.value);
  loggedIn.value = isLoggedIn.value; // Update loggedIn after login attempt
}
</script>

<style></style>
