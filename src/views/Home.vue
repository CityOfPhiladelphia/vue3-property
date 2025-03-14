<script setup lang="ts">

import LeftPanel from '@/components/LeftPanel.vue';
import MapPanel from '@/components/MapPanel.vue';

</script>

<template>

  <main
    id="main"
    class="main invisible-scrollbar"
  >
    <!-- LEFT PANEL ON LEFT -->
    <!-- v-if="!isMobileDevice() && MainStore.windowDimensions.width > 768 && !fullScreenMapEnabled" -->
    <div
      class="topics-holder"
    >
    <!-- :class="fullScreenTopicsEnabled ? 'topics-holder-full' : ''" -->
      <left-panel />
    </div>

    <!-- MAP PANEL ON RIGHT - right now only contains the address input -->
    <!-- v-show="!fullScreenTopicsEnabled" -->
    <div
      class="map-panel-holder"
    >
    <!-- :class="fullScreenMapEnabled ? 'topics-holder-full' : ''" -->
      <map-panel />
    </div>

    <!-- <div
      v-if="isMobileDevice() || MainStore.windowDimensions.width <= 768"
      class="topics-holder"
    >
      <topic-panel />
    </div> -->

  </main>

</template>
