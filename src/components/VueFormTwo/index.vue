<template>
  <el-form
    v-bind="options.attrs"
    :model="formModel"
    ref="form"
    @submit.native.prevent
  >
    <transition-group tag="div" name="slide" appear move-class="slide-move">
      <template v-for="item in options.items">
        <option-form-item :key="item.key" :options="item" />
      </template>
    </transition-group>
  </el-form>
</template>
<script>
import OptionFormItem from "./OptionFormItem.vue";
import initBus from "./store.js";
export default {
  props: {
    /**
     * options 格式
     * {
     *   attrs: { size: 'mini', inline: true }, // el-form 配置
     *   items: [
     *     {
     *       attrs: { prop: 'name', label: '名称', default: '...', toggle: true }, // el-form-item 配置，default 默认值，toggle 是否响应显隐(为true时响应响应显隐，默认不展示；为false时不响应显隐)
     *       render: { is: 'el-input', placeholder: '请输入’, style: {...} }, // 表单组件配置
     *       children: [...], // el-form-item 嵌套
     *     }
     *   ]
     * }
     */
    options: {
      type: Object,
      default: () => ({ attrs: {}, items: [] }),
    },
  },
  components: { OptionFormItem },
  provide() {
    return {
      getFormModel: () => this.formModel,
      setFormModel: (prop) => (value) => this.$set(this.formModel, prop, value),
      isShow: () => this.isShow,
      bus: () => this.bus,
    };
  },
  data: () => ({
    formModel: {},
    isShow: false,
    bus: null,
  }),
  created() {
    this.bus = initBus();
    this.setFormModelByOptions();
  },
  methods: {
    getFormModel() {
      return this.formModel;
    },
    command(name, params = []) {
      return this.$refs.form[name](...params);
    },
    setFormModelByOptions() {
      const result = {};
      function fn(arr) {
        arr.forEach((el) => {
          if (el.attrs && el.attrs.prop) {
            result[el.attrs.prop] = el.attrs.default || null;
          }
          if (el.children) {
            fn(el.children);
          }
        });
      }
      fn(this.options.items);
      this.formModel = result;
    },
    toggleItem() {
      this.isShow = !this.isShow;
    },
    setDictionary(key, arr = []) {
      this.bus.$emit("set-dic", key, arr);
    },
    setFormModel(obj) {
      Object.entries(obj).forEach(([key, value]) => {
        this.$set(this.formModel, key, value);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}
.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
.slide-move {
  transition: all 0.3s;
}
</style>
