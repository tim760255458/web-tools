<template>
  <div class="menu-item">
    <el-submenu v-if="obj.children" :index="obj.path">
      <template #title>
        <span>{{ obj.meta.name }}</span>
      </template>
      <template v-for="child of obj.children">
        <menu-item :key="child.path" :obj="child" />
      </template>
    </el-submenu>
    <el-menu-item v-else :index="obj.path">
      {{ obj.meta.name }}
    </el-menu-item>
  </div>
</template>

<script>
export default {
  name: "MenuItem",
  props: {
    obj: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style lang="scss" scoped></style>
