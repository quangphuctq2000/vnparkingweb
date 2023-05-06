import { defineStore } from "pinia";
import { ref } from "vue";

export const useAppStore = defineStore("app", () => {
  const isLoading = ref<boolean>(false);
  function openLoading() {
    isLoading.value = true;
  }
  function closeLoading() {
    isLoading.value = false;
  }
  return {
    isLoading,
    openLoading,
    closeLoading,
  };
});
