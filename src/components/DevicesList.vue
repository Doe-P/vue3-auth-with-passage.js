<template>
  <div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
      <tr>
        <th scope="col" class="px-6 py-3">
          Name
        </th>
        <th scope="col" class="px-6 py-3">
          Uses
        </th>
        <th scope="col" class="px-6 py-3">
          Last Login
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, idx) in items" :key="idx" class="bg-white border-b">
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
          {{item.friendly_name}}
        </th>
        <td class="px-6 py-4">
          {{item.usage_count}}
        </td>
        <td class="px-6 py-4">
          {{formatted(item.created_at)}}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import {formatted} from "../utils/index.js";

const props = defineProps({
  items: {
    type: Array,
    required: true,
  }
});
</script>
