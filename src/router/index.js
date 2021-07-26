import { createRouter, createWebHistory } from "vue-router";

import World from "../components/World.vue";
import Vietnam from "../components/Vietnam.vue";
import Vaccine from "../components/Vaccine.vue";
import VaccineInfo from "../components/VaccineInfo.vue";
import Admin from "../components/Admin.vue";

const routes = [
  {
    path: "/",
    component: Vietnam,
  },
  {
    path: "/world",
    component: World,
  },
  {
    path: "/vaccine",
    component: Vaccine,
  },
  {
    path: "/admin/get",
    component: Admin,
  },
  {
    path: "/vaccineInfo",
    component: VaccineInfo,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
