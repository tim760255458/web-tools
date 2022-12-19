import renderTable from "./renderTable.js";
import "./vue-table.css";

export default {
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Array,
      default: () => [],
    },
    options: {
      type: Object,
      default: () => ({}),
    },
    loading: {
      type: Boolean,
      default: false,
    },
    loadingOptions: {
      type: Object,
      default: () => ({
        "element-loading-text": "加载中",
        "element-loading-spinner": "el-icon-loading",
        "element-loading-background": "rgba(0, 0, 0, 0.8)",
      }),
    },
    callback: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    tableRef: "tableRef",
    tableIns: {},
  }),
  computed: {
    allOptions() {
      return {
        ...this.options,
        ...this.$attrs,
        data: this.data,
      };
    },
  },
  mounted() {
    this.tableIns = this.$refs[this.tableRef];
  },
  watch: {
    data() {
      this.$nextTick(() => {
        this.tableIns.doLayout();
      });
    },
  },
  render: function (h) {
    return renderTable(h, this);
  },
};
