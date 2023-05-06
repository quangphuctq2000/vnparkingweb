import { initRouter } from "@/router/index";
import { mount } from "@vue/test-utils";

jest.mock("vuefire", () => ({
  getCurrentUser: jest
    .fn()
    .mockReturnValueOnce({ username: "quangphuctq" })
    .mockReturnValueOnce(null)
    .mockReturnValueOnce(null)
    .mockReturnValueOnce(null)
    .mockReturnValueOnce({ username: "quangphuctq" })
    .mockReturnValueOnce({ username: "quangphuctq" })
    .mockReturnValueOnce({ username: "quangphuctq" })
    .mockReturnValueOnce({ username: "quangphuctq" }),

  getAuth: () => 1,
  onAuthStateChanged: () => 1,
}));

jest.mock("@/views/LoginView", () => ({
  template: "<p>login page</p>",
}));

jest.mock("@/views/SignupView", () => ({
  template: "<p>signup page</p>",
}));

jest.mock("@/views/HomeView", () => ({
  template: "<p><router-view></router-view></p>",
}));
jest.mock("@/views/parking-stations/ParkingStationsView", () => ({
  template: "<p>parking stations page</p>",
}));
jest.mock("@/views/ProfileView", () => ({
  template: "<p>profile page</p>",
}));

jest.mock("firebase/auth", () => ({
  getAuth: () => 1,
  onAuthStateChanged: () => 1,
}));

describe("router state", () => {
  test("app route with isAuthentication = true", async () => {
    const router = initRouter();
    router.push({ path: "/" });
    await router.isReady();
    expect(router.currentRoute.value.fullPath).toBe("/");
  });

  test("app route with isAuthentication = false", async () => {
    const router = initRouter();
    router.push({ path: "/" });
    await router.isReady();
    expect(router.currentRoute.value.fullPath).toBe("/login");
  });
});

describe("app state", () => {
  const App = {
    template: "<div><router-view></router-view></div>",
  };

  test("login page", async () => {
    const router = initRouter();
    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });
    await router.isReady();
    expect(wrapper.html()).toContain("login page");
  });
  test("signup page", async () => {
    const router = initRouter();
    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });
    router.push({ path: "/signup" });
    await router.isReady();
    expect(wrapper.html()).toContain("signup page");
  });
  test("home page", async () => {
    const router = initRouter();
    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });
    router.push({ path: "/" });
    await router.isReady();
    expect(wrapper.html()).toContain("parking stations page");
  });
  test("parking-stations page", async () => {
    const router = initRouter();
    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });
    router.push({ path: "/parking-stations" });
    await router.isReady();
    expect(wrapper.html()).toContain("parking stations page");
  });
  test("profile page", async () => {
    const router = initRouter();
    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });
    router.push({ path: "/profile" });
    await router.isReady();
    expect(wrapper.html()).toContain("profilee page");
  });
});
