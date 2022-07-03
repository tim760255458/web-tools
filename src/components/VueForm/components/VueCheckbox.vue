<template>
  <el-checkbox-group v-model="selectValue" v-bind="allOptions">
    <template v-for="item of arr">
      <component
        :is="childName"
        :key="item[optionProp.value]"
        :label="item[optionProp.value]"
        v-bind="item.prop || {}"
        >{{ item[optionProp.label] }}</component
      >
    </template>
  </el-checkbox-group>
</template>

<script>
export default {
  name: "VueCheckbox",
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    optionProp: {
      type: Object,
      default: () => ({ label: "label", value: "value" }),
    },
    dictionaryKey: {
      type: String,
      default: "",
    },
    childName: {
      type: String,
      default: "el-checkbox",
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

<style></style>
