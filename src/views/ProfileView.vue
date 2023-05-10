<template>
  <div class="mt-5 ml-1 d-flex text-h5">Thông tin tài khoản</div>
  <div class="d-flex my-5 py-5 bg-white">
    <div :style="{ width: '60%', 'margin-left': '10px' }">
      <v-list-item>
        <div class="ml-1 d-flex text-h6">Thông tin cá nhân</div>
      </v-list-item>
      <v-list class="mb-5">
        <v-list-item>
          <template v-slot:prepend>
            <v-icon icon="mdi-account" size="120" />
          </template>
          <template v-slot:default
            ><v-text-field v-model="displayName" label="Tên hiển thị" />
            <v-text-field
              v-model="phoneNumber"
              label="Số điện thoại"
            /> </template
        ></v-list-item>
        <v-list-item>
          <template v-slot:prepend>
            <div :style="{ width: '152px' }"></div>
          </template>
          <div class="d-flex">
            <v-btn
              class="my-1"
              text="Lưu thay đổi"
              @click="
                async () => await updateUserProfile(displayName, phoneNumber)
              "
            /></div
        ></v-list-item>
      </v-list>
    </div>
    <v-divider vertical></v-divider>
    <div :style="{ width: '40%', 'margin-left': '10px' }">
      <v-list-item>
        <div class="ml-1 d-flex text-h6">Email và Password</div></v-list-item
      >
      <v-list class="mb-5">
        <v-list-item>
          <template v-slot:default
            ><v-text-field v-model="email" label="Email" />

            <v-text-field v-model="password" label="Password" type="password" />
            <div class="d-flex">
              <v-btn
                class="my-1"
                text="Lưu thay đổi"
                @click="async () => await updateEmailPassword(email, password)"
              />
            </div> </template
        ></v-list-item>
      </v-list>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getCurrentUser } from "vuefire";
import { useToast } from "vue-toastification";
import { updateUserInfo, updateUserEmailPassword } from "@/ultis/api/auth";
import { useAppStore } from "@/store";

const toast = useToast();
const appStore = useAppStore();

const displayName = ref();
const phoneNumber = ref();
const email = ref();
const password = ref();

async function updateUserProfile(displayName: string, phoneNumber: string) {
  appStore.openLoading();
  try {
    const result = await updateUserInfo(displayName, phoneNumber);
    console.log(result);

    if (result.status != 200 || result.data.status) throw new Error();
    toast.success("update user info success");
  } catch (error) {
    toast.error("update user profile error");
  }
  appStore.closeLoading();
}

async function updateEmailPassword(email: string, password: string) {
  console.log(email, password);

  appStore.openLoading();
  try {
    const updateEmailPasswordResult = await updateUserEmailPassword(
      email,
      password
    );
    if (
      updateEmailPasswordResult.status != 200 ||
      updateEmailPasswordResult.data.status
    )
      throw new Error();
    toast.success("update user info success");
  } catch (error) {
    toast.error("update user profile error");
  }
  appStore.closeLoading();
}

onMounted(async () => {
  const currentUser = await getCurrentUser();
  displayName.value = currentUser?.displayName;
  phoneNumber.value = currentUser?.phoneNumber;
  email.value = currentUser?.email;
});
</script>

<style scoped></style>
