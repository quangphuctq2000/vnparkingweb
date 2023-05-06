<template>
  <v-layout>
    <PageHeader />
    <PageNavigationDrawer />
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import PageHeader from "@/components/PageHeader.vue";
import PageNavigationDrawer from "@/components/PageNavigationDrawer.vue";
</script>
