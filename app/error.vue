<!-- Custom error page for better error handling and shorter titles -->
<script setup lang="ts">
import { useHead } from "#imports";

// Get the error from props
const props = defineProps<{
  error: Error & {
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
  clearError();
  navigateTo("/");
};

const handleRetry = () => {
  clearError();
};
</script>

<template>
  <div
    class="bg-background flex min-h-screen items-center justify-center px-4 py-16 sm:px-6 sm:py-24 md:grid-cols-2 lg:px-8"
  >
    <div class="mx-auto max-w-max">
      <main class="sm:flex">
        <p class="text-primary text-4xl font-bold tracking-tight sm:text-5xl">
          {{ error?.statusCode || "404" }}
        </p>

        <div class="sm:ml-6">
          <div class="sm:border-l sm:border-gray-200 sm:pl-6">
            <h1 class="text-4xl font-bold tracking-tight sm:text-5xl">
              {{ error?.statusMessage || "Page not found" }}
            </h1>

            <p class="mt-3 text-base">
              {{
                error?.message ||
                "Sorry, we couldn't find the page you're looking for."
              }}
            </p>
          </div>

          <div
            class="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6"
          >
            <button
              type="button"
              class="bg-primary hover:bg-primary/90 focus:ring-primary inline-flex items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
              @click.prevent="handleError"
            >
              Go back home
            </button>

            <button
              type="button"
              class="bg-primary/10 text-primary hover:bg-primary/20 focus:ring-primary inline-flex items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2"
              @click.prevent="handleRetry"
            >
              Try again
            </button>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
