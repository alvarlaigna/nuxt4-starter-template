import { defineNuxtRouteMiddleware, useState, computed } from "#imports";
import type { RouteLocationNormalized } from "#vue-router";

/**
 * Global middleware to set the appropriate page layout based on the route.
 * This middleware runs on every route navigation to ensure the correct layout is applied.
 *
 * @param {RouteLocationNormalized} _to - The target route being navigated to
 * @returns {void | NavigationGuardReturn} Returns undefined or a navigation guard return value
 */
export default defineNuxtRouteMiddleware((_to: RouteLocationNormalized) => {
  const layout = useLayout();

  // Set default layout - can be extended with route-specific layouts
  layout.set("default");
});

/**
 * Composable for managing the current layout
 * @returns {Object} Layout utilities
 * @property {ComputedRef<string>} current - The current layout name
 * @property {(name: string) => void} set - Function to set the current layout
 */
function useLayout() {
  const layout = useState<string>("layout", () => "default");

  return {
    current: computed(() => layout.value),
    set: (name: string) => (layout.value = name),
  };
}
