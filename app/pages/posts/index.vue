<script setup lang="ts">
const { $i18n } = useNuxtApp();
const { t } = $i18n();

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

// Fetch posts data with loading and error states
const {
  data: posts,
  pending,
  error,
  refresh,
} = await useFetch<Post[]>("/api/v1/posts");

// Set page meta
useHead({
  title: `${t("posts.title")} - ${t("app.title")}`,
  meta: [
    {
      name: "description",
      content: t("posts.description"),
    },
  ],
});

// Handle refresh with proper event typing
const handleRefresh = async (event: MouseEvent) => {
  event.preventDefault();
  await refresh();
};
</script>

<template>
  <div class="space-y-8">
    <header class="border-b pb-4">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-4xl font-bold tracking-tight">
            {{ t("posts.title") }}
          </h1>
          <p class="text-muted-foreground mt-2">
            {{ t("posts.description") }}
          </p>
        </div>
        <div>
          <button
            type="button"
            class="bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-offset-2"
            :disabled="pending"
            :aria-busy="pending"
            @click="handleRefresh"
          >
            {{ t("posts.refresh") }}
          </button>
        </div>
      </div>
    </header>

    <!-- Loading State -->
    <div
      v-if="pending"
      class="space-y-6"
      role="status"
      aria-label="Loading posts"
    >
      <div
        v-for="n in 6"
        :key="n"
        class="animate-pulse rounded-lg border p-6"
        aria-hidden="true"
      >
        <div class="bg-muted h-6 w-3/4 rounded"></div>
        <div class="mt-4 space-y-3">
          <div class="bg-muted h-4 w-full rounded"></div>
          <div class="bg-muted h-4 w-5/6 rounded"></div>
        </div>
        <div class="mt-4 flex justify-between">
          <div class="bg-muted h-4 w-20 rounded"></div>
          <div class="bg-muted h-4 w-24 rounded"></div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div
      v-else-if="error"
      class="border-destructive rounded-lg border p-6 text-center"
      role="alert"
    >
      <p class="text-destructive text-lg font-semibold">
        {{ t("posts.error") }}
      </p>
      <button
        type="button"
        class="bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary mt-4 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-offset-2"
        @click="handleRefresh"
      >
        {{ t("posts.tryAgain") }}
      </button>
    </div>

    <!-- Content -->
    <template v-else>
      <section
        aria-labelledby="posts-heading"
        class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <h2 id="posts-heading" class="sr-only">{{ t("posts.title") }}</h2>
        <article
          v-for="post in posts"
          :key="post.id"
          class="focus-within:ring-primary group relative rounded-lg border p-6 transition focus-within:ring-2 focus-within:ring-offset-2 hover:shadow-md"
        >
          <h3
            :id="`post-title-${post.id}`"
            class="text-xl font-semibold tracking-tight"
          >
            {{ post.title }}
          </h3>
          <p class="text-muted-foreground mt-2 line-clamp-3">
            {{ post.content }}
          </p>
          <div class="mt-4 flex items-center justify-between text-sm">
            <span class="text-muted-foreground">
              {{ t("posts.by") }} {{ post.author }}
            </span>
            <time :datetime="post.createdAt" class="text-muted-foreground">
              {{ new Date(post.createdAt).toLocaleDateString() }}
            </time>
          </div>
          <NuxtLink
            :to="`/posts/${post.id}`"
            class="absolute inset-0 focus:outline-none"
            :aria-labelledby="`post-title-${post.id}`"
          >
            <span class="sr-only">{{ t("posts.readMore") }}</span>
          </NuxtLink>
        </article>
      </section>

      <p v-if="!posts?.length" class="text-muted-foreground py-12 text-center">
        {{ t("posts.empty") }}
      </p>
    </template>
  </div>
</template>
