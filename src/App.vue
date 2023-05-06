<template>
  <LoadingView v-if="isLoading"></LoadingView>

  <router-view></router-view>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useAppStore } from "./store";
import LoadingView from "@/components/LoadingView.vue";
const appStore = useAppStore();
const isLoading = computed(() => appStore.isLoading);
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
