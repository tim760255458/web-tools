<template>
  <div class="page">
    <h2>v-map 指令 / maptool (操作地图方法集)</h2>
    <el-row :gutter="10" class="w-full">
      <el-col :xs="24" :sm="24" :md="8" :lg="6">
        <el-card shadow="hover" :body-style="{ padding: '5px' }">
          <div slot="header" class="el-card-header">
            <span>v-map 指令</span>
          </div>
          <div class="map" v-map></div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="8" :lg="6">
        <el-card shadow="hover" :body-style="{ padding: '5px' }">
          <div slot="header" class="el-card-header">
            <span>maptool 方法</span>
            <div>
              <el-button type="text" @click="handleToggleMarker"
                >控制显隐</el-button
              >
              <el-button type="text" @click="handleDrawPoint">绘制</el-button>
            </div>
          </div>
          <div class="map" ref="maptool" v-map></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Map",
  data: () => ({
    mapTool: null,
    list: [{ lng: -0.113049, lat: 51.498568 }],
    visibleMarker: true,
  }),
  mounted() {
    setTimeout(() => {
      this.initMapTool();
    }, 0);
  },
  methods: {
    initMapTool() {
      this.mapTool = new this.$MapTool(this.$refs.maptool.map);

      this.renderMarkerOnMap();
    },
    renderMarkerOnMap() {
      this.mapTool.addLayer({
        type: "VectorLayer",
        id: "layer",
      });
      this.mapTool.addGeometry({
        id: "ld",
        arr: this.list,
        createGeometry: this.createMarker,
        setInfoWindow: this.setInfoWindow,
        listeners: {
          click: this.markerClick,
        },
        layerId: "layer",
      });
    },
    createMarker(obj) {
      return new this.$maptalks.Marker([obj.lng, obj.lat], {
        symbol: {
          markerFile: require("../assets/logo.png"),
          markerWidth: 20,
          markerHeight: 20,
        },
      });
    },
    setInfoWindow(geometry) {
      geometry.setInfoWindow({
        title: "test",
        content: "test",
        autoOpenOn: null,
      });
    },
    markerClick(event) {
      this.mapTool.geometryClick({ event });
    },

    handleToggleMarker() {
      this.visibleMarker = !this.visibleMarker;
      this.mapTool.toggleVisible("ld", this.visibleMarker);
    },
    handleDrawPoint() {
      this.mapTool.draw({
        type: "Point",
        callback: (params) => {
          console.log(params.geometry);
          this.mapTool.disableDraw();
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.map {
  height: 300px;
}
</style>
