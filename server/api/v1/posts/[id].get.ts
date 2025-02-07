import type { Post } from "#shared/types";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  if (!id) {
    throw createError({
      statusCode: 400,
      message: "Post ID is required",
    });
  }

  try {
    const post = await $fetch<Post>(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );

    // Add default author and timestamp, and map body to content
    return {
      ...post,
      content: post.body,
      author: "John Smith",
      createdAt: new Date().toISOString(),
    };
  } catch (_error) {
    throw createError({
      statusCode: 404,
      message: "Post not found",
    });
  }
});
