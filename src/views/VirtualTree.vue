<template>
  <div class="virtual-tree">
    <div class="virtual-tree-inner">
      <virtual-tree :data="treeData" showCheckbox />
    </div>
    <div class="virtual-tree-content"></div>
  </div>
</template>

<script>
import VirtualTree from "../components/VirtualTree";

export default {
  components: { VirtualTree },
  data: () => ({
    treeData: [],
  }),
  created() {
    this.initData();
  },
  methods: {
    initData() {
      this.treeData = [
        {
          id: 1,
          label: "节点1",
          children: [
            { id: 2, label: "节点2" },
            { id: 3, label: "节点3", children: [{ id: 5, label: "节点5" }] },
          ],
        },
        { id: 4, label: "节点4" },
        ...new Array(200)
          .fill(1)
          .map((el, idx) => ({ id: 6 + idx, label: `节点${6 + idx}` })),
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
.virtual-tree {
  &-inner {
    height: 200px;
  }
  &-content {
    font-size: 14px;
    color: #333;
  }
}
</style>
