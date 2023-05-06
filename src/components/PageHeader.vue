<template>
  <v-app-bar flat class="bg-blue-darken-4" app>
    <template v-slot:title>
      <div>VN PARKING</div>
    </template>
    <v-spacer></v-spacer>

    <v-app-bar-nav-icon v-if="currentUser">
      <v-menu offset-y>
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" icon>
            <v-avatar>
              <v-img cover :src="currentUser.photoURL"></v-img>
            </v-avatar>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-btn :to="{ path: '/profile' }">PROFILE</v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn @click="logout">LOGOUT</v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar-nav-icon>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onMounted } from "vue";
import { signOut, User } from "firebase/auth";
import { getCurrentUser } from "vuefire";
import { auth } from "@/ultis/vueFire";
const currentUser = ref<User | null>();

onMounted(async () => {
  const user = await getCurrentUser();
  currentUser.value = user;
});

async function logout() {
  await signOut(auth);
}
</script>

<style scoped></style>
