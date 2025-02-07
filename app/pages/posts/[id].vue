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

const route = useRoute();
const {
  data: post,
  pending,
  error,
} = await useFetch<Post>(`/api/v1/posts/${route.params.id}`);

useHead({
  title: post.value?.title
    ? `${post.value.title.substring(0, 35)}${post.value.title.length > 35 ? "..." : ""} - ${t("app.title")}`
    : t("posts.loading"),
  meta: [
    {
      name: "description",
      content: post.value?.content?.substring(0, 160) ?? t("posts.loading"),
    },
  ],
});
</script>

<template>
  <div class="space-y-8">
    <!-- Loading State -->
    <div
      v-if="pending"
      class="animate-pulse space-y-6"
      role="status"
      aria-label="Loading post"
    >
      <div class="bg-muted h-12 w-3/4 rounded" aria-hidden="true"></div>
      <div class="space-y-4">
        <div class="bg-muted h-4 w-full rounded" aria-hidden="true"></div>
        <div class="bg-muted h-4 w-5/6 rounded" aria-hidden="true"></div>
        <div class="bg-muted h-4 w-4/5 rounded" aria-hidden="true"></div>
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
      <NuxtLink
        to="/posts"
        class="bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary mt-4 inline-block rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-offset-2"
      >
        {{ t("posts.backToPosts") }}
      </NuxtLink>
    </div>

    <!-- Content -->
    <article
      v-else-if="post"
      class="prose prose-zinc dark:prose-invert max-w-none"
      :aria-labelledby="`post-title-${post.id}`"
    >
      <header class="not-prose border-b pb-8">
        <div class="mb-8 flex items-center gap-2">
          <NuxtLink
            to="/posts"
            class="text-muted-foreground hover:text-foreground focus:ring-primary flex items-center gap-1 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            <span class="i-heroicons-arrow-left-20-solid" aria-hidden="true" />
            {{ t("posts.backToPosts") }}
          </NuxtLink>
        </div>
        <h1
          :id="`post-title-${post.id}`"
          class="mb-4 text-4xl font-bold tracking-tight"
        >
          {{ post.title }}
        </h1>
        <div class="text-muted-foreground flex items-center gap-4">
          <span>{{ t("posts.by") }} {{ post.author }}</span>
          <time :datetime="post.createdAt">
            {{ new Date(post.createdAt).toLocaleDateString() }}
          </time>
        </div>
      </header>

      <div class="mt-8 whitespace-pre-wrap">{{ post.content }}</div>
    </article>

    <!-- Not Found -->
    <div v-else class="rounded-lg border p-6 text-center" role="alert">
      <p class="text-muted-foreground text-lg">{{ t("posts.notFound") }}</p>
      <NuxtLink
        to="/posts"
        class="bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary mt-4 inline-block rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-offset-2"
      >
        {{ t("posts.backToPosts") }}
      </NuxtLink>
    </div>
  </div>
</template>
