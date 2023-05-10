import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import SignupView from "@/views/SignupView.vue";
import ProfileView from "@/views/ProfileView.vue";
import NoPermisionView from "@/views/NoPermissionView.vue";
import ParkingView from "@/views/ParkingView.vue";
import RevenueView from "@/views/RevenueView.vue";
import CreateParkingStationView from "@/views/parking-stations/CreateParkingStation.vue";
import ParkingStationDetailView from "@/views/parking-stations/ParkingStationDetail.vue";
import ParkingStationsView from "@/views/parking-stations/ParkingStationsView.vue";
import { getCurrentUser } from "vuefire";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      authentication: true,
    },
    children: [
      {
        path: "",
        name: "home-default",
        component: ParkingStationsView,
        meta: {
          authentication: true,
        },
      },
      {
        path: "/parking-station",
        component: ParkingStationsView,
        meta: {
          authentication: true,
        },
        children: [
          {
            path: "",
            component: ParkingStationDetailView,
          },
          {
            path: "new",
            component: CreateParkingStationView,
          },
        ],
      },
      {
        path: "/profile",
        name: "profile",
        component: ProfileView,
        meta: {
          authentication: true,
        },
      },
      {
        path: "/parking",
        component: ParkingView,
      },
      {
        path: "/revenue",
        component: RevenueView,
      },
      {
        path: "/no-permission",
        component: NoPermisionView,
      },
    ],
  },
  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  // },
  {
    path: "/login",
    component: LoginView,
  },
  {
    path: "/signup",
    component: SignupView,
  },
];

export function initRouter() {
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
  return router;
}

export default initRouter();
