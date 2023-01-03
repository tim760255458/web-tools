export const title = "饼图渐变";

export const exampleData = [
  {
    name: "快速路",
    value: 134,
    percent: 38,
    color: "rgba(7, 223, 255, 1)",
  },
  { name: "支路", value: 23, percent: 18, color: "rgba(100, 100, 100, 1)" },
  {
    name: "次干道",
    value: 22,
    percent: 39,
    color: "rgba(255, 160, 73, 1)",
  },
  { name: "主干道", value: 18, percent: 5, color: "rgba(37, 189, 151, 1)" },
  { name: "其它", value: 18, percent: 5, color: "rgba(234, 104, 162, 1)" },
];

export function getOption(obj, chartDomSize) {
  return {
    series: [
      {
        type: "pie",
        radius: ["10%", "40%"],
        center: ["50%", "50%"],
        clockwise: true,
        avoidLabelOverlap: true,
        label: { show: true, alignTo: "edge", margin: "8%" },
        itemStyle: {
          color: (params) => {
            const startColor = params.data.color.slice(0, -2) + "0.9)";
            const endColor = params.data.color.slice(0, -2) + "0)";
            return {
              type: "radial",
              x: chartDomSize.width / 2,
              y: chartDomSize.height / 2,
              r: (chartDomSize.height / 2) * 0.76, // 0.76 是从这里取得 radius: ["10%", "40%"]
              colorStops: [
                {
                  offset: 0,
                  color: endColor, // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: startColor, // 100% 处的颜色
                },
              ],
              global: true,
            };
          },
        },
        data: obj.map((el) => ({
          ...el,
          label: { color: el.color },
        })),
      },
    ],
  };
}

export default getOption;
