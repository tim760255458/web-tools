<template>
  <div class="default-image">
    <el-image
      :style="{ height: height, width: 'auto' }"
      :src="url"
      :preview-src-list="urlArr"
    >
      <template #placeholder>
        <img class="no-image" :src="noImage" alt="暂无图片" />
      </template>
      <template #error>
        <img class="no-image" :src="noImage" alt="暂无图片" />
      </template>
    </el-image>
    <div :class="['default-image-total', totalPosition]" v-if="urls">
      共{{ urls.split(",").length }}张
    </div>
  </div>
</template>
<script>
// ! 获取文件完整链接的接口
import { getFileUrl } from "./service";

export default {
  props: {
    urls: String,
    height: { type: String, default: "32px" },
    // in 绝对定位到左上角 / out 紧随图片
    totalPosition: { type: String, default: "in" },
  },
  components: {},
  data: () => ({
    urlArr: [],
    // ! 无图片时的icon
    // noImage: require("@/assets/no_image.png"),
    noImage: "",
  }),
  computed: {
    url() {
      return this.urlArr[0] || "";
    },
  },
  watch: {
    urls() {
      this.formatUrls();
    },
  },
  mounted() {
    this.formatUrls();
  },
  methods: {
    async formatUrls() {
      if (this.urls) {
        const reqArr = this.urls.split(",").map((url) => getFileUrl(url));
        const resArr = await Promise.all(reqArr);
        this.urlArr = resArr.map(({ data }) =>
          URL.createObjectURL(new Blob([data]))
        );
      }
    },
  },
  beforeDestroy() {
    this.urlArr.forEach((url) => URL.revokeObjectURL(url));
    this.urlArr = [];
  },
};
</script>
<style lang="scss" scoped>
.default-image {
  position: relative;
  &-total {
    color: #fff;
    z-index: 1;
    font-size: 10px;
    line-height: 14px;
    pointer-events: none;
    &.in {
      position: absolute;
      top: 0;
      left: 0;
      background-color: #000;
      padding: 0 2px;
    }
    &.out {
      display: inline-block;
      margin-left: 2px;
      color: #d2d2d2;
    }
  }
}

.no-image {
  width: 100%;
  height: 100%;
  object-fit: scale-down;
}
</style>
