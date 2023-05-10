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
            <v-btn class="my-1" text="Nhập bến" @click="checkInCar" /></div
        ></v-list-item>
        <v-divider inset class="my-5 mx-10"></v-divider>
        <v-list-item>
          <template v-slot:default>
            <div class="text-start ml-5" v-if="info == 'checkinSuccess'">
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
              v-model="paymentInfoId"
              label="Mã thanh toán" /></template
        ></v-list-item>
        <v-list-item>
          <v-btn
            class="my-1 mx-4"
            text="lấy thông tin"
            @click="checkoutManual"
          />
          <v-btn
            class="my-1 mx-4"
            text="kiểm tra thanh toán"
            @click="getPayment"
          />
          <v-btn
            class="my-1 mx-4"
            text="xuất bến"
            @click="checkoutManualSuccess"
          />
        </v-list-item>
        <v-divider inset class="my-5 mx-10"></v-divider>
        <v-list-item>
          <template v-slot:default>
            <div class="text-start ml-5" v-if="info == 'carInfo'">
              <div class="d-flex text-h6 mb-5">Thông tin xe</div>
              <v-text-field
                v-model="checkoutCarNumber"
                label="Biển số xe"
                class="text-black"
                variant="solo"
                readonly
              />
              <v-text-field
                v-model="price"
                label="Chi phí đỗ xe"
                class="text-black"
                variant="solo"
                readonly
              />
            </div>
            <div class="text-start ml-5" v-if="info == 'payment'">
              <div class="d-flex text-h6 mb-5">Thông tin thanh toán</div>
              <v-text-field
                v-model="checkoutCarNumber"
                label="Biển số xe"
                class="text-black"
                variant="solo"
                readonly
              />
              <v-text-field
                v-model="checkoutTime"
                label="Giờ thanh toán"
                class="text-black"
                variant="solo"
                readonly
              />
              <v-text-field
                v-model="price"
                label="Số tiền thanh toán"
                class="text-black"
                variant="solo"
                readonly
              />
            </div>
            <div class="text-start ml-5" v-if="info == 'checkoutSuccess'">
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
import { useToast } from "vue-toastification";
import { checkIn, checkout, checkoutSuccess } from "@/ultis/api/parking";
import { useAppStore } from "@/store";
import { getPaymentInfo } from "@/ultis/api/payment";

const toast = useToast();
const appStore = useAppStore();

const checkinCarIdentityNumber = ref<string>();
const checkoutCarNumber = ref();
const paymentInfoId = ref();
const checkoutTime = ref();
const price = ref();
const parkingId = ref();
const info = ref<
  "payment" | "checkoutSuccess" | "carInfo" | "checkinSuccess" | undefined
>("payment");

async function checkInCar() {
  appStore.openLoading();
  try {
    if (!checkinCarIdentityNumber.value) throw new Error();
    const result = await checkIn(checkinCarIdentityNumber.value);
    console.log(result);

    if (result.status != 200 || result.data.status) throw new Error();
    info.value = "checkinSuccess";
  } catch (error) {
    info.value = undefined;
    toast.error("check in error");
  }
  appStore.closeLoading();
}

async function checkoutManual() {
  appStore.openLoading();
  try {
    if (!checkoutCarNumber.value) throw new Error();
    const result = await checkout(checkoutCarNumber.value);
    console.log(result);

    if (result.status != 200 || result.data.status) throw new Error();
    info.value == "carInfo";
    checkoutTime.value = result.data.checkOut;
    price.value = result.data.price;
    parkingId.value = result.data.id;
  } catch (error) {
    toast.error("get checking price error");
  }
  appStore.closeLoading();
}

async function getPayment() {
  try {
    const result = await getPaymentInfo(paymentInfoId.value);
    if (result.status != 200 || result.data.status) throw new Error();
    checkoutTime.value = result.data.checkOut;
    price.value = result.data.price;
    checkoutCarNumber.value = result.data.vehicleIdentityNumber;
    info.value = "payment";
  } catch (error) {
    toast.error("get payment info error");
  }
}

async function checkoutManualSuccess() {
  try {
    console.log(parkingId.value);

    if (!parkingId.value) throw new Error();
    console.log(new Date(checkoutTime.value));

    const result = await checkoutSuccess(
      Number(parkingId.value),
      Number(price.value),
      checkoutTime.value
    );
    console.log(result);

    if (result.status != 200 || result.data.status) throw new Error();
    info.value = "checkoutSuccess";
  } catch (error) {
    console.log(error);

    toast.error("checkout error");
  }
}
</script>

<style scoped lang="scss"></style>
