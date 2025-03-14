<script setup lang="ts">

import { computed } from 'vue';

import { useGeocodeStore } from '@/stores/GeocodeStore.ts'
const GeocodeStore = useGeocodeStore();


const test = computed(() => {
  return GeocodeStore.aisData2;
});

</script>

<template>
  <div>
    <p>{{ test }}</p>
  </div>
</template>