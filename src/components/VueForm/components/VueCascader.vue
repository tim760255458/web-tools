<template>
  <el-cascader
    v-model="selectValue"
    v-bind="allOptions"
    :options="arr"
  ></el-cascader>
</template>
<script>
export default {
  name: "VueCascader",
  props: {
    value: {
      type: [Array, String],
      default: () => [],
    },
    dictionaryKey: {
      type: String,
      default: "",
    },
  },
  inject: ["bus"],
  computed: {
    selectValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val || []);
      },
    },
    allOptions() {
      return this.$attrs;
    },
    arr() {
      return this.dictionaryKey ? this.busIns.getDic(this.dictionaryKey) : [];
    },
    busIns() {
      return this.bus();
    },
  },
};
</script>
