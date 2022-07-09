<template>
  <el-menu default-active="/home" router>
    <template v-for="route of routeArr">
      <el-menu-item :key="route.value" :index="route.value">
        <i :class="route.icon"></i>
        <span slot="title">{{ route.label }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script>
export default {
  data: () => ({
    routeArr: [
      { label: "首页", value: "/home", icon: "el-icon-house" },
      { label: "地图工具", value: "/map", icon: "el-icon-location-outline" },
      { label: "PDF导出", value: "/exportpdf", icon: "el-icon-tickets" },
      { label: "Threejs", value: "/three", icon: "el-icon-video-camera" },
      { label: "图表", value: "/chart", icon: "el-icon-pie-chart" },
      { label: "VueTable 组件", value: "/table", icon: "el-icon-coin" },
      {
        label: "VueForm 组件",
        value: "/form",
        icon: "el-icon-c-scale-to-original",
      },
      {
        label: "地图托盘",
        value: "/mapbar",
        icon: "el-icon-map-location",
      },
      {
        label: "Maptalks",
        value: "/maptalks",
        icon: "el-icon-map-location",
      },
      {
        label: "虚拟树",
        value: "/vtree",
        icon: "el-icon-postcard",
      },
    ],
  }),
};
</script>

<style></style>
