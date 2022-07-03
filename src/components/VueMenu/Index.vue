<template>
  <el-menu unique-opened router>
    <template v-for="(route, idx) of routeArr">
      <menu-item :obj="route" :key="idx" />
    </template>
  </el-menu>
</template>

<script>
import { routes } from "@/router/index.js";
import MenuItem from "./MenuItem.vue";

export default {
  name: "AsideMenu",
  components: {
    MenuItem,
  },
  data: () => ({}),
  computed: {
    routeArr() {
      return routes.filter((route) => !route.hidden);
    },
  },
};
</script>

<style></style>
