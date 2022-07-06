/**
 * MapTool 地图操作方法集
 * 数据不根据图层来分类，根据组来分类，每组有唯一id，
 * 一类数据可以分成多个组，渲染在不同的图层，一个图层可以渲染多个组，
 * 显隐通过组来控制，不通过图层
 */

class MapTool {
  constructor(mapIns) {
    this.maptalks = window.$maptalks;
    this.mapIns = mapIns;

    this.layerIds = new Set(); // 存图层 id
    this.geometrys = new Map(); // 根据组 id 存储 geometrys
    this.layerToGroup = new Map(); // 图层 -> 组[] 的映射

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
   * @param {array} arr 要添加的 geometry 列表
   * @param {Function} createGeometry 创建 geometry 的方法
   * @param {Function} setInfoWindow 设置 infowindow 的方法
   * @param {object} listeners 监听 geometry 的事件
   * @param {string} layerId 要渲染到的图层id
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
    if (!this.layerToGroup.get(layerId)) {
      this.layerToGroup.set(layerId, [id]);
    } else {
      this.layerToGroup.set(layerId, this.layerToGroup.get(layerId).push(id));
    }
    layer.addGeometry(geometryArr);
  }

  /**
   * geometry 点击事件
   * @param opendot 在哪个位置打开 - true:点击的位置；[lng,lat]:坐标位置；null: geometry中心坐标(默认)；
   * @param callback 点击后的回调
   * @param event 事件参数
   */
  geometryClick(obj) {
    const {
      event: { target, coordinate },
      callback,
      opendot,
    } = obj;

    const infoWindow = target.getInfoWindow();
    if (infoWindow && infoWindow.isVisible()) {
      target.closeInfoWindow();
      callback ? callback(false) : null;
    } else {
      if (Array.isArray(opendot)) {
        target.openInfoWindow({ x: opendot[0], y: opendot[1] });
        callback ? callback(true) : null;
      } else if (opendot) {
        target.openInfoWindow(coordinate);
        callback ? callback(true) : null;
      } else {
        target.openInfoWindow();
        callback ? callback(true) : null;
      }
    }
  }

  // 根据 组id 显隐 geometry
  toggleVisible(id, visible) {
    if (this.geometrys.has(id)) {
      this.geometrys.get(id).forEach((geometry) => {
        visible ? geometry.show() : geometry.hide();
      });
    }
  }

  /**
   * 获取geometry
   * @param {string} groupId 组id
   * @param {string} id geometry id
   * @return 返回geometry
   */
  getGeometryByIds(groupId, id) {
    return this.geometrys.get(groupId).find((el) => el.id === id);
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
