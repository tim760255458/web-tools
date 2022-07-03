import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import "./styles/index.scss";

import * as maptalks from "maptalks";
import "maptalks/dist/maptalks.css";
import MapTool from "./utils/map";

import * as THREE from "three";

import bindDirect from "./utils/bindDirect";
import bindComponents from "./utils/bindComponents";

import * as dayjs from "dayjs";
import "dayjs/locale/zh-cn";

Vue.use(ElementUI, { size: "small" });

window.$maptalks = maptalks;
Vue.prototype.$maptalks = maptalks;
Vue.prototype.$MapTool = MapTool;

window.$three = THREE;
Vue.prototype.$three = THREE;

dayjs.locale("zh-cn");
Vue.prototype.$dayjs = dayjs;

bindDirect(Vue);
bindComponents(Vue);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
