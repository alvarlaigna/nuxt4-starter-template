<script lang="ts" setup>
import { useNuxtApp } from "#imports";
import { computed, watchEffect, onMounted } from "vue";

interface Post {
  id: number;
  title: string;
  body: string;
  content: string;
  author: string;
  createdAt: string;
  userId: number;
}

const { $i18n } = useNuxtApp();
const { t } = $i18n as any; // Type assertion to avoid unknown type error

const {
  data: posts,
  pending,
  error,
  refresh,
} = await useFetch<Post[]>("/api/v1/posts", {
  key: "posts",
  server: true,
  retry: 3,
  timeout: 5000,
  transform: (response) => {
    if (!response || !Array.isArray(response)) {
      console.error("Invalid response format:", response);
      return [];
    }
    return response;
  },
  onResponseError(err) {
    console.error("Error fetching posts:", err);
  },
});

watchEffect(() => {
  if (error.value) {
    console.error("Error in watchEffect:", error.value);
  }
});

const postsToDisplay = computed(() => posts.value?.slice(0, 3) ?? []);

// Add auto-refresh on client side
onMounted(() => {
  if (import.meta.client) {
    refresh();
  }
});

useHead({
  title: "Welcome - Nuxt Starter Template",
  meta: [
    {
      name: "description",
      content:
        "A modern Nuxt 4 starter template with best practices and optimizations built-in",
    },
  ],
});
</script>

<template>
  <main class="flex min-h-dvh flex-col justify-center text-center">
    <div class="container">
      <div class="mb-6 flex justify-center">
        <Icon name="logos:nuxt-icon" size="80" />
      </div>
      <h1 class="mb-6 text-center text-5xl font-bold">{{ t("app.title") }}</h1>
      <p class="text-muted-foreground mb-12">
        {{ t("app.description") }}
      </p>

      <!-- Interactive Components -->
      <ClientOnly>
        <div class="flex flex-wrap justify-center gap-4">
          <DialogModal size="xl" title="Modal title">
            <template #trigger>
              <AppButton>Open Dialog</AppButton>
            </template>
            <p v-for="i in 20" :key="i" class="mb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
              architecto, enim vitae quibusdam culpa facilis assumenda expedita
              aspernatur ut, dolore numquam quidem obcaecati? Dolorem ab ipsa,
              earum voluptate id ullam.
            </p>
            <div
              class="sticky -bottom-8 z-10 -mx-8 -mb-8 flex justify-end rounded-b-lg border-t border-gray-200 bg-white/50 px-8 pb-8 pt-8 backdrop-blur-sm"
            >
              <DialogClose as-child>
                <AppButton>Close</AppButton>
              </DialogClose>
            </div>
          </DialogModal>
          <DialogDrawer title="Drawer title" position="left">
            <template #trigger>
              <AppButton>Left Drawer</AppButton>
            </template>
            <p>Hello, Left Drawer!</p>
          </DialogDrawer>
          <DialogDrawer title="Drawer title" position="bottom">
            <template #trigger>
              <AppButton>Bottom Drawer</AppButton>
            </template>
            <div class="container">
              <p>Hello, Bottom Drawer!</p>
            </div>
          </DialogDrawer>
          <DialogDrawer title="Drawer title" position="right">
            <template #trigger>
              <AppButton>Right Drawer</AppButton>
            </template>
            <p>Hello, Right Drawer!</p>
          </DialogDrawer>
        </div>
      </ClientOnly>

      <!-- Latest Posts -->
      <div class="mx-auto mt-12 max-w-2xl">
        <h2 class="mb-6 text-2xl font-bold">Latest Posts</h2>
        <ClientOnly>
          <div class="space-y-4">
            <template v-if="!pending && postsToDisplay.length > 0">
              <div
                v-for="post in postsToDisplay"
                :key="post.id"
                class="rounded-lg border p-4 text-left transition hover:shadow-sm"
              >
                <h3 class="font-semibold">{{ post.title }}</h3>
                <p class="text-muted-foreground mt-2 line-clamp-2 text-sm">
                  {{ post.content }}
                </p>
                <div
                  class="text-muted-foreground mt-2 flex items-center justify-between text-xs"
                >
                  <span>{{ post.author }}</span>
                  <time :datetime="post.createdAt">
                    {{ new Date(post.createdAt).toLocaleDateString() }}
                  </time>
                </div>
              </div>
            </template>
            <div
              v-else-if="pending"
              class="space-y-4"
              role="status"
              aria-label="Loading posts"
            >
              <div
                v-for="n in 3"
                :key="n"
                class="animate-pulse rounded-lg border p-4"
              >
                <div class="bg-muted h-5 w-3/4 rounded"></div>
                <div class="mt-4 space-y-2">
                  <div class="bg-muted h-3 w-full rounded"></div>
                  <div class="bg-muted h-3 w-5/6 rounded"></div>
                </div>
              </div>
            </div>
            <p v-else class="text-muted-foreground py-8 text-center">
              No posts available
            </p>
          </div>
        </ClientOnly>
      </div>
    </div>
  </main>
</template>
