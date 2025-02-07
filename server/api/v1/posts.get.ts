import type { Post } from "#shared/types";

export default defineEventHandler(async () => {
  /**
   * You can't use composables (useFetch etc) outside of the setup function.
   * But you can use $fetch instead. It will be auto-imported.
   *
   * @link https://nuxt.com/docs/api/utils/dollarfetch
   * @link https://github.com/unjs/ofetch
   *
   */

  const posts = await $fetch<Post[]>(
    "https://jsonplaceholder.typicode.com/posts"
  );

  // Add default author and timestamp to each post
  return posts.map((post) => ({
    ...post,
    content: post.body, // Map body to content for frontend consistency
    author: "John Smith",
    createdAt: new Date().toISOString(),
  }));
});
