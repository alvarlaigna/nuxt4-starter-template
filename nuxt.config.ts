// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config";
import type { NuxtConfig } from "@nuxt/schema";

export default defineNuxtConfig({
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
    vscode: {},
  },

  // Set compatibility for Nuxt 4
  compatibilityDate: "2024-11-23",
  future: {
    compatibilityVersion: 4,
  },

  // New directory structure configuration
  srcDir: "app",
  dir: {
    public: "public",
    assets: "assets",
    layouts: "./layouts",
    middleware: "./middleware",
    modules: "./modules",
    pages: "./pages",
    plugins: "./plugins",
    static: "public",
  },

  modules: [
    "@nuxt/eslint",
    "radix-vue/nuxt",
    "@nuxt/icon",
    [
      "@nuxt/image",
      {
        quality: 80,
        format: ["webp"],
        screens: {
          xs: 320,
          sm: 640,
          md: 768,
          lg: 1024,
          xl: 1280,
          xxl: 1536,
        },
      },
    ],
    "@nuxt/fonts",
    [
      "nuxt-security",
      {
        headers: {
          crossOriginEmbedderPolicy: false,
          crossOriginOpenerPolicy: false,
          crossOriginResourcePolicy: false,
          contentSecurityPolicy: {
            "base-uri": ["'self'"],
            "font-src": ["'self'", "https:", "data:"],
            "form-action": ["'self'"],
            "frame-ancestors": ["'self'"],
            "img-src": ["'self'", "data:", "https:"],
            "object-src": ["'none'"],
            "script-src-attr": ["'none'"],
            "script-src": [
              "'self'",
              "'unsafe-inline'",
              "'unsafe-eval'",
              "https:",
              "blob:",
            ],
            "style-src": ["'self'", "'unsafe-inline'", "https:"],
            "connect-src": ["'self'", "https:", "wss:", "data:"],
            "default-src": ["'self'", "https:"],
            "worker-src": ["'self'", "blob:"],
            "manifest-src": ["'self'"],
          },
          referrerPolicy: "no-referrer-when-downgrade",
        },
        requestSizeLimiter: {
          maxRequestSizeInBytes: 2000000,
          maxUploadFileRequestInBytes: 8000000,
        },
        rateLimiter: false,
        xssValidator: false,
        corsHandler: {
          origin: "*",
          methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
          preflight: {
            statusCode: 204,
          },
        },
      },
    ],
    "@vueuse/nuxt",
    "@nuxtjs/tailwindcss",
    [
      "@nuxtjs/robots",
      {
        UserAgent: "*",
        Allow: "/",
        Disallow: ["/admin", "/private"],
        Sitemap: process.env.NUXT_PUBLIC_SITE_URL
          ? `${process.env.NUXT_PUBLIC_SITE_URL}/sitemap.xml`
          : "https://nuxt4-starter-template.vercel.app/sitemap.xml",
      },
    ],
    [
      "@nuxtjs/sitemap",
      {
        hostname:
          process.env.NUXT_PUBLIC_SITE_URL ||
          "https://nuxt4-starter-template.vercel.app",
        gzip: true,
        exclude: ["/admin/**", "/private/**"],
        defaults: {
          changefreq: "daily",
          priority: 0.8,
          lastmod: new Date().toISOString(),
        },
      },
    ],
    [
      "@nuxtjs/html-validator",
      {
        usePrettier: true,
        logLevel: "verbose",
        failOnError: false,
      },
    ],
  ],

  typescript: {
    strict: true,
    typeCheck: true,
    shim: false,
    tsConfig: {
      compilerOptions: {
        moduleResolution: "bundler",
        paths: {
          "#imports": ["./.nuxt/types/imports.d.ts"],
          "#vue-router": ["./node_modules/vue-router/dist/vue-router.d.ts"],
          "#app/*": ["./.nuxt/types/app/*"],
          "#app/nuxt": ["./.nuxt/types/app/nuxt"],
        },
      },
    },
  },

  experimental: {
    // Enable modern features
    componentIslands: true,
    viewTransition: true,
    renderJsonPayloads: false,
    payloadExtraction: false,
    asyncContext: true,
    treeshakeClientOnly: true,
  },

  app: {
    head: {
      title: "Welcome",
      titleTemplate: "%s - Nuxt",
      htmlAttrs: { lang: "en" },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "format-detection", content: "telephone=no" },
        {
          name: "description",
          content:
            "A modern Nuxt 4 starter template with best practices and optimizations built-in",
        },
        { name: "theme-color", content: "#00DC82" },
        { property: "og:type", content: "website" },
        { property: "og:title", content: "Nuxt" },
        {
          property: "og:description",
          content:
            "A modern Nuxt 4 starter template with best practices and optimizations built-in",
        },
        { property: "og:image", content: "/og-image.jpg" },
      ],
      link: [
        { rel: "icon", type: "image/png", href: "/favicon.png" },
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          rel: "canonical",
          href:
            process.env.NUXT_PUBLIC_SITE_URL ||
            "https://nuxt4-starter-template.vercel.app",
        },
      ],
    },
    keepalive: true,
    pageTransition: { name: "page", mode: "out-in" },
    baseURL: process.env.NUXT_PUBLIC_SITE_URL || "/",
    buildAssetsDir: "/_nuxt/",
  },

  css: ["~/assets/css/main.css"],

  build: {
    transpile: ["vue-router"],
    analyze: true,
  },

  vite: {
    build: {
      target: "esnext",
      minify: "esbuild",
      cssMinify: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return "vendor";
            }
          },
        },
      },
    },
    css: {
      devSourcemap: true,
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/variables.scss" as *;',
        },
      },
    },
    optimizeDeps: {
      include: ["@vueuse/core", "vue-router", "@vueuse/core"],
    },
    ssr: {
      noExternal: ["workbox-window", /vue-i18n/],
    },
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
      ...(process.env.NODE_ENV === "production"
        ? {
            cssnano: {
              preset: [
                "default",
                {
                  discardComments: { removeAll: true },
                },
              ],
            },
          }
        : {}),
    },
  },

  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "http://localhost:3000",
      buildAt: new Date().toLocaleString("nb-US", {
        timeZone: "Europe/Helsinki",
      }),
      environment: process.env.NODE_ENV || "production",
    },
    fetch: {
      baseURL: process.env.NUXT_PUBLIC_SITE_URL || "http://localhost:3000",
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
      },
      retry: 3,
      timeout: 10000,
    },
  },

  telemetry: false,

  nitro: {
    compressPublicAssets: {
      gzip: true,
      brotli: true,
    },
    minify: true,
    timing: true,
    prerender: {
      crawlLinks: true,
      routes: ["/", "/posts", "/posts/1"],
      ignore: ["/api/**"],
      failOnError: false,
    },
    routeRules: {
      // Add cache rules for static pages
      "/": {
        prerender: true,
        cache: {
          maxAge: 3600,
          staleMaxAge: 60,
        },
      },
      "/posts": {
        prerender: true,
        cache: {
          maxAge: 3600,
          staleMaxAge: 60,
        },
      },
      "/posts/**": {
        prerender: true,
        cache: {
          maxAge: 3600,
          staleMaxAge: 60,
        },
      },
      "/_nuxt/**": {
        headers: {
          "cache-control": "public, max-age=31536000, immutable",
        },
      },
      "/api/**": {
        cors: true,
        headers: {
          "access-control-allow-methods": "GET",
          "cache-control": "public, s-maxage=60, stale-while-revalidate=60",
        },
      },
    },
    storage: {
      fs: {
        driver: "fs",
        base: "./.data/storage",
      },
      data: {
        driver: "fs",
        base: "./.data/data",
      },
    },
  },

  alias: {
    "#app": "./.nuxt/types/app",
    "#app/nuxt": "./.nuxt/types/app/nuxt",
    "#imports": "./.nuxt/types/imports",
    "#head": "./.nuxt/types/head",
    "#components": "./components",
  },

  ssr: true,
  spaLoadingTemplate: false,

  router: {
    options: {
      strict: true,
    },
  },
} satisfies NuxtConfig);
