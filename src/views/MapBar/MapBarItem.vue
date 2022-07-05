<template>
  <div class="map-bar-item">
    <div class="map-bar-item-inner" @click.stop="clickNodeCb(option)">
      <div :class="['map-bar-item-inner-iconbox', bgIcon]">
        <div
          :class="['map-bar-item-inner-iconbox-icon', `icon_${option.icon}`]"
        ></div>
      </div>
      <span class="map-bar-item-inner-label">{{ option.label }}</span>
    </div>

    <transition name="fade">
      <div class="map-bar-item-children" v-show="showChildren">
        <template v-for="child of option.children">
          <map-bar-item :key="child.id" :option="child" />
        </template>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "MapBarItem",
  props: {
    option: {
      type: Object,
      require: true,
    },
  },
  inject: ["clickNodeCb"],
  computed: {
    bgIcon() {
      const { isLeafSelect, isSelect } = this.option;
      return isSelect
        ? "icon_map_icon_active"
        : isLeafSelect
        ? "icon_map_icon"
        : "";
    },
    showChildren() {
      const result =
        this.option.children &&
        this.option.children.length > 0 &&
        this.option.isExpand;
      return result;
    },
  },
  data: () => ({}),
};
</script>

<style lang="scss" scoped>
.map-bar-item {
  position: relative;
  &-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 4px 0 0 0;
    cursor: pointer;
    &-iconbox {
      width: 50px;
      height: 50px;
      padding: 5px;
      box-sizing: border-box;
      background-repeat: no-repeat;
      background-size: auto;
      background-position: center;
      &-icon {
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-size: auto;
        background-position: center;
      }
    }
    &-label {
      color: #fff;
      font-size: 12px;
    }
  }
  &-children {
    position: absolute;
    top: -78px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 10px;
    height: 78px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  top: -60px;
}

$icons: map_icon, map_icon_active, icon_gzqy, icon_tcc, icon_wtrd;
@each $icon in $icons {
  .icon_#{$icon} {
    background-image: url("../../assets/mapbar/#{$icon}.png");
  }
}
</style>
