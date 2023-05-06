<template>
  <div>email: {{ user?.email }}</div>
  <div>displayName: {{ user?.displayName }}</div>
</template>

<script setup lang="ts">
// import { User } from "firebase/auth";
import { onMounted, ref } from "vue";
// import { getCurrentUser } from "vuefire";

const user = ref({ email: "phucnq", displayName: "quangphuctq" });
console.log(user);

// onMounted(async () => {
//   const currentUser = await getCurrentUser();
//   user.value = currentUser as User;
// });
</script>

<style scoped></style>
