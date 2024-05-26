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
      class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm p-8 rounded-lg border-solid border-St border-2"
    >
      <form
        class="space-y-6"
        @submit.prevent="login"
      >
        <div>
          <div>
            <h4
              v-if="hasLoginError"
              :key="shakeKey"
              class="text-Wa shake"
            >
              Wrong credentials
            </h4>
            <h4 v-else>Enter credentials</h4>
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
              :model.sync="clearInputs"
              :key="shakeKey"
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              :class="{
                'border-solid border-2 border-color-Tp block text-Tx bg-TxGray10 w-full rounded-md py-1.5 ring-inset ring-gray-300 placeholder:text-TxGray focus:ring-2 focus:ring-inset focus:ring-Tx sm:leading-6': true,
                'border-invalid shake': hasLoginError,
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
              :model.sync="clearInputs"
              :key="shakeKey"
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              :class="{
                'border-solid border-2 border-color-Tp block text-Tx bg-TxGray10 w-full rounded-md py-1.5 ring-inset ring-gray-300 placeholder:text-TxGray focus:ring-2 focus:ring-inset focus:ring-Tx sm:leading-6': true,
                'border-invalid shake': hasLoginError,
              }"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="group flex border-solid border-2 border-color-Tp font-paragraphAc w-full justify-center rounded-md bg-Ac px-3 py-1.5 leading-6 text-Sc hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-Sc pt-2 pb-2 mt-10 hover:-Sc hover:bg-Sc hover:border-St hover:border-solid hover:border-2 transition-all hover:text-Tx"
          >
            <span class="pr-2">Lift off!</span>
            <RocketLaunchIcon
              class="size-6 text-Sc group-hover:text-Tx transition-all"
            />
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import { useAuthStore } from '/stores/auth';
import { RocketLaunchIcon } from '@heroicons/vue/24/outline';

const email = ref('');
const password = ref('');
const loggedIn = ref(false);
const authStore = useAuthStore();
const isLoggedIn = computed(() => authStore.isLoggedIn);
const hasLoginError = computed(() => authStore.hasLoginError);

const shakeKey = ref(0); // Define a key to force re-render

async function login() {
  console.log('Login', email.value, password.value);
  await authStore.login(email.value, password.value);

  if (hasLoginError.value) {
    clearInputs(); // Clear inputs on error
    shakeKey.value += 1;
  }

  loggedIn.value = isLoggedIn.value; // Update loggedIn after login attempt
}

function clearInputs() {
  email.value = '';
  password.value = '';
}
</script>

<style></style>
