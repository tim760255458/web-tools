/**
 * MapTool 地图操作方法集
 */

class MapTool {
  constructor(mapIns) {
    this.maptalks = window.$maptalks;
    this.mapIns = mapIns;

    this.layerIds = new Set();
    this.geometrys = new Map();

    this.drawCallback = () => {};
    this.drawTool = new this.maptalks["DrawTool"]({ mode: "Point" })
      .addTo(this.mapIns)
      .disable();
    this.drawTool.on("drawend", (params) => this.drawCallback(params));
  }

  /**
   * 添加 layer
   * @param {string} type layer 类型
   * @param {string} id layer ID（唯一）
   * @param {object} option layer 配置
   * @param {array} geometries layer 默认加载的 geometries
   */
  addLayer(obj = {}) {
    const { type = "VectorLayer", id, option = {}, geometries = [] } = obj;

    if (this.layerIds.has(id)) throw "layer 名称重复！";

    this.layerIds.add(id);
    new this.maptalks[type](id, geometries, {
      zIndex: this.layerIds.size + 1,
      ...option,
    }).addTo(this.mapIns);
  }

  /**
   * 添加 geometry
   * @param {string} id geometry 所属组id（依此 id 存储 geometry）
   */
  addGeometry(obj = {}) {
    const {
      id,
      arr,
      createGeometry,
      setInfoWindow,
      listeners = {},
      layerId,
    } = obj;

    if (!this.layerIds.has(layerId)) throw "layer 不存在！";
    if (arr.length === 0) return;

    const layer = this.mapIns.getLayer(layerId);
    const geometryArr = arr.map((el) => {
      const geometry = createGeometry(el);
      setInfoWindow ? setInfoWindow(geometry) : null;
      Object.entries(listeners).forEach(([key, listener]) =>
        geometry.on(key, listener)
      );
      return geometry;
    });
    this.geometrys.set(id, geometryArr);
    layer.addGeometry(geometryArr);
  }

  /**
   * geometry 点击事件
   * @param opendot 在哪个位置打开 - true:点击的位置；[lng,lat]:坐标位置；null: geometry中心坐标；
   * @param callback 点击后的回调
   * @param ins geometry 实例
   */
  geometryClick(obj) {
    const { ins, callback, opendot } = obj;

    const infoWindow = ins.getInfoWindow();
    if (infoWindow && infoWindow.isVisible()) {
      ins.closeInfoWindow();
      callback ? callback(false) : null;
    } else {
      if (Array.isArray(opendot)) {
        ins.openInfoWindow({ x: opendot[0], y: opendot[1] });
        callback ? callback(true) : null;
      } else if (opendot) {
        // TODO: event 无法获取，找其它实现方式
        ins.openInfoWindow(event.coordinate);
        callback ? callback(true) : null;
      } else {
        ins.openInfoWindow();
        callback ? callback(true) : null;
      }
    }
  }

  // 根据 id 显隐 geometry
  toggleVisible(id, visible) {
    if (this.geometrys.has(id)) {
      this.geometrys.get(id).forEach((geometry) => {
        visible ? geometry.show() : geometry.hide();
      });
    }
  }

  // 绘制
  draw(obj) {
    const { type, callback } = obj;
    if (!type) throw "未设置绘制类型";
    this.drawTool.setMode(type).enable();
    this.drawCallback = callback;
  }
  disableDraw() {
    this.drawTool.disable();
  }
}

export default MapTool;
