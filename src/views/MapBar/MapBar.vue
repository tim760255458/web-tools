<template>
  <div class="map-bar">
    <template v-for="item of options">
      <map-bar-item :key="item.id" :option="item" />
    </template>
  </div>
</template>

<script>
import MapBarItem from "./MapBarItem.vue";

export default {
  components: { MapBarItem },
  props: {
    options: {
      type: Array,
      require: true,
    },
  },
  provide() {
    return {
      clickNodeCb: this.clickNode,
    };
  },
  methods: {
    clickNode(...args) {
      this.$emit("click-node", ...args);
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
