import { createI18n, useI18n } from "vue-i18n";
import type { App } from "vue";

const messages = {
  en: {
    app: {
      title: "Nuxt",
      description:
        "A modern Nuxt 4 starter template with best practices and optimizations built-in",
    },
    nav: {
      home: "Home",
      posts: "Posts",
    },
    posts: {
      title: "Posts",
      description: "Browse through our collection of posts",
      empty: "No posts found",
      loading: "Loading posts...",
      error: "Error loading posts",
      tryAgain: "Try Again",
      refresh: "Refresh",
      backToPosts: "Back to Posts",
      readMore: "Read more",
      by: "By",
      notFound: "Post not found",
    },
    footer: {
      copyright: "© {year} Nuxt 4 Template. All rights reserved.",
    },
  },
};

export default defineNuxtPlugin(({ vueApp }: { vueApp: App }) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: "en",
    fallbackLocale: "en",
    messages,
  });

  vueApp.use(i18n);

  return {
    provide: {
      i18n: useI18n,
    },
  };
});
