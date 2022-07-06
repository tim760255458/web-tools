<template>
  <div class="page">
    <h2>地图托盘逻辑封装，UI只需要映射节点状态</h2>
    <el-row :gutter="10" class="w-full">
      <el-col :xs="24" :sm="24" :md="24" :lg="24">
        <el-card shadow="hover" :body-style="{ padding: '5px' }">
          <div slot="header" class="el-card-header">
            <span
              >示例一（按钮primary样式代表选中节点本身，default样式代表有后代节点被选中，text样式代表未选中）</span
            >
          </div>
          <div class="mapbar">
            <template v-for="item of mapbarItems">
              <div class="mapbar-item" :key="item.id">
                <el-button
                  :type="item | formatBtnType"
                  @click.stop="handleClickNodeTwo(item)"
                  >{{ item.id }}</el-button
                >
                <div v-if="item.isExpand">
                  <template v-for="child of item.children">
                    <div class="mapbar-item" :key="child.id">
                      <el-button
                        :type="child | formatBtnType"
                        @click.stop="handleClickNode(child)"
                        >{{ child.id }}
                      </el-button>
                    </div>
                  </template>
                </div>
              </div>
            </template>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="24">
        <el-card shadow="hover" :body-style="{ padding: '5px' }">
          <div slot="header" class="el-card-header">
            <span>示例二（支持任意层级）</span>
          </div>
          <div class="mapbar2">
            <map-bar
              :items.sync="mapbarArr"
              v-model="selectMapBar"
              :callback="{ click: handleClickNodeThree }"
            />
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="24">
        <el-card shadow="hover" :body-style="{ padding: '5px' }">
          <div slot="header" class="el-card-header">
            <span>示例三（与地图联动）</span>
          </div>
          <div class="mapbar3">
            <div class="mapbar3-map" ref="maptool" v-map></div>
            <map-bar
              :items.sync="mapbarArr"
              v-model="selectMapBar"
              :callback="{ click: handleClickNodeThree }"
            />
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="24">
        <el-card shadow="hover" :body-style="{ padding: '5px' }">
          <div slot="header" class="el-card-header">
            <span>示例四（MapbarTool 类，简化使用）</span>
          </div>
          <div class="mapbar4">
            <map-bar2
              :items="mapbarArr"
              :selects="selectMapBar"
              :callback="{ click: handleClickNodeThree }"
            />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import MapBar from "./MapBar.vue";
import MapBar2 from "./MapBar2.vue";
import {
  removeNodeSelect,
  addNodeSelect,
  expandNode,
} from "../../utils/mapbar";
import mapbar from "../../mixins/mapbar";

export default {
  components: { MapBar, MapBar2 },
  mixins: [mapbar],
  filters: {
    formatBtnType(item) {
      return item.isSelect ? "primary" : item.isLeafSelect ? "default" : "text";
    },
  },
  data: () => ({
    mapbarArr: [
      {
        id: "spjk",
        icon: "icon_gzqy",
        label: "视频",
        // isExpand: true, // isExpand 可选参数，是否展开节点
        // ... 添加需要的任何字段
        children: [
          {
            id: "spjk_1",
            icon: "icon_tcc",
            label: "视频1",
          },
          {
            id: "spjk_2",
            icon: "icon_tcc",
            label: "视频2",
            children: [
              {
                id: "spjk_2_1",
                icon: "icon_tcc",
                label: "视频2-1",
              },
            ],
          },
        ],
      },
      {
        id: "xhj",
        icon: "icon_wtrd",
        label: "信号机",
        children: [
          {
            id: "xhj_1",
            icon: "icon_wtrd",
            label: "信号机1",
            isExpand: true,
          },
        ],
      },
    ],
    // 只填写选中的叶子节点id
    selectMapBar: ["spjk_1"],
    mapTool: null,
  }),
  mounted() {
    setTimeout(() => {
      this.initMapTool();
      this.toggleSpjk1({ id: "spjk_1", isSelect: true });
    }, 0);
  },
  methods: {
    // 此方法点击父节点时，会联动选中或取消选中叶子节点
    handleClickNode(node) {
      this.selectMapBar = node.isSelect
        ? removeNodeSelect(node, this.selectMapBar)
        : addNodeSelect(node, this.selectMapBar);
    },
    // 此方法点击父节点时，只控制是否显示子节点
    handleClickNodeTwo(node) {
      this.mapbarArr = expandNode(node, this.mapbarArr);
    },

    handleClickNodeThree(node) {
      if (!(node.children && node.children.length)) {
        switch (node.id) {
          case "spjk_1":
            this.toggleSpjk1(node);
            break;
        }
      }
    },

    initMapTool() {
      this.mapTool = new this.$MapTool(this.$refs.maptool.map);
    },
    loadSpjk1(node) {
      const { id, isSelect } = node;
      new Promise((resolve) => {
        setTimeout(() => {
          resolve([{ lng: -0.113049, lat: 51.498568, id: 1, name: "标题1" }]);
        }, 3000);
      }).then((res) => {
        this.mapTool.addGeometry({
          id,
          layerId: id,
          arr: res,
          createGeometry: (obj) =>
            new this.$maptalks.Marker([obj.lng, obj.lat], {
              id: obj.id,
              properties: obj,
              visible: isSelect,
              symbol: {
                markerFile: require("../../assets/logo.png"),
                markerWidth: 20,
                markerHeight: 20,
              },
            }),
          setInfoWindow: (geometry) =>
            geometry.setInfoWindow({
              title: geometry.getProperties().name,
              content: geometry.getProperties().name,
            }),
        });
      });
    },
    toggleSpjk1(node) {
      if (!this.mapTool.geometrys.has(node.id)) {
        if (!this.mapTool.layerIds.has(node.id)) {
          this.mapTool.addLayer({ id: node.id });
        }
        this.loadSpjk1(node);
      } else {
        this.mapTool.toggleVisible(node.id, !node.isSelect);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.mapbar {
  display: flex;
  height: 200px;

  &-item {
    margin: 10px;
    padding: 10px;
    border: 1px solid #2a2a2a;
  }
}

.mapbar2,
.mapbar4 {
  height: 300px;
  position: relative;
  background-color: #2a2a2a;
}

.mapbar3 {
  height: 500px;
  position: relative;
  background-color: #2a2a2a;

  &-map {
    width: 100%;
    height: 100%;
  }
}
</style>
