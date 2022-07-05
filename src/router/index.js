import Vue from "vue";
import VueRouter from "vue-router";
import DefaultLayout from "../components/DefaultLayout";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

export const routes = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: "",
        name: "index",
        redirect: "/home",
      },
      {
        path: "home",
        name: "home",
        component: Home,
      },
      {
        path: "exportpdf",
        name: "ExportPdf",
        component: () => import("../views/ExportPdf.vue"),
      },
      {
        path: "map",
        name: "Map",
        component: () => import("../views/Map.vue"),
      },
      {
        path: "chart",
        name: "Chart",
        component: () => import("../views/Chart.vue"),
      },
      {
        path: "three",
        name: "Three",
        component: () => import("../views/Three.vue"),
      },
      {
        path: "table",
        name: "Table",
        component: () => import("../views/VueTableCp.vue"),
      },
      {
        path: "form",
        name: "Form",
        component: () => import("../views/VueFormCp.vue"),
      },
      {
        path: "mapbar",
        name: "MapBar",
        component: () => import("../views/MapBar/index.vue"),
      },
      {
        path: "maptalks",
        name: "Maptalks",
        component: () => import("../views/Maptalks/index.vue"),
      }
    ],
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
