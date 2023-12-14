<template>
  <Loading v-if="auth.isLoading" message="Checking ..."/>
  <div>
    <router-view/>
  </div>
</template>
<script setup>
import {useAuth} from "./store/useAuth.js";
import Loading from "./components/Loading.vue";
const auth = useAuth();

</script>
