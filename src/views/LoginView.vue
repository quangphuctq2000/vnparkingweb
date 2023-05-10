<template>
  <div class="bg-blue-darken-4 text-h4 py-3">Welcome to VN PARKING</div>
  <div
    class="d-flex align-center justify-center h-screen bg-blue-grey-lighten-5 p-2"
  >
    <v-card width="600" class="bg-blue-darken-4">
      <template v-slot:title>Login</template>
      <v-form fast-fail @submit.prevent="onSubmit()">
        <v-sheet>
          <v-text-field
            v-model="email"
            label="email"
            :error-messages="emailValidateError"
          />
          <v-text-field
            v-model="password"
            :error-messages="passwordValidationError"
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            label="password"
            @click:append-inner="showPassword = !showPassword"
          />
          <v-btn type="submit" block class="mt-2">LOGIN</v-btn>
          <v-btn class="w-100 my-3" @click="loginWithGoogle"
            >Continue with google</v-btn
          >
          <v-btn :to="{ path: '/signup' }" block class="mt-2">SIGNUP</v-btn>
        </v-sheet>
      </v-form>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { useForm, useField } from "vee-validate";
import { ref } from "vue";
import * as yup from "yup";
import { useRouter } from "vue-router";
import * as firebase from "@/ultis/firebase";
import { useToast } from "vue-toastification";
import { useAppStore } from "@/store";
import { auth } from "@/ultis/vueFire";
import { authWithGoogle, login } from "@/ultis/api/auth";

const toast = useToast();
const router = useRouter();
const showPassword = ref<boolean>(false);
const { handleSubmit } = useForm();
const { value: email, errorMessage: emailValidateError } = useField<string>(
  "email",
  yup.string().email().required()
);
const { value: password, errorMessage: passwordValidationError } =
  useField<string>("password", yup.string().required());
const appStore = useAppStore();
const onSubmit = handleSubmit(
  async (result) => {
    try {
      appStore.openLoading();
      await firebase.loginWithEmailPassword(result.email, result.password);
      const accessToken = await auth.currentUser?.getIdToken();
      if (!accessToken) throw new Error();
      const loginResult = await login(accessToken);
      console.log(loginResult);

      if (loginResult.status !== 200 || loginResult.data.status)
        throw new Error();
      router.push({ path: "/" });
    } catch (error) {
      console.log(error);
      toast.error("login error");
    }
    appStore.closeLoading();
  },
  (result) => console.log(result)
);

async function loginWithGoogle() {
  appStore.openLoading();
  try {
    await firebase.continueWithGoogle();
    const token = await auth.currentUser?.getIdToken();
    if (!token) throw new Error();
    const authWithGoogleResult = await authWithGoogle(token);
    if (authWithGoogleResult.status !== 200 || authWithGoogleResult.data.status)
      throw new Error();
    router.push({ path: "/" });
  } catch (error) {
    toast.error("login error");
  }
  appStore.closeLoading();
}
</script>

<style scoped></style>
