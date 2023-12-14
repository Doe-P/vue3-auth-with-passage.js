<template>
  <div class="w-full h-screen flex flex-col items-center justify-center">
    <div class="w-3/12 p-6 rounded-md bg-white flex flex-col items-center shadow-sm">
      <h1 class="text-3xl font-bold text-slate-700">Register</h1>
      <form class="w-full">
        <label class="block">
          <span class="block text-sm font-medium text-slate-700 mb-1">Email / Phone</span>
          <input type="email" v-model="auth.identifier" class="px-3 py-2 w-full block bg-white border border-slate-300 rounded-md text-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                 placeholder="user@example.com">
        </label>
        <button type="button" @click="onRegister" class="px-3 py-2 bg-sky-500 w-full rounded-md text-white transition-all hover:bg-sky-600 mt-6">Submit</button>
      </form>
      <span class="mt-6">Already have an account? <router-link class="text-sm text-gray-800 font-bold underline" :to="{name:'login'}">Login here</router-link></span>
    </div>
  </div>
</template>

<script setup>
import {useAuth} from "../store/useAuth.js";

const auth = useAuth();

const onRegister = async () => {
  if(!!auth.identifier){
    await auth.onSubmit();
  }
}
</script>

