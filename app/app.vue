/**
 * @file Main application component that serves as the root of the Nuxt application.
 * @description This component provides the base layout structure and essential Nuxt features.
 * It includes accessibility announcements, loading indicators, and layout management.
 */
<script lang="ts" setup>
import { useHead } from '#imports'

// Define any app-level composables or state here if needed
useHead({
  htmlAttrs: {
    lang: 'en',
    class: 'h-full'
  },
  bodyAttrs: {
    class: 'h-full'
  }
})
</script>

<template>
  <div id="app" class="min-h-full">
    <!-- Accessibility route announcer for screen readers -->
    <NuxtRouteAnnouncer />
    
    <!-- Global loading indicator -->
    <NuxtLoadingIndicator 
      color="var(--color-brand)" 
      :height="2" 
      class="z-50"
    />
    
    <!-- Main layout wrapper -->
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
/* Global styles that should be available throughout the app */
:root {
  --color-brand: #00DC82;
}

html {
  scroll-behavior: smooth;
}

/* Ensure proper height inheritance */
#__nuxt {
  height: 100%;
}
</style>
