/**
 *  查找 arr 中所有叶子节点的 id
 * @param {array} arr 要处理的数据
 * @param {object} prop 配置
 * @returns 包含的所有值
 */
export function getLeafId(arr = [], prop = { id: "id", children: "children" }) {
  const result = [];
  function fn(list) {
    list.forEach((el) => {
      if (el[prop.children] && el[prop.children].length > 0) {
        fn(el[prop.children]);
      } else {
        result.push(el[prop.id]);
      }
    });
  }
  fn(arr);

  return result;
}

/**
 * 根据默认值格式化 mapbar 数据，
 * 添加 isSelect、isLeafSelect、isExpand，
 * 来标识当前节点是否被选中、后代节点是否被选中、当前节点是否被展开
 * @param {array} mapbarArr mapbar类型
 * @param {array} defaultArr 默认选中的ids（应仅为叶子节点的id）
 * @param {object} prop 配置
 * @returns 格式化后的 mapbar
 */
export function formatMapbar(
  mapbarArr,
  defaultArr,
  prop = { id: "id", children: "children" }
) {
  return mapbarArr.map((el) => {
    const hasDefault = defaultArr.includes(el[prop.id]);
    const leafIds = getLeafId(el[prop.children]);
    const hasSomeLeafDefault = leafIds.some((id) => defaultArr.includes(id)); // 后代节点部分被选中
    const hasAllLeafDefault =
      leafIds.length > 0
        ? leafIds.every((id) => defaultArr.includes(id))
        : false; // 后代节点全部被选中
    return {
      ...el,
      isLeafSelect: hasDefault ? true : hasSomeLeafDefault, // 后代节点是否被选中
      isSelect: hasDefault ? true : hasAllLeafDefault, // 此节点是否被选中
      isExpand: el.isExpand || false, // 是否展开此节点
      children:
        el[prop.children] && el[prop.children].length > 0
          ? formatMapbar(el[prop.children], hasDefault ? leafIds : defaultArr)
          : [],
    };
  });
}

/**
 * 取消选中节点
 * @param {object} node 目标节点
 * @param {array} selectIds 已选中节点的id
 * @param {object} prop 配置
 * @returns 返回过滤后的节点id
 */
export function removeNodeSelect(
  node,
  selectIds,
  prop = { id: "id", children: "children" }
) {
  let ids = [];
  if (node[prop.children] && node[prop.children].length > 0) {
    ids = getLeafId(node[prop.children]);
  } else {
    ids = [node[prop.id]];
  }
  return selectIds.filter((id) => !ids.some((el) => el === id));
}

/**
 * 选中节点
 * @param {object} node 目标节点
 * @param {array} selectIds 已选中节点的id
 * @param {object} prop 配置
 * @returns 返回添加后的节点id
 */
export function addNodeSelect(
  node,
  selectIds,
  prop = { id: "id", children: "children" }
) {
  let ids = [];
  if (node[prop.children] && node[prop.children].length > 0) {
    ids = getLeafId(node[prop.children]);
  } else {
    ids = [node[prop.id]];
  }
  return [...selectIds, ...ids];
}

/**
 * 修改节点的展开状态
 * @param {object} node 目标节点
 * @param {array} tree 目标树
 * @param {object} prop 配置
 * @returns 修改过展开状态的树
 */
export function expandNode(
  node,
  tree,
  prop = { id: "id", children: "children" }
) {
  return tree.map((el) => ({
    ...el,
    isExpand: el[prop.id] === node[prop.id] ? !el.isExpand : el.isExpand,
    children:
      el[prop.children] && el[prop.children].length > 0
        ? expandNode(node, el[prop.children])
        : [],
  }));
}

/**
 * mapbar 逻辑集成为类（部分函数的意图，对照上面的函数）
 * @params {array} itemArr 基础配置
 * @params {array} selectIds 默认选中的ids（应仅为叶子节点的id）
 * @params {function} cb 外部传入的回调函数，用来向外部传递最新的 mapbar 树
 * @params {object} cb prop 配置
 */
class MapbarTool {
  constructor(
    itemArr,
    selectIds,
    cb,
    prop = { id: "id", children: "children" }
  ) {
    this.itemArr = itemArr;
    this.selectIds = selectIds;
    this.prop = prop;
    this.cb = cb;
    this._render();
  }

  /**
   *  查找 arr 中所有叶子节点的 id
   * @param {array} arr 要处理的数据
   * @returns 包含的所有值
   */
  _getLeafId(arr = []) {
    const _this = this;
    const result = [];
    function fn(list) {
      list.forEach((el) => {
        if (el[_this.prop.children] && el[_this.prop.children].length > 0) {
          fn(el[_this.prop.children]);
        } else {
          result.push(el[_this.prop.id]);
        }
      });
    }
    fn(arr);
    return result;
  }

  /**
   * 根据参数生成 mapbar 数据，
   * 添加 isSelect、isLeafSelect、isExpand，
   * 来标识当前节点是否被选中、后代节点是否被选中、当前节点是否被展开
   * @param {array} mapbarArr mapbar 数据
   * @param {array} defaultArr 默认选中的ids（应仅为叶子节点的id）
   * @returns 格式化后的 mapbar 树
   */
  _getMapbar(mapbarArr, defaultArr) {
    return mapbarArr.map((el) => {
      const hasDefault = defaultArr.includes(el[this.prop.id]);
      const leafIds = this._getLeafId(el[this.prop.children]);
      const hasSomeLeafDefault = leafIds.some((id) => defaultArr.includes(id)); // 后代节点部分被选中
      const hasAllLeafDefault =
        leafIds.length > 0
          ? leafIds.every((id) => defaultArr.includes(id))
          : false; // 后代节点全部被选中
      return {
        ...el,
        isLeafSelect: hasDefault ? true : hasSomeLeafDefault, // 后代节点是否被选中
        isSelect: hasDefault ? true : hasAllLeafDefault, // 此节点是否被选中
        isExpand: el.isExpand || false, // 是否展开此节点
        children:
          el[this.prop.children] && el[this.prop.children].length > 0
            ? this._getMapbar(
                el[this.prop.children],
                hasDefault ? leafIds : defaultArr
              )
            : [],
      };
    });
  }

  /**
   * 取消选中节点
   * @param {object} node 目标节点
   */
  _removeNodeSelect(node) {
    let ids = [];
    if (node[this.prop.children] && node[this.prop.children].length > 0) {
      ids = this._getLeafId(node[this.prop.children]);
    } else {
      ids = [node[this.prop.id]];
    }
    this.selectIds = this.selectIds.filter(
      (id) => !ids.some((el) => el === id)
    );
  }
  /**
   * 取消选中节点的辅助函数，可供外部调用
   * @param {object} node 目标节点
   */
  removeNodeSelectFn(node) {
    this._removeNodeSelect(node);
    this._render();
  }

  /**
   * 选中节点
   * @param {object} node 目标节点
   */
  _addNodeSelect(node) {
    let ids = [];
    if (node[this.prop.children] && node[this.prop.children].length > 0) {
      ids = this._getLeafId(node[this.prop.children]);
    } else {
      ids = [node[this.prop.id]];
    }
    this.selectIds = [...this.selectIds, ...ids];
  }
  /**
   * 选中节点的辅助函数，可供外部调用
   * @param {object} node 目标节点
   */
  addNodeSelectFn(node) {
    this._addNodeSelect(node);
    this._render();
  }

  /**
   * 修改节点的展开状态
   * @param {object} node 目标节点
   * @param {array} tree 目标树
   * @returns 修改过展开状态的树
   */
  _expandNode(node, tree) {
    return tree.map((el) => ({
      ...el,
      isExpand:
        el[this.prop.id] === node[this.prop.id] ? !el.isExpand : el.isExpand,
      children:
        el[this.prop.children] && el[this.prop.children].length > 0
          ? this._expandNode(node, el[this.prop.children])
          : [],
    }));
  }
  /**
   * 修改节点的展开状态的辅助函数，可供外部调用
   * @param {object} node 目标节点
   */
  expandNodeFn(node) {
    this.itemArr = this._expandNode(node, this.itemArr);
    this._render();
  }

  /**
   * 点击节点，供外部调用，根据 link 决定是否联动选中后代节点
   * 为 true 时，点击当前节点，它的后代节点都会被选中或取消选中
   * 为 false 时，点击当前节点，有两种情况，为叶子节点时切换自身选中状态；非叶子节点时，切换展开状态
   * @param {*} node 目标节点
   * @param {*} cb 回调函数
   * @param {*} link
   */
  clickNode(node, cb, link = false) {
    cb(node);
    if (link) {
      node.isSelect
        ? this.removeNodeSelectFn(node)
        : this.addNodeSelectFn(node);
    } else {
      if (node.children && node.children.length) {
        this.expandNodeFn(node);
      } else {
        node.isSelect
          ? this.removeNodeSelectFn(node)
          : this.addNodeSelectFn(node);
      }
    }
  }

  /**
   * 使用 cb 把最新的 mapbar 树传出至外部
   */
  _render() {
    this.cb(this._getMapbar(this.itemArr, this.selectIds));
  }
}

export default MapbarTool;
