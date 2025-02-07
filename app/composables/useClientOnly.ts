import { ref } from "vue";

export const useClientOnly = () => {
  const isMounted = ref(false);

  onMounted(() => {
    isMounted.value = true;
  });

  return {
    isMounted,
  };
};
