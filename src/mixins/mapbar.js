import { formatMapbar } from "../utils/mapbar";

export default {
  data: () => ({
    // 数据示例
    // mapbarArr: [
    //   {
    //     id: "spjk",
    //     // ... 添加需要的任何字段
    //     children: [
    //       {
    //         id: "spjk_1",
    //       },
    //       {
    //         id: "spjk_2",
    //       },
    //     ],
    //   },
    //   {
    //     id: "xhj",
    //     children: [
    //       {
    //         id: "xhj_1",
    //       },
    //       {
    //         id: "xhj_2",
    //       },
    //     ],
    //   },
    // ],
    // selectMapBar: ["spjk", "spjk_1", "xhj_1"],
  }),
  computed: {
    mapbarItems() {
      const result = formatMapbar(this.mapbarArr, this.selectMapBar);
      return result;
    },
  },
  methods: {},
};
