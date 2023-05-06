<template>
  <v-overlay
    :model-value="true"
    class="h-screen d-flex justify-center align-center"
  >
    <v-progress-circular :width="3" color="blue" indeterminate :size="65">
    </v-progress-circular>
  </v-overlay>
</template>

<script setup lang="ts"></script>

<style scoped></style>
