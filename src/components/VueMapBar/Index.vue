<template>
  <div class="mapbar absolute" :class="items.length > 0 ? '' : 'no-item'">
    <template v-for="item of items">
      <div class="mapbar-item" :key="item.id" @click="handleClick(item)">
        <div
          :class="[
            'mapbar-item-icon',
            selectIds.includes(item.id) ? 'active' : '',
          ]"
        >
          <img class="mapbar-item-icon-inner" :src="item.icon" />
        </div>
        <div class="mapbar-item-label">{{ item.label }}</div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "MapBar",
  props: {
    value: {
      type: Array,
      required: true,
    },
    items: {
      // id 键
      // label 名称
      // icon 图标
      type: Array,
      default: () => [],
    },
  },
  computed: {
    selectIds: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
  data: () => ({
    selectId: null,
  }),
  mounted() {
    setTimeout(() => {
      this.selectIds.forEach((id) => {
        this.$emit(`select-${id}`, true);
      });
    }, 0);
  },
  methods: {
    handleClick(item) {
      if (this.selectIds.includes(item.id)) {
        // 取消选种
        this.selectIds = this.selectIds.filter((id) => id !== item.id);
        this.$emit(`select-${item.id}`, false);
      } else {
        // 选种
        this.selectIds = [...this.selectIds, item.id];
        this.$emit(`select-${item.id}`, true);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.mapbar {
  left: 50%;
  bottom: 15px;
  transform: translateX(-50%);
  height: 74px;
  box-sizing: border-box;
  padding-top: 9px;
  background-image: url("../../assets/mapbar/bg-mid.png");
  background-repeat: no-repeat;
  background-position: center top;
  background-size: 100% 59px;
  display: flex;
  &::before {
    content: "";
    display: block;
    width: 179px;
    height: 100%;
    background-image: url("../../assets/mapbar/bg-left.png");
    background-repeat: no-repeat;
    position: absolute;
    top: 0;
    left: -179px;
  }
  &::after {
    content: "";
    display: block;
    width: 179px;
    height: 100%;
    background-image: url("../../assets/mapbar/bg-right.png");
    background-repeat: no-repeat;
    position: absolute;
    top: 0;
    right: -179px;
  }
  &-item {
    width: 78px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    &-icon {
      width: 44px;
      height: 44px;
      background-image: url("../../assets/mapbar/map_icon.png");
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      transition: background-image 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      &.active {
        background-image: url("../../assets/mapbar/map_icon_active.png");
      }
      &-inner {
        width: 100%;
        height: 100%;
        object-fit: scale-down;
      }
    }
    &-label {
      font-size: 12px;
      color: #fff;
      height: 20px;
      line-height: 20px;
    }
  }
}

.no-item {
  visibility: hidden;
}
.absolute {
  position: absolute;
}
</style>
