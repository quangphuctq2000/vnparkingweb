<template>
  <div :style="{ height: 500 + 'px' }">
    <MapView
      :open-create-parking-station="openCreateParkingStation"
      :update-lng-lat="updateLngLat"
    ></MapView>
  </div>
  <ParkingStationProperty
    ref="parkingStationPropertyPopup"
    :lat="lat"
    :lng="lng"
  ></ParkingStationProperty>
</template>

<script setup lang="ts">
import MapView from "@/components/MapView.vue";
import ParkingStationProperty from "@/views/parking-stations/CreateParkingStationProperty.vue";
import { ref } from "vue";
enum State {
  chooseLocation = 1,
  addProperty = 2,
}

const state = ref<State>(State.chooseLocation);
const lng = ref();
const lat = ref();
function openCreateParkingStation() {
  if (!lng.value || !lat.value) {
    return;
  }
  state.value = State.addProperty;
  parkingStationPropertyPopup.value?.open();
}

function updateLngLat(_lng: number, _lat: number) {
  lng.value = _lng;
  lat.value = _lat;
  console.log(lng.value);
}

const parkingStationPropertyPopup = ref<InstanceType<
  typeof ParkingStationProperty
> | null>(null);
</script>

<style scoped></style>
