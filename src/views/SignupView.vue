<template>
  <div class="bg-blue-darken-4 text-h4 py-3">Welcome to VN PARKING</div>
  <div
    class="d-flex align-center justify-center h-screen bg-blue-grey-lighten-5 p-2"
  >
    <v-card width="600" class="bg-blue-darken-4">
      <template v-slot:title>SIGNUP</template>
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
          <v-btn class="w-100 my-3" @click="signupWithGoogle"
            >Continue with google</v-btn
          >
          <v-btn type="submit" block class="mt-2" @click="onSubmit"
            >SIGNUP</v-btn
          >
        </v-sheet>
      </v-form>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from "@/store";
import { useForm, useField } from "vee-validate";
import { defineEmits } from "vue";
import { ref } from "vue";
import * as yup from "yup";
import { useToast } from "vue-toastification";
import * as firebase from "@/ultis/firebase";
import { useRouter } from "vue-router";

const router = useRouter();
const appStore = useAppStore();
const toast = useToast();
const showPassword = ref<boolean>(false);
const { handleSubmit } = useForm();
const { value: email, errorMessage: emailValidateError } = useField<string>(
  "email",
  yup.string().email().required()
);
const { value: password, errorMessage: passwordValidationError } =
  useField<string>("password", yup.string().required());

async function signupWithGoogle() {
  appStore.openLoading();
  try {
    await firebase.continueWithGoogle();
    router.push({ path: "/" });
  } catch (error) {
    toast.error("continue with google error");
  }

  appStore.closeLoading();
}

const onSubmit = handleSubmit(
  async (result) => {
    appStore.openLoading();
    try {
      await firebase.signUpWithEmailPassword(result.email, result.password);
    } catch (error) {
      toast.error("signup error");
    }
    appStore.closeLoading();
  },
  (result) => console.log(result)
);
</script>

<style scoped></style>
