<template>
  <div class="vue-upload" v-on="$listeners">
    <el-upload>
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>
</template>

<script>
export default {
  data: () => ({}),
  computed: {},
  mounted() {
    console.log(this.$listeners);
  },
};
</script>

<style>
.vue-upload {
  position: absolute;
  top: 10px;
  left: 410px;
  color: #ddd;
}
</style>
