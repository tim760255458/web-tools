<template>
  <el-select v-model="selectValue" v-bind="allOptions">
    <el-option
      v-for="item in arr"
      :key="item[optionProp.value]"
      :label="item[optionProp.label]"
      :value="item[optionProp.value]"
    ></el-option>
  </el-select>
</template>

<script>
export default {
  name: "VueSelect",
  props: {
    value: {
      type: [Boolean, String, Number],
      default: null,
    },
    optionProp: {
      type: Object,
      default: () => ({ label: "label", value: "value" }),
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
        this.$emit("input", val || null);
      },
    },
    allOptions() {
      return { placeholder: "请选择", ...this.$attrs };
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

<style></style>
