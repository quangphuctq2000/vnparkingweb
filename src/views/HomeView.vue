<template>
  <v-layout class="bg-blue-grey-lighten-5">
    <PageHeader />
    <PageNavigationDrawer />
    <v-main class="bg-blue-grey-lighten-5 h-screen">
      <router-view></router-view>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import PageHeader from "@/components/PageHeader.vue";
import PageNavigationDrawer from "@/components/PageNavigationDrawer.vue";
</script>
