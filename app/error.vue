<!-- Custom error page for better error handling and shorter titles -->
<script setup lang="ts">
import { useHead } from "#imports";

// Get the error from props
const props = defineProps<{
  error: {
    statusCode?: number;
    statusMessage?: string;
    message?: string;
  };
}>();

// Set a concise page title
useHead({
  title: `Error ${props.error.statusCode || "404"}`,
});

// Handle clearing the error
const handleError = () => {
  // Clear error and return to home
  clearError({ redirect: "/" });
};
</script>

<template>
  <div
    class="flex min-h-dvh flex-col items-center justify-center p-4 text-center"
  >
    <div class="rounded-lg bg-white/50 p-8 backdrop-blur-sm">
      <h1 class="mb-4 text-4xl font-bold">
        {{ error.statusCode === 404 ? "Page Not Found" : "An Error Occurred" }}
      </h1>
      <p class="mb-4 text-gray-600">
        {{ error.message || error.statusMessage }}
      </p>
      <button
        type="button"
        class="rounded-md bg-brand-600 px-4 py-2 text-white transition hover:bg-brand-700"
        @click="handleError"
      >
        Back to Home
      </button>
    </div>
  </div>
</template>
