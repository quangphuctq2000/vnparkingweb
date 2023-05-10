<template>
  <v-navigation-drawer class="px-0 pt-0 bg-blue-grey-lighten-5">
    <v-list class="pt-0">
      <v-list-item
        title="Bãi đỗ xe"
        :to="{ path: '/parking-station' }"
        class="d-flex align-content-start"
        :active="activePath === '/parking-stations' ? true : false"
        active-color="light-blue-darken-4"
      />

      <v-list-item
        title="Thông tin cá nhân"
        :to="{ path: '/profile' }"
        class="d-flex align-content-start"
        :active="activePath === '/profile' ? true : false"
        active-color="light-blue-darken-4"
      />
      <v-list-item
        title="Ra/Vào bến"
        :to="{ path: '/parking' }"
        class="d-flex align-content-start"
        :active="activePath === '/parking' ? true : false"
        active-color="light-blue-darken-4"
      />
      <v-list-item
        title="Doanh thu"
        :to="{ path: '/revenue' }"
        class="d-flex align-content-start"
        :active="activePath === '/revenue' ? true : false"
        active-color="light-blue-darken-4"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

const activePath = ref<string>();
const route = useRoute();

watch(route, () => {
  activePath.value = route.path;
});
</script>

<style scoped></style>
