<template>
  <div class="mt-5 ml-1 d-flex text-h5">Quản lý xe vào, ra bến</div>
  <div class="d-flex my-5 py-5 bg-white">
    <div :style="{ width: '50%', 'margin-left': '10px' }">
      <v-list-item>
        <div class="ml-1 d-flex text-h6">Xe vào bến</div>
      </v-list-item>
      <v-list class="mb-5">
        <v-list-item>
          <template v-slot:prepend>
            <v-icon icon="mdi-car" size="120" />
          </template>
          <template v-slot:default
            ><v-text-field
              v-model="checkinCarIdentityNumber"
              label="Biển số xe"
            /> </template
        ></v-list-item>
        <v-list-item>
          <template v-slot:prepend>
            <div :style="{ width: '152px' }"></div>
          </template>
          <div class="d-flex">
            <v-btn class="my-1" text="Nhập bến" /></div
        ></v-list-item>
        <v-divider inset class="my-5 mx-10"></v-divider>
        <v-list-item>
          <template v-slot:default>
            <div class="text-start ml-5" v-if="showCheckinSuccess">
              <div class="d-flex text-h6 mb-5">Nhập bến thành công</div>
              <div class="d-flex justify-center">
                <v-icon
                  icon="mdi-checkbox-marked-circle"
                  color="blue"
                  size="80"
                ></v-icon>
              </div>
            </div>
          </template>
        </v-list-item>
      </v-list>
    </div>
    <v-divider vertical></v-divider>
    <div
      :style="{ width: '50%', 'margin-left': '10px', 'margin-right': '10px' }"
    >
      <v-list-item>
        <div class="ml-1 d-flex text-h6">Xe rời bến</div></v-list-item
      >
      <v-list class="mb-5">
        <v-list-item>
          <template v-slot:prepend>
            <v-icon icon="mdi-car" size="120" />
          </template>
          <template v-slot:default
            ><v-text-field v-model="checkoutCarNumber" label="Biển số xe" />
            <v-text-field
              v-model="checkoutCarNumber"
              label="Mã thanh toán" /></template
        ></v-list-item>
        <v-list-item>
          <v-btn class="my-1 mx-4" text="lấy thông tin" />
          <v-btn class="my-1 mx-4" text="kiểm tra thanh toán" />
          <v-btn class="my-1 mx-4" text="xuất bến" />
        </v-list-item>
        <v-divider inset class="my-5 mx-10"></v-divider>
        <v-list-item>
          <template v-slot:default>
            <div class="text-start ml-5" v-if="showCarInfo">
              <div class="d-flex text-h6 mb-5">Thông tin xe</div>
              <v-text-field
                v-model="checkoutCarNumber"
                label="Biển số xe"
                class="text-black"
                variant="solo"
                readonly
              />
              <v-text-field
                v-model="checkoutCarNumber"
                label="Chi phí đỗ xe"
                class="text-black"
                variant="solo"
                readonly
              />
            </div>
            <div class="text-start ml-5" v-if="showPaymentInfo">
              <div class="d-flex text-h6 mb-5">Thông tin thanh toán</div>
              <v-text-field
                v-model="checkoutCarNumber"
                label="Biển số xe"
                class="text-black"
                variant="solo"
                readonly
              />
              <v-text-field
                v-model="checkoutCarNumber"
                label="Giờ thanh toán"
                class="text-black"
                variant="solo"
                readonly
              />
              <v-text-field
                v-model="checkoutCarNumber"
                label="Số tiền thanh toán"
                class="text-black"
                variant="solo"
                readonly
              />
            </div>
            <div class="text-start ml-5" v-if="showCheckoutSuccess">
              <div class="d-flex text-h6 mb-5">Xuất bến thành công</div>
              <div class="d-flex justify-center">
                <v-icon
                  icon="mdi-checkbox-marked-circle"
                  color="blue"
                  size="80"
                ></v-icon>
              </div>
            </div>
          </template>
        </v-list-item>
      </v-list>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
// import { useToast } from "vue-toastification";
// import { useAppStore } from "@/store";

// const toast = useToast();
// const appStore = useAppStore();

const checkinCarIdentityNumber = ref();
const checkoutCarNumber = ref("ádfasdf");
const showCarInfo = ref<boolean>();
const showPaymentInfo = ref<boolean>();
const showCheckoutSuccess = ref<boolean>(true);
const showCheckinSuccess = ref<boolean>();
</script>

<style scoped lang="scss"></style>
