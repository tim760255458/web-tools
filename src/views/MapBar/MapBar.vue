<template>
  <div class="map-bar">
    <template v-for="item of options">
      <map-bar-item :key="item.id" :option="item" />
    </template>
  </div>
</template>

<script>
import MapBarItem from "./MapBarItem.vue";
import {
  formatMapbar,
  removeNodeSelect,
  addNodeSelect,
  expandNode,
} from "../../utils/mapbar";

export default {
  components: { MapBarItem },
  props: {
    items: {
      type: Array,
      require: true,
    },
    value: {
      type: Array,
      require: true,
    },
    /**
     * 是否联动选中后代节点
     * 为 true 时，点击当前节点，它的后代节点都会被选中或取消选中
     * 为 false 时，点击当前节点，有两种情况，为叶子节点时切换自身选中状态；非叶子节点时，切换展开状态
     */
    link: {
      type: Boolean,
      default: false,
    },
    callback: {
      type: Object,
      default: () => ({}),
    },
  },
  provide() {
    return {
      clickNodeCb: this.clickNode,
    };
  },
  computed: {
    options() {
      const result = formatMapbar(this.itemArr, this.selects);
      return result;
    },
    selects: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
    itemArr: {
      get() {
        return this.items;
      },
      set(val) {
        this.$emit("update:items", val);
      },
    },
  },
  methods: {
    clickNode(node) {
      this.callback["click"](node);
      if (this.link) {
        this.selects = node.isSelect
          ? removeNodeSelect(node, this.selects)
          : addNodeSelect(node, this.selects);
      } else {
        if (node.children && node.children.length) {
          this.itemArr = expandNode(node, this.itemArr);
        } else {
          this.selects = node.isSelect
            ? removeNodeSelect(node, this.selects)
            : addNodeSelect(node, this.selects);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.map-bar {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(calc(-50% - 179px));

  display: flex;
  gap: 10px;

  height: 78px;
  margin: 0 179px;
  padding: 0 20px;

  background-image: url("../../assets/mapbar/bg-mid.png");
  background-repeat: no-repeat;
  background-position: top center;
  background-size: 100% auto;

  &::before {
    content: " ";
    display: block;
    width: 179px;
    height: 100%;
    position: absolute;
    left: -179px;
    top: 0;
    background-image: url("../../assets/mapbar/bg-left.png");
    background-repeat: no-repeat;
    background-position: top right;
    background-size: auto;
  }

  &::after {
    content: " ";
    display: block;
    width: 179px;
    height: 100%;
    position: absolute;
    right: -179px;
    top: 0;
    background-image: url("../../assets/mapbar/bg-right.png");
    background-repeat: no-repeat;
    background-position: top left;
    background-size: auto;
  }
}
</style>
