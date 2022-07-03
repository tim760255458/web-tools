<template>
  <el-container>
    <el-header>Tools</el-header>
    <el-container class="main">
      <el-aside width="200px">
        <aside-menu></aside-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AsideMenu from "./AsideMenu.vue";

export default {
  components: {
    AsideMenu,
  },
};
</script>

<style scoped>
.el-container {
  height: 100%;
}
.el-container.main {
  height: calc(100% - 60px);
}
.el-header {
  line-height: 60px;
  box-shadow: 0 0 4px #ccc;
  z-index: 1;
}
.el-aside {
}
.el-main {
  background-color: #f6f6f6;
  overflow: auto;
}
</style>
