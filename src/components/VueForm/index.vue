<template>
  <el-form
    class="vue-form"
    :ref="formRef"
    :model="formModel"
    v-bind="allOptions"
  >
    <template v-for="item of renderItems">
      <el-form-item
        v-if="item.toggle ? toggleItem : true"
        :key="item.itemOptions.prop"
        v-bind="item.itemOptions"
      >
        <template #label>
          <slot
            :name="`${item.itemOptions.prop}_label`"
            :formModel="formModel"
            :formItem="item"
            :formIns="formIns"
          ></slot>
        </template>
        <slot
          :name="item.itemOptions.prop"
          :formModel="formModel"
          :formItem="item"
          :formIns="formIns"
        >
          <!-- v-on 为每个事件添加 表单实例formIns 作为第一个参数 -->
          <component
            v-if="item.inputOptions.is"
            :is="item.inputOptions.is"
            :ref="item.itemOptions.prop"
            v-model="formModel[item.itemOptions.prop]"
            v-bind="{ ...item.inputOptions.props, ...item.inputOptions.attrs }"
            v-on="item.inputOptions.callback"
          ></component>
        </slot>
      </el-form-item>
    </template>
    <el-form-item v-if="hasToggleItem && showToggleBtn">
      <slot name="toggle_btn">
        <el-button type="text" @click="handlerToggle">
          展示
          <i
            :class="!toggleItem ? 'el-icon-arrow-down' : 'el-icon-arrow-up'"
          ></i>
        </el-button>
      </slot>
    </el-form-item>
  </el-form>
</template>
<script>
import VueSelect from "./components/VueSelect.vue";
import VueRadio from "./components/VueRadio.vue";
import VueCheckbox from "./components/VueCheckbox.vue";
import VueCascader from "./components/VueCascader.vue";
import initBus from "./store.js";

export default {
  components: {
    VueSelect,
    VueRadio,
    VueCheckbox,
    VueCascader,
  },
  props: {
    options: {
      type: Object,
      default: () => ({
        size: "mini",
      }),
    },
    items: {
      // toggle 是否显隐 Boolean
      // noRender 不渲染 Boolean
      // itemOptions el-form-item的配置 Object 必须
      // inputOptions 表单组件的配置 Object 必须
      //   is 组件名 String
      //   defaultValue 默认值 any
      //   callback 事件 Object
      //   props 表单组件参数 Object
      //   attrs 表单组件attrs Object
      type: Array,
      default: () => [],
    },
    showToggleBtn: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    hasToggleItem() {
      return this.renderItems.some((el) => el.toggle);
    },
    allOptions() {
      return {
        ...this.options,
        ...this.$attrs,
      };
    },
    renderItems() {
      return this.items.filter((el) => !el.noRender);
    },
  },
  provide() {
    return {
      bus: () => this.bus,
    };
  },
  data: () => ({
    formRef: Symbol(),
    formIns: {},
    formModel: {},
    toggleItem: false,
    bus: null,
  }),
  created() {
    this.formModel = this.items.reduce(
      (a, b) =>
        b.itemOptions.prop
          ? { ...a, [b.itemOptions.prop]: b.inputOptions.defaultValue || null }
          : a,
      {}
    );
    this.bus = initBus();
  },
  mounted() {
    this.formIns = this.$refs[this.formRef];
  },
  methods: {
    resetFields() {
      this.formIns.resetFields();
    },
    validate() {
      return this.formIns.validate();
    },
    handlerToggle() {
      this.toggleItem = !this.toggleItem;
    },
    getFormModel() {
      return this.formModel;
    },
    getFormIns() {
      return this.formIns;
    },
    getFormItemIns(refName) {
      return this.$refs[refName];
    },
    setDictionary(key, arr = []) {
      this.bus.$emit("set-dic", key, arr);
    },
  },
};
</script>
