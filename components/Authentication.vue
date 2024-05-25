<template>
  <div class="flex h-lvh flex-1 flex-col justify-center px-6 py-12 lg:px-8">
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
      class="bg-Sc mt-10 sm:mx-auto sm:w-full sm:max-w-sm p-8 rounded-lg border-solid border-St border-2"
    >
      <form
        class="space-y-6"
        @submit.prevent="login"
      >
        <div>
          <label
            for="email"
            class="block text-Tx leading-6"
            >Email address</label
          >
          <div class="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required=""
              class="block bg-TxGray10 w-full rounded-md border-0 py-1.5 text-Txring-inset ring-gray-300 placeholder:text-Tx focus:ring-2 focus:ring-inset focus:ring-Tx sm:leading-6"
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

            <!-- FIXME Skal denne være der? -->
            <!-- <div class="">
              <a
                href="#"
                class="text-sm text-TxGray hover:text-Tx"
                >Forgot password?</a
              >
            </div> -->
          </div>
          <div class="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required=""
              class="block bg-TxGray10 w-full rounded-md border-0 py-1.5 text-Tx ring-inset ring-gray-300 placeholder:text-TxGray focus:ring-2 focus:ring-inset focus:ring-Tx sm:leading-6"
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
// const username = ref('');
// const password = ref('');

async function login() {
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
  } else {
    console.log('false');
  }
}
</script>

<style></style>
