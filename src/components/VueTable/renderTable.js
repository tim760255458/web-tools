import renderColumn from "./renderColumn.js";

export default function renderTable(h, ins) {
  return h(
    "el-table",
    {
      class: "vue-table",
      ref: ins.tableRef,
      props: ins.allOptions,
      attrs: ins.loadingOptions,
      directives: [
        {
          name: "loading",
          value: ins.loading,
        },
      ],
      scopedSlots: {
        empty: ins.$scopedSlots.empty,
        append: ins.$scopedSlots.append,
      },
      // 将 el-table 实例作为每个事件监听的第一个参数
      on: Object.keys(ins.callback).reduce(
        (a, b) => ({ ...a, [b]: (...args) => ins.callback[b](ins, ...args) }),
        {}
      ),
    },
    ins.columns.map((column, index) => renderColumn(h, ins, column, index))
  );
}
