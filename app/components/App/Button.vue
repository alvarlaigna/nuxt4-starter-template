<script lang="ts">
interface Props {
  type?: "button" | "submit" | "reset";
  to?: string;
}
</script>
<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<Props>(), {
  type: "button",
  to: undefined,
});
const attrs = useAttrs();
</script>
<template>
  <button
    v-if="!props.to"
    :type="props.type"
    v-bind="attrs"
    class="inset-ring inset-shadow-sm inset-shadow-white/20 inset-ring-white/15 inline-flex items-center gap-2 rounded-lg bg-brand-500 px-5 py-2 font-medium text-white shadow-md ring ring-brand-500 transition-colors duration-150 hover:bg-brand-100 hover:text-brand-500"
  >
    <slot />
  </button>
  <NuxtLink
    v-else
    :to="props.to"
    v-bind="attrs"
    class="inset-ring inset-shadow-sm inset-shadow-white/20 inset-ring-white/15 inline-flex items-center gap-2 rounded-lg bg-brand-500 px-5 py-2 font-medium text-white shadow-md ring ring-brand-500 transition-colors duration-150 hover:bg-brand-100 hover:text-brand-500"
  >
    <slot />
  </NuxtLink>
</template>
