const optionMap = {
  default: [
    {
      center: [-0.113049, 51.498568],
      zoom: 14,
      attribution: false,
    },
    {
      id: "base",
      option: {
        urlTemplate:
          "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
        subdomains: ["a", "b", "c", "d"],
        cssFilter: "sepia(20%) grayscale(20%) invert(90%)",
      },
    },
  ],
};

const mapOrder = {
  bind: (el, binding) => {
    const ins = creatMap({
      target: el,
      option: binding.arg ? optionMap[binding.arg] : optionMap.default,
    });
    el.map = ins;
  },
  unbind: (el) => {
    el.map.remove();
    el.map = null;
  },
};

function creatMap({ target, option }) {
  const mapOption = {
    ...option[0],
    baseLayer: new window.$maptalks.TileLayer(option[1].id, {
      ...option[1].option,
    }),
  };
  const ins = new window.$maptalks.Map(target, mapOption);
  return ins;
}

export default mapOrder;
