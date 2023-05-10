<template>
  <v-dialog v-model="showPopup" persistent :width="600" close>
    <v-toolbar class="bg-blue-darken-4">
      <v-toolbar-title>Create parking station</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon dark @click="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card class="px-8 pb-8">
      <v-form fast-fail @submit.prevent="createParkingStation()">
        <v-sheet>
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
          <v-text-field
            :rules="[true]"
            label="lat"
            readonly
            :model-value="props.lat"
          />
          <v-text-field
            :rules="[true]"
            label="lng"
            readonly
            :model-value="props.lng"
          />

          <v-btn type="submit" block class="mt-2">CREATE PARKING STATION</v-btn>
        </v-sheet>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineExpose } from "vue";
import { useRouter } from "vue-router";
import { createParkingStationProperty } from "@/ultis/api/parkingStation";
import { useToast } from "vue-toastification";

const props = defineProps({
  lng: String,
  lat: String,
});
const toast = useToast();

const router = useRouter();
const name = ref<string>();
const description = ref();
const parkingLotNumber = ref<number>();
const pricePerHour = ref<number>();
const pricePerMonth = ref<number>();

const showPopup = ref(false);

function open() {
  showPopup.value = true;
}

function close() {
  showPopup.value = false;
}

async function createParkingStation() {
  try {
    if (!props.lat || !props.lng) throw new Error();
    const createParkingStationResult = await createParkingStationProperty({
      name: name.value,
      description: description.value,
      latitude: Number(props.lat),
      longitude: Number(props.lng),
      parkingLotNumber: Number(parkingLotNumber.value),
      pricePerHour: Number(pricePerHour.value),
      pricePerMonth: Number(pricePerMonth.value),
    });
    if (
      createParkingStationResult.status != 200 &&
      createParkingStationResult.data.status
    )
      throw new Error();
    router.push({ path: "/parking-station" });
    close();
  } catch (error) {
    toast.error("create parking station error");
  }
  console.log("create parking station");
}

defineExpose({
  open,
});
</script>

<style lang="scss">
$card-padding: 0.625rem 1rem;
$button-border-color: blue;
$button-color: blue;
$card-actions-flex: none;
</style>
