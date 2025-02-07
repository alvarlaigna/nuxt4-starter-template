// This file contains type augmentations for Nuxt modules
import type { Ref } from "vue";
import type { RouteLocationNormalized } from "vue-router";

// Extend the imports module
declare module "#imports" {
  // Re-export Vue types
  export type { Ref };

  // Add Vue Router types
  export type { RouteLocationNormalized };
}

// Extend Vue Router module
declare module "#vue-router" {
  export type { RouteLocationNormalized };
}

// Extend process env
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production" | "test";
    }
  }
}
