<template>
  <div class="page">
    <h2>maptalks 渲染优化</h2>
    <el-row :gutter="10" class="w-full">
      <el-col :xs="24" :sm="24" :md="24" :lg="24">
        <el-card shadow="hover" :body-style="{ padding: '5px' }">
          <div slot="header" class="el-card-header">
            <span>大量数据的渲染优化</span>
          </div>
          <div v-map ref="map1" style="height: 600px"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    mapIns: null,
    maptool: null,
    extent: null,
    dots: [],
    icon: require("../../assets/icon.png"),
  }),
  mounted() {
    setTimeout(() => {
      this.setMapIns();
      this.setMaptool();
      this.getViewExtent();
      this.createDots();
      this.renderDots();
    }, 0);
  },
  methods: {
    setMapIns() {
      this.mapIns = this.$refs.map1.map;
    },
    setMaptool() {
      this.maptool = new this.$MapTool(this.mapIns);
    },
    getViewExtent() {
      this.extent = this.mapIns.getExtent();
    },
    createDots() {
      const { xmin, ymin, xmax, ymax } = this.extent;
      this.dots = this.$turf.coordAll(
        this.$turf.randomPoint(1000, {
          bbox: [xmin, ymin, xmax, ymax],
        })
      );
    },
    renderDots() {
      this.maptool.addLayer({ id: "maptalks" });
      this.maptool.addGeometry({
        id: "maptalks",
        layerId: "maptalks",
        arr: this.dots.map((el, idx) => ({ id: idx, dots: el })),
        createGeometry: (obj) =>
          new this.$maptalks.Marker(obj.dots, {
            id: obj.id,
            symbol: {
              markerFile: this.icon,
              markerWidth: 16,
              markerHeight: 16,
            },
          }),
        setInfoWindow: (geometry) =>
          geometry.setInfoWindow({
            title: geometry.getId(),
            content: "test",
            autoOpenOn: null,
          }),
        listeners: {
          click: (event) => this.maptool.geometryClick({ event }),
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
