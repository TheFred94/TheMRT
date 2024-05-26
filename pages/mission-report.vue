<template>
  <header>
    <ul>
      <li class="loginBtn flex">
        <button
          @click="logout"
          class="group flex border-solid border-2 border-color-Tp font-paragraphAc justify-center rounded-md bg-Ac px-3 py-1.5 leading-6 text-Sc hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-Sc pt-2 pb-2 mt-10 hover:-Sc hover:bg-Sc hover:border-St hover:border-solid hover:border-2 transition-all hover:text-Tx ml-4"
        >
          Logout
        </button>
      </li>
    </ul>
  </header>
  <div class="grid grid-cols-2 custom-grid h-lvh">
    <div class="col-span-2 flex flex-col mt-20 items-center">
      <img
        class="inline-block h-16 w-16 rounded-full ring-2 ring-white"
        :src="userData.avatar"
        alt=""
      />
      <h1>
        Hello, <span class="text-Ac">{{ userData.username }}</span>
      </h1>
      <h2 class="h2-alt">Aka."{{ userData.code_name }}"</h2>
    </div>

    <button
      class="group flex row-start-3 col-start-2 border-solid border-2 border-color-Tp font-paragraphAc justify-center rounded-md bg-Ac px-3 py-1.5 leading-6 h-fit w-fit text-Sc hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-Sc pt-2 pb-2 mt-10 hover:-Sc hover:bg-Sc hover:border-St hover:border-solid hover:border-2 transition-all hover:text-Tx ml-4"
    >
      <span class="pr-2">Create new report</span>
      <PlusCircleIcon
        class="size-6 text-Sc group-hover:text-Tx transition-all"
      />
    </button>
    <div class="flex flex-col row-span-5">
      <h3 class="pr-2 h-min ml-12">
        Space reports created by {{ userData.username }}
      </h3>
      <div
        class="flex flex-col rounded-3xl h-full grid-span- row-span bg-Sc border-St border-solid border-2 m-12 gap-8"
      >
        <div
          v-for="(mission, index) in matchingMissions"
          :key="index"
          class="bg-St mt-12 mr-12 ml-12 rounded-lg p-6"
        >
          <h3>{{ mission.mission_name }}</h3>
          <p>{{ mission.mission_description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { PlusCircleIcon } from '@heroicons/vue/24/outline';

// Define a reactive variable to store the parsed data from localStorage
const userData = ref<{ username: string; email: string }>({
  username: '',
  email: '',
});

const matchingMissions = ref([]);

onMounted(() => {
  // Fetch data from localStorage when the component is mounted
  const data = localStorage.getItem('userData');
  if (data) {
    // Parse the JSON string back into an object
    const parsedData = JSON.parse(data);
    // Assign the parsed data to userData
    userData.value = parsedData;
  }

  fetchMissionReports();
});

async function fetchMissionReports() {
  try {
    const response = await fetch('/mission-reports.json');
    if (!response.ok) {
      throw new Error('Failed to load mission reports');
    }
    const data = await response.json();

    // Filter missionData to find objects with matching id
    matchingMissions.value = data.filter(
      (mission) => mission.id === userData.value.id
    );

    // Log the matching objects (optional)
    console.log('matching missions', matchingMissions.value);
  } catch (error) {
    console.error(error);
  }
}

console.log('matching missions', matchingMissions); // This will now be an empty array

function logout() {
  useAuthStore().logout();
}
</script>

<style></style>
