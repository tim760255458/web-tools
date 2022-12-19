<template>
  <div class="vue-upload">
    <el-upload
      v-bind="allOptions"
      :file-list="fileList"
      :on-success="handleSuccess"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
    >
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
    <el-dialog
      title="图片预览"
      :visible.sync="visibleDialog"
      width="600px"
      :modal="false"
      append-to-body
    >
      <div style="text-align: center">
        <default-image height="200px" :urls="previewUrl" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import DefaultImage from "./default-image.vue";

export default {
  props: {
    value: Array,
  },
  components: { DefaultImage },
  data: () => ({
    fileList: [],
    previewUrl: "",
    visibleDialog: false,
  }),
  computed: {
    allOptions() {
      return {
        // 接口地址
        action: "api address",
        // 要上传的请求参数、
        data: {},
        ...this.$attrs,
      };
    },
  },
  watch: {
    value() {
      this.fileList = JSON.parse(JSON.stringify(this.value)).map((url) => {
        const matchArr = url.match(/\/(.*)\$\$/);
        return {
          name: matchArr ? matchArr[1] : url,
          url: url,
          href: url,
          status: "success",
        };
      });
    },
  },
  methods: {
    handleSuccess(res, file) {
      const obj = {
        name: file.name,
        url: res.data.url, // 根据接口实际返回的内容取值
        href: res.data.fullUrl, // 根据接口实际返回的内容取值
        status: "success",
      };
      if (this.allOptions.multiple) {
        this.fileList.push(obj);
      } else {
        this.fileList = [obj];
      }
      this.$emit(
        "input",
        this.fileList.map((el) => el.url)
      );
    },
    handlePreview(file) {
      this.previewUrl = file.url;
      this.visibleDialog = true;
    },
    handleRemove(file, fileList) {
      this.fileList = fileList;
      this.$emit(
        "input",
        this.fileList.map((el) => el.url)
      );
    },
  },
};
</script>

<style>
.vue-upload {
  color: #ddd;
}
</style>
