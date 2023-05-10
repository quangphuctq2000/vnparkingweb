import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";
import { VueFire, VueFireAuth } from "vuefire";
import { app } from "./ultis/vueFire";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { VDataTable } from "vuetify/labs/VDataTable";
import VueGoogleMaps from "@fawmi/vue-google-maps";
import { createPinia } from "pinia";

const pinia = createPinia();
const vuetify = createVuetify({
  components,
  directives,
});

export const rootApp = createApp(App)
  .use(router)
  .use(vuetify)
  .use(Toast)
  .use(pinia)
  .use(VueFire, {
    firebaseApp: app,
    modules: [VueFireAuth()],
  })
  .use(VueGoogleMaps, {
    load: {
      key: "AIzaSyDHCQpXknRoseXEoq8vEfVfbnhtkvP3jPg",
    },
  })
  .component("VDataTable", VDataTable)
  .mount("#app");
