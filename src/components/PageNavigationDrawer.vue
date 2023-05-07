<template>
  <v-navigation-drawer class="px-0 pt-0 bg-blue-grey-lighten-5">
    <v-list class="pt-0">
      <v-list-item
        title="Parking Station"
        :to="{ path: '/parking-stations' }"
        class="d-flex align-content-start"
        :active="activePath === '/parking-stations' ? true : false"
        active-color="light-blue-darken-4"
      />

      <v-list-item
        title="Profile"
        :to="{ path: '/profile' }"
        class="d-flex align-content-start"
        :active="activePath === '/profile' ? true : false"
        active-color="light-blue-darken-4"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

const activePath = ref<string>();
const route = useRoute();

watch(route, () => {
  activePath.value = route.path;
});
</script>

<style scoped></style>
