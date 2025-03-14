<script setup lang="ts">

import { useMapStore } from '@/stores/MapStore.ts'
const MapStore = useMapStore();
import Map from '@/components/map/Map.vue';

import { computed } from 'vue';

const mapPanelClass = computed(() => {
  if (MapStore.cyclomediaOn || MapStore.eagleviewOn) {
    return 'map-panel cyclomedia-eagleview';
  } else {
    return 'map-panel';
  }
});

</script>

<template>
  <div
    id="map-panel"
    :class="mapPanelClass"
  >
    <Map />
  </div>
</template>

<style>

</style>