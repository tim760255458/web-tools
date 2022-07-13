<template>
  <div class="virtual-tree" @scroll="handleScroll">
    <div
      class="virtual-tree-wrap"
      :style="{ height: `${itemHeight * virtualTreeIns._formatTree.length}px` }"
    ></div>
    <div
      class="virtual-tree-content"
      :style="{ transform: `translateY(${scrollNum * itemHeight}px)` }"
    >
      <template v-for="(item, idx) of list">
        <div
          :key="idx"
          class="virtual-tree-content-item"
          :style="{ height: itemHeight + 'px' }"
        >
          <!-- 空白块，用于缩进不同级别节点 -->
          <div class="virtual-tree-content-item__space" v-if="item.level - 1">
            <template v-for="num in item.level - 1">
              <div
                :key="`${idx}_${num}`"
                class="virtual-tree-content-item__space__item"
              ></div>
            </template>
          </div>
          <!-- checkbox 选择器 -->
          <div v-if="showCheckbox" class="virtual-tree-content-item__check">
            <slot name="checkbox" :node="item">
              <input type="checkbox" :checked="item.checked" />
            </slot>
          </div>
          <!-- expaned 选择器 -->
          <div
            class="virtual-tree-content-item__toggle"
            @click="virtualTreeIns._toggle(item.id)"
          >
            <slot name="toggle" :node="item">
              <img
                :class="[
                  'virtual-tree-content-item__toggle__icon',
                  item.expanded ? 'open' : 'close',
                ]"
                src="../../assets/logo.png"
              />
            </slot>
          </div>
          <!-- 节点内容 -->
          <div class="virtual-tree-content-item__content">
            <slot name="node">{{ item.label }}</slot>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import VirtualTreeTool from "../../utils/virtualTree";

export default {
  name: "VirtualTree",
  props: {
    itemHeight: { type: Number, default: 40 },
    renderNum: { type: Number, default: 20 },
    data: {
      type: Array,
      default: () => [],
    },
    nodeKey: String,
    showCheckbox: { type: Boolean, default: false },
  },
  data: () => ({
    virtualTreeIns: { _formatTree: [] },
    scrollNum: 0,
    list: [],
  }),
  mounted() {
    this.initVirtualTree();
  },
  methods: {
    initVirtualTree() {
      this.virtualTreeIns = new VirtualTreeTool({
        tree: this.data,
        expandedKeys: [5],
        renderNum: this.renderNum,
      });
      this.list = this.virtualTreeIns.render(0);
    },
    handleScroll(event) {
      const scrollTop = event.target.scrollTop;
      this.scrollNum = Math.floor(scrollTop / this.itemHeight);
      this.list = this.virtualTreeIns.render(this.scrollNum);
    },
  },
};
</script>

<style lang="scss" scoped>
.virtual-tree {
  height: 100%;
  position: relative;
  overflow: auto;
  &-wrap,
  &-content {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: beige;
  }
  &-content {
    &-item {
      display: flex;
      align-items: center;
      background-color: bisque;
      cursor: pointer;
      &:hover {
        background-color: aliceblue;
      }
      &__space {
        height: 100%;
        display: flex;
        &__item {
          width: 20px;
          height: 100%;
        }
      }
      &__check {
      }
      &__toggle {
        &__icon {
          width: 14px;
          height: 14px;
          object-fit: scale-down;
          transition: all 0.1s;
          &.open {
            transform: rotateY(180deg);
          }
          &.close {
          }
        }
      }
      &__content {
        flex: 1 0;
      }
    }
  }
}
</style>