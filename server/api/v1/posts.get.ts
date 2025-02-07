import type { Post } from "#shared/types";

export default defineEventHandler(async (event) => {
  /**
   * You can't use composables (useFetch etc) outside of the setup function.
   * But you can use $fetch instead. It will be auto-imported.
   *
   * @link https://nuxt.com/docs/api/utils/dollarfetch
   * @link https://github.com/unjs/ofetch
   *
   */

  try {
    // Add caching headers
    setHeader(event, "Cache-Control", "s-maxage=60, stale-while-revalidate=60");

    const posts = await $fetch<Post[]>(
      "https://jsonplaceholder.typicode.com/posts",
      {
        retry: 3,
        timeout: 5000,
      }
    );

    if (!posts || !Array.isArray(posts)) {
      throw createError({
        statusCode: 500,
        message: "Invalid response from external API",
      });
    }

    // Add default author and timestamp to each post
    return posts.map((post) => ({
      ...post,
      content: post.body, // Map body to content for frontend consistency
      author: "John Smith",
      createdAt: new Date().toISOString(),
    }));
  } catch (error: any) {
    console.error("Error fetching posts:", error);
    throw createError({
      statusCode: error?.statusCode || 500,
      message: error?.message || "Error fetching posts",
    });
  }
});
