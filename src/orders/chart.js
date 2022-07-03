import * as echarts from "echarts";

/**
 * @param binding.modifiers.refresh - true 每次都重新渲染
 */
const chartOrder = {
  inserted: (el, binding) => {
    const ins = echarts.init(el);
    ins.setOption(binding.value, Boolean(binding.modifiers.refresh));
    el.chart = ins;
  },
  update: (el, binding) => {
    el.chart.setOption(binding.value, Boolean(binding.modifiers.refresh));
  },
  unbind: (el) => {
    el.chart.dispose();
  },
};

export default chartOrder;
