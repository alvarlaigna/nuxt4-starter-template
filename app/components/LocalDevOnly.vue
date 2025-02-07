<!--
  @component LocalDevOnly
  @description A development-only debug component that displays content in a styled container.
  This component is only rendered in development mode and is automatically hidden in production.
  
  @example
  <LocalDevOnly>{{ debugData }}</LocalDevOnly>
-->
<script setup lang="ts">
import { computed, withDefaults, defineProps, defineSlots } from "#imports";

// Define component props with TypeScript
interface Props {
  /** Label shown in the debug header */
  label?: string;
  /** Whether to show a border around the debug container */
  showBorder?: boolean;
  /** Custom CSS classes to apply to the container */
  class?: string;
}

// Define props with defaults
const props = withDefaults(defineProps<Props>(), {
  label: "debug",
  showBorder: true,
  class: "",
});

// Computed classes for better performance
const containerClasses = computed(() => [
  "mx-2 my-4 max-w-screen overflow-hidden overflow-x-auto rounded-md bg-white/90 p-4",
  "text-left font-mono text-[10px] text-[black] shadow-sm",
  { "border border-[black]/50": props.showBorder },
  props.class,
]);

// Define type-safe slots
defineSlots<{
  default: () => any;
}>();

// Runtime checks for development mode
const isDev = import.meta.dev;

// Provide warning if used in production
if (!isDev) {
  console.warn(
    "LocalDevOnly component should only be used in development mode"
  );
}
</script>

<template>
  <DevOnly>
    <div
      aria-hidden="true"
      :class="containerClasses"
      data-testid="debug-container"
    >
      <span
        v-if="label"
        class="mb-2 block text-[8px] uppercase text-[black]/50"
        data-testid="debug-label"
      >
        {{ label }}
      </span>
      <pre data-testid="debug-content"><slot /></pre>
    </div>
  </DevOnly>
</template>
