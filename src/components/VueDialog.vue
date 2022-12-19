<template>
  <el-dialog
    v-bind="option"
    :visible.sync="dialogVisible"
    @open="handlerOpenDialog"
    @close="handlerCloseDialog"
    class="vue-dialog"
  >
    <template v-if="customTitle" #title>
      <slot name="title"></slot>
    </template>
    <slot></slot>
    <template #footer>
      <slot name="footer"></slot>
    </template>
  </el-dialog>
</template>
<script>
export default {
  props: {
    value: Boolean,
    option: {
      type: Object,
      default: () => ({}),
    },
    customTitle: {
      type: Boolean,
      default: false,
    },
  },
  provide() {
    return {
      closeDialog: this.handleClose,
    };
  },
  computed: {
    dialogVisible: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
  data: () => ({}),
  methods: {
    handlerOpenDialog() {
      this.$emit("open");
    },
    handlerCloseDialog() {
      this.$emit("close");
    },
    handleClose() {
      this.$emit("input", false);
    },
  },
};
</script>
