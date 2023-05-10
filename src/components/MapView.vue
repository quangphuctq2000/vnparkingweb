<template>
  <div class="ml-1 d-flex text-h6">Chọn địa chỉ cho bãi đỗ xe</div>
  <div
    id="map"
    :style="{
      maxWidth: 1000 + 'px',
      height: 500 + 'px',
      padding: 10 + 'px',
      marginLeft: 'auto',
      marginRight: 'auto',
    }"
  ></div>
  <div style="display: flex; justify-content: flex-end">
    <v-btn
      @click="
        {
          props.openCreateParkingStation();
        }
      "
      >tiếp tục</v-btn
    >
  </div>
</template>

<script setup lang="ts">
import goongjs from "@goongmaps/goong-js";
import { onMounted, defineProps } from "vue";
goongjs.accessToken = "V6w0aEInUV7TbB5T6FQBUPAitS4FNXVPQhALH91B";
const props = defineProps({
  openCreateParkingStation: {
    type: Function,
    required: true,
  },
  updateLngLat: {
    type: Function,
    required: true,
  },
});
onMounted(() => {
  const map = new goongjs.Map({
    container: "map",
    style: "https://tiles.goong.io/assets/goong_map_web.json",
    center: [105.83991, 21.028],
    zoom: 13,
    interactive: true,
  });

  const parkingStations = [[105.83991, 21.028]];
  parkingStations.forEach((parkingStation) => {
    new goongjs.Marker().setLngLat(parkingStation).addTo(map);
  });

  map.on("click", function (e: any) {
    props.updateLngLat(e.lngLat.lng, e.lngLat.lat);

    new goongjs.Marker().setLngLat([e.lngLat.lng, e.lngLat.lat]).addTo(map);
  });

  map.addControl(
    new goongjs.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    })
  );
});
</script>

<style scoped></style>
