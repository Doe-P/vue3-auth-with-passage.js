<template>
  <div class="w-full h-screen flex flex-col items-center justify-center">
    <div class="lg:w-3/12 w-full p-6 rounded-md bg-white flex flex-col items-center shadow-sm">
      <h1 class="text-3xl font-bold text-slate-700">Login</h1>
      <div v-if="!!userInfo && !!userInfo.email" class="flex flex-col items-center text-slate-500 text-sm mt-6">
        <span>Welcome back!! Login as </span>
        <span class="text-md text-gray-800 font-bold">{{userInfo.email}}</span>
        <button type="button" @click="login" class="px-3 py-2 rounded-md bg-sky-500 text-white mt-8 hover:bg-sky-600">Login</button>
      </div>
      <form class="w-full" v-else>
        <label class="block">
          <span class="block text-sm font-medium text-slate-700 mb-1">Email / Phone</span>
          <input type="email" v-model="auth.identifier" class="px-3 py-2 w-full block bg-white border border-slate-300 rounded-md text-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                 placeholder="user@example.com">
        </label>
        <button type="button" @click="login" class="px-3 py-2 bg-sky-500 w-full rounded-md text-white transition-all hover:bg-sky-600 mt-6">Submit</button>
      </form>
      <span class="mt-6">Already have an account? <router-link class="text-sm text-gray-800 font-bold underline" :to="{name:'register'}">Register here</router-link></span>
    </div>
  </div>
</template>

<script setup>
import {useAuth} from "../store/useAuth.js";
import {computed, onMounted} from "vue";
const auth = useAuth();

const userInfo = computed(() => auth.userInfoData);

const login = async () => {
  if(!!userInfo.value.email){
    auth.identifier = userInfo.value.email;
  }
  if(!!auth.identifier){
    await auth.onSubmit();
  }
}

onMounted(async () => {
   await auth.getUserInfo();
})
</script>

