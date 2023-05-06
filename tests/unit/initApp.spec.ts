import { mount } from "@vue/test-utils";
import App from "@/App.vue";
import { routes } from "@/router/index";
import { getCurrentUser } from "vuefire";
import { createRouter, createWebHistory } from "vue-router";

jest.mock("vuefire", () => ({
  getCurrentUser: jest
    .fn()
    .mockReturnValueOnce({ username: "quangphuctq" })
    .mockReturnValueOnce(null),
  getAuth: () => 1,
  onAuthStateChanged: () => 1,
}));

jest.mock("@/views/LoginView", () => ({
  template: "<p>login page</p>",
}));

jest.mock("@/views/HomeView", () => ({
  template: "<p>home page</p>",
}));

jest.mock("firebase/auth", () => ({
  getAuth: () => 1,
  onAuthStateChanged: () => 1,
}));

describe("router state", () => {
  test("app route with isAuthentication = true", async () => {
    const router = createRouter({
      history: createWebHistory(process.env.BASE_URL),
      routes,
    });
    router.beforeEach(async (to) => {
      const currentUser = await getCurrentUser();
      console.log(currentUser);

      if (to.meta.authentication) {
        if (!currentUser) return { path: "/login" };
      }
    });
    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });
    await router.isReady();
    expect(wrapper.vm.$route.fullPath).toBe("/");
  });

  test("app route with isAuthentication = false", async () => {
    const router = createRouter({
      history: createWebHistory(process.env.BASE_URL),
      routes,
    });
    router.beforeEach(async (to) => {
      const currentUser = await getCurrentUser();
      if (to.meta.authentication) {
        if (!currentUser) return { path: "/login" };
      }
    });
    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });

    router.push("/");
    await router.isReady();
    expect(wrapper.vm.$route.fullPath).toBe("/login");
  });
});
