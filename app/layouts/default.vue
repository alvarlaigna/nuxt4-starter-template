<template>
  <div class="bg-background text-foreground flex min-h-screen flex-col">
    <!-- Skip to main content link for keyboard users -->
    <a
      href="#main-content"
      class="focus:bg-background focus:text-foreground sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4"
    >
      Skip to main content
    </a>

    <header
      class="bg-background/80 sticky top-0 z-40 w-full border-b backdrop-blur-sm"
    >
      <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <!-- Logo -->
          <NuxtLink
            to="/"
            class="hover:text-primary focus:text-primary focus:ring-primary rounded-md px-2 py-1 text-xl font-bold tracking-tight focus:outline-none focus:ring-2 focus:ring-offset-2"
            aria-label="Home"
          >
            {{ t("app.title") }}
          </NuxtLink>

          <!-- Navigation -->
          <nav aria-label="Main navigation" class="flex items-center gap-6">
            <NuxtLink
              v-for="item in navigation"
              :key="item.href"
              :to="item.href"
              class="hover:text-primary focus:text-primary focus:ring-primary rounded-md px-2 py-1 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
              :class="{ 'text-primary': route.path === item.href }"
            >
              {{ item.name }}
            </NuxtLink>
          </nav>
        </div>
      </div>
    </header>

    <main
      id="main-content"
      class="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8"
    >
      <ClientOnly>
        <Suspense>
          <template #default>
            <NuxtLoadingIndicator
              color="var(--color-brand)"
              :height="2"
              class="z-50"
            />
          </template>
          <template #fallback>
            <div class="h-1 w-full bg-gray-200" />
          </template>
        </Suspense>
      </ClientOnly>
      <NuxtPage />
    </main>

    <footer class="mt-auto border-t py-6">
      <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <p class="text-muted-foreground text-center text-sm">
          {{ t("footer.copyright", { year }) }}
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import type { Composer } from "vue-i18n";
import type { NuxtApp } from "nuxt/app";

const nuxtApp = useNuxtApp() as NuxtApp & { $i18n: () => Composer };
const t = nuxtApp.$i18n().t;

const navigation = [
  { name: t("nav.home"), href: "/" },
  { name: t("nav.posts"), href: "/posts" },
];

const route = useRoute();
const year = new Date().getFullYear();
</script>
