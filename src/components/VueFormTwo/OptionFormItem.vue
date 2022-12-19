<template>
  <el-form-item v-bind="options.attrs" v-if="!options.attrs.toggle || isShow()">
    <template v-if="options.render">
      <component
        :is="options.render.is"
        v-bind="options.render"
        v-model="value"
      />
    </template>
    <template v-if="options.children">
      <option-form-item
        v-for="item in options.children"
        :key="item.key"
        :options="item"
      />
    </template>
  </el-form-item>
</template>
<script>
import VueSelect from "../VueForm/components/VueSelect.vue";
import VueRadio from "../VueForm/components/VueRadio.vue";
import VueCheckbox from "../VueForm/components/VueCheckbox.vue";
import VueCascader from "../VueForm/components/VueCascader.vue";
import VueUpload from "../VueForm/components/VueUpload.vue";

export default {
  name: "OptionFormItem",
  inject: ["getFormModel", "setFormModel", "isShow"],
  components: {
    VueSelect,
    VueRadio,
    VueCheckbox,
    VueCascader,
    VueUpload,
  },
  props: {
    options: {
      type: Object,
      default: () => ({
        attrs: {},
      }),
    },
  },
  computed: {
    value: {
      get() {
        return this.getFormModel()[this.options.attrs.prop];
      },
      set(val) {
        this.setFormModel(this.options.attrs.prop)(val);
      },
    },
  },
};
</script>
