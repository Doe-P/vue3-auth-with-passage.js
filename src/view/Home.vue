<template>
  <div class="w-full bg-white shadow-md px-6 py-3 flex flex-row justify-between items-center">
    <h1 class="text-3xl text-gray-800 font-bold">Home page</h1>
    <span class="text-xl text-gray-800 font-bold">Vue3 + Passage.js</span>
  </div>
  <div class="w-full my-6 flex flex-col justify-center items-center">
    <div class="p-6 rounded-md shadow-sm bg-white w-6/12">
      <div class="w-full flex flex-row justify-between items-center">
        <h2 class="text-xl font-medium text-gray-800">User details</h2>
        <button class="px-3 py-1 rounded-md bg-sky-100 text-sky-500 border border-sky-500 transition-all hover:bg-sky-500 hover:text-white"
                type="button"
                @click="logout">
          Logout
        </button>
      </div>
      <div v-if="!!user" class="mt-6 flex flex-col gap-4">
        <div class="w-full flex flex-row gap-10 items-center">
          <h4 class="text-md text-gray-600 font-medium">Email</h4>
          <span class="text-sm text-gray-600 font-normal">{{ !!user.email ? user.email : 'N/A' }}</span>
        </div>
        <div class="w-full flex flex-row gap-10 items-center">
          <h4 class="text-md text-gray-600 font-medium">Phone</h4>
          <span class="text-sm text-gray-600 font-normal">{{ !!user.phone ? user.phone : 'N/A' }}</span>
        </div>
        <div class="w-full flex flex-row gap-10 items-center">
          <h4 class="text-md text-gray-600 font-medium">User ID</h4>
          <span class="text-sm text-gray-600 font-normal">{{ user.id }}</span>
        </div>
        <div class="w-full flex flex-row gap-10 items-center">
          <h4 class="text-md text-gray-600 font-medium">Last Login</h4>
          <span class="text-sm text-gray-600 font-normal">{{ formatted(user.last_login_at) }}</span>
        </div>
        <div class="w-full flex flex-row gap-10 items-center">
          <h4 class="text-md text-gray-600 font-medium">Status</h4>
          <span class="text-sm text-gray-600 font-normal">{{ user.status }}</span>
        </div>
      </div>
      <div v-if="devices.length > 0" class="mt-4">
        <h2 class="text-xl font-medium text-gray-800 my-4">Pass keys</h2>
        <devices-list :items="devices"/>
      </div>
      <span v-if="!user && devices.length === 0" class="text-md font-bold text-gray-800">Data Empty</span>
    </div>
  </div>
</template>

<script setup>
import {useAuth} from "../store/useAuth.js";
import {computed, onMounted} from "vue";
import DevicesList from "../components/DevicesList.vue";
import {formatted} from "../utils/index.js";

const auth = useAuth();
const user = computed(() => auth.userInfoData);
const devices = computed(() => auth.getDevices);

const logout = async () => {
  await auth.logout();
}

onMounted(async () => {
  await auth.getUserInfo();
  await auth.fetchDevices();
})
</script>

