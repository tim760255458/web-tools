export default function renderColumn(h, ins, column, index) {
  return h(
    "el-table-column",
    {
      key: column.prop || index,
      props: column,
      scopedSlots: column.type
        ? {}
        : {
            header: (props) =>
              ins.$scopedSlots[`${column.prop}_header`]
                ? ins.$scopedSlots[`${column.prop}_header`](props)
                : column.label,
            default: (props) =>
              ins.$scopedSlots[column.prop]
                ? ins.$scopedSlots[column.prop](props)
                : props.row[column.prop],
          },
    },
    column.children && column.children.length > 0
      ? column.children.map((child, idx) => renderColumn(h, ins, child, idx))
      : []
  );
}
