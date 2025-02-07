<script lang="ts" setup>
interface Post {
  title: string;
  // Add other post properties as needed
}

const posts = ref<Post[]>([]);
const pending = ref(true);

// Use composable for data fetching with SSR enabled
const {
  data,
  error,
  pending: fetchPending,
} = useFetch<Post[]>("/api/v1/posts", {
  key: "posts",
  server: true,
});

watchEffect(() => {
  pending.value = fetchPending.value;

  if (error.value) {
    throw createError({
      ...error.value,
      statusMessage: "Posts Not Found",
    });
  }

  if (data.value) {
    // Ensure data.value is treated as Post[]
    const postsArray = data.value as Post[];
    posts.value = postsArray.slice(0, 3);
  }
});

useHead({
  title: "Posts",
});
</script>

<template>
  <div class="flex min-h-dvh flex-col justify-center text-center">
    <div class="container">
      <div class="mb-6 flex justify-center">
        <Icon name="logos:nuxt-icon" size="80" />
      </div>
      <h1 class="mb-6 text-center text-5xl font-bold">Hello, World!</h1>
      <p class="mb-12 text-brand-50">Can you see me?</p>
      <div class="flex flex-wrap justify-center gap-4">
        <DialogModal size="xl" title="Modal title">
          <template #trigger>Open Dialog</template>
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
      <ClientOnly>
        <p
          class="mx-auto flex max-w-xl flex-wrap justify-center gap-2 pt-8 text-sm"
        >
          <template v-if="!pending && posts.length > 0">
            <span v-for="item in posts" :key="item.title">
              {{ item.title }}
            </span>
          </template>
          <span v-else-if="pending">Loading posts...</span>
          <span v-else>No posts available</span>
        </p>
        <template #fallback>
          <p
            class="mx-auto flex max-w-xl flex-wrap justify-center gap-2 pt-8 text-sm"
          >
            <span>Loading posts...</span>
          </p>
        </template>
      </ClientOnly>
    </div>
  </div>
</template>
