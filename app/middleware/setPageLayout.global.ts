import { 
  defineNuxtRouteMiddleware, 
  useNuxtApp, 
  useState,
  computed 
} from '#imports'
import type { RouteLocationNormalized } from '#vue-router'

/**
 * Global middleware to set the appropriate page layout based on the route.
 * This middleware runs on every route navigation to ensure the correct layout is applied.
 * 
 * @param {RouteLocationNormalized} to - The target route being navigated to
 * @returns {void | NavigationGuardReturn} Returns undefined or a navigation guard return value
 */
export default defineNuxtRouteMiddleware((to: RouteLocationNormalized) => {
  const app = useNuxtApp()
  const layout = useLayout()

  // Use type-safe route matching with path utilities
  const isUserRoute = to.fullPath.startsWith('/user/')
  
  // Set layout based on route
  layout.set(isUserRoute ? 'user' : 'default')
})

/**
 * Composable for managing the current layout
 * @returns {Object} Layout utilities
 * @property {ComputedRef<string>} current - The current layout name
 * @property {(name: string) => void} set - Function to set the current layout
 */
function useLayout() {
  const layout = useState<string>('layout', () => 'default')
  
  return {
    current: computed(() => layout.value),
    set: (name: string) => layout.value = name
  }
}
