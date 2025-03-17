<script setup lang="ts">
import { RouterView } from 'vue-router'

import { useMainStore } from '@/stores/MainStore.ts'
import type { NavLinkProps } from '@phila/phila-ui-nav-link';
const MainStore = useMainStore();

if (!import.meta.env.VITE_PUBLICPATH) {
  MainStore.publicPath = '/';
} else {
  MainStore.publicPath = import.meta.env.VITE_PUBLICPATH;
}

const links: NavLinkProps = [
  {
    type: 'native',
    href: 'https://phila.formstack.com/forms/property_feedback_form' as RouteLocationRaw,
    text: 'Feedback',
    attrs: {
      target: '_blank',
    } as Record<PropertyKey, unknown>,
  }
];

</script>

<template>
  <a
    href="#main"
    class="skip-to-main-content-link"
  >Skip to main content</a>

  <app-header
    app-title="Property"
    app-link="/"
    :is-sticky="true"
    :is-fluid="true"
  >
    <!-- <template #mobile-nav>
      <mobile-nav :links="links" />
    </template>
    <template #lang-selector-nav>
      <lang-selector
        v-show="MainStore.currentTopic == 'voting'"
        :languages="languages"
      />
    </template> -->
  </app-header>

  <RouterView />

  <!-- FOOTER -->
  <app-footer
    :is-sticky="true"
    :is-hidden-mobile="true"
    :links="links"
  />
</template>

<style scoped>

</style>
