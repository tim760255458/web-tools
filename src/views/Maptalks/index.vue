<template>
  <div class="page">
    <h2>maptalks 渲染优化</h2>
    <el-row :gutter="10" class="w-full">
      <el-col :xs="24" :sm="24" :md="24" :lg="24">
        <el-card shadow="hover" :body-style="{ padding: '5px' }">
          <div slot="header" class="el-card-header">
            <span>大量数据的渲染优化</span>
          </div>
          <div v-map ref="map1" style="height: 400px"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    dots: [],
  }),
  methods: {
    mockDots() {
      this.dots = [];
    },
    initMap1() {},
  },
};
</script>

<style lang="scss" scoped>
</style>