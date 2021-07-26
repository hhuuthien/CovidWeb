import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import HighchartsVue from "highcharts-vue";
import Highcharts from "highcharts";
import mapInit from "highcharts/modules/map";

mapInit(Highcharts);

createApp(App)
  .use(router)
  .use(HighchartsVue)
  .mount("#app");
