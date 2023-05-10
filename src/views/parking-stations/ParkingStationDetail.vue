<template>
  <v-btn
    class="my-5"
    text="create parking station"
    :to="{ path: '/parking-station/new' }"
    v-if="!parkingStation"
  />
  <v-card class="px-8 pb-8" v-else>
    <template v-slot:title>
      <div class="text-h5">Quản lý bãi đỗ xe</div>
    </template>
    <v-form fast-fail @submit.prevent="updateParkingStation()">
      <v-sheet>
        <v-text-field :rules="[true]" label="id" v-model="id" />
        <v-text-field :rules="[true]" label="name" v-model="name" />
        <v-text-field
          :rules="[true]"
          label="description"
          v-model="description"
          required
        />
        <v-text-field
          :rules="[true]"
          label="number of parking lot"
          v-model="parkingLotNumber"
          type="number"
        />
        <v-text-field
          :rules="[true]"
          label="price per hour"
          v-model="pricePerHour"
          type="number"
        />
        <v-text-field
          :rules="[true]"
          label="price per month"
          v-model="pricePerMonth"
          type="number"
        />
        <v-text-field :rules="[true]" label="lat" readonly :model-value="lat" />
        <v-text-field :rules="[true]" label="lng" readonly :model-value="lng" />

        <v-btn type="submit" block class="mt-2" text="update parking station" />
      </v-sheet>
    </v-form>
  </v-card>
</template>

<script setup lang="ts">
import { useAppStore } from "@/store";
import {
  getParkingStation,
  updateParkingStationProperty,
} from "@/ultis/api/parkingStation";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const parkingStation = ref();
const appStore = useAppStore();

const name = ref();
const description = ref();
const parkingLotNumber = ref<number>();
const pricePerHour = ref<number>();
const pricePerMonth = ref<number>();
const snackbar = ref(false);
const lng = ref();
const lat = ref();
const id = ref();

async function updateParkingStation() {
  try {
    appStore.openLoading();
    const result = await updateParkingStationProperty({
      id: Number(id.value),
      name: name.value,
      description: description.value,
      latitude: Number(lat.value),
      longitude: Number(lng.value),
      parkingLotNumber: Number(parkingLotNumber.value),
      pricePerHour: Number(pricePerHour.value),
      pricePerMonth: Number(pricePerMonth.value),
    });
    console.log(result);
    appStore.closeLoading();
    if (result.status != 200 || result.data.status) throw new Error();
    router.push({ path: "/parking-station" });
  } catch (error) {
    snackbar.value = true;
  }
}

onMounted(async () => {
  try {
    const result = await getParkingStation();
    if (!result.data.name) parkingStation.value = false;
    else parkingStation.value = true;

    if (result.status != 200 || result.data.status) throw new Error();
    id.value = result.data.id;
    name.value = result.data.name;
    description.value = result.data.description;
    lat.value = result.data.latitude;
    lng.value = result.data.longitude;
    parkingLotNumber.value = result.data.parkingLotNumber;
    pricePerHour.value = result.data.pricePerHour;
    pricePerMonth.value = result.data.pricePerMonth;
  } catch (error) {
    router.push({ path: "/no-permission" });
  }
  console.log(parkingStation.value);
});
</script>

<style scoped></style>
