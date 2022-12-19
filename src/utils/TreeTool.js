// @ts-check

class TreeTool {
  /**
   * 初始化数据
   * @param {object[]} treeArr - 树数据。示例：[{
   *  id: 'spjk',
   *  ... 添加需要的任何字段
   *  children: [
   *    { id: 'spjk_1', ... },
   *    { id: 'spjk_2', ... }
   *  ]
   * }]
   * @param {string[]} checkedArr - 默认选中的值。示例：["spjk", "spjk_1", "xhj_1"]
   * @param {object} prop - 配置
   * @param {string} prop.id - 配置项 id 的别名
   * @param {string} prop.children - 配置项 children 的别名
   * @param {boolean} prop.isLink - 是否联动选中后代节点。为 true 时，点击当前节点，它的后代节点都会被选中或取消选中；为 false 时，点击当前节点，有两种情况，为叶子节点时切换自身选中状态；非叶子节点时，切换展开状态
   */
  constructor(
    treeArr,
    checkedArr,
    prop = { id: "id", children: "children", isLink: false }
  ) {
    this.prop = prop;
    this.treeArr = treeArr;
    this.checkedArr = checkedArr;
    this.mapbarItems = [];
    this.initAndUpdateTree();
  }

  /**
   *  查找 arr 中所有叶子节点的 id
   * @param {object[]} arr - 要处理的数据
   * @returns {string[]} 包含的所有值
   */
  getLeafId(arr = []) {
    const result = [];
    function fn(list) {
      list.forEach((el) => {
        if (el[this.prop.children] && el[this.prop.children].length > 0) {
          fn(el[this.prop.children]);
        } else {
          result.push(el[this.prop.id]);
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
   * @param {object[]} mapbarArr - mapbar类型
   * @param {string[]} defaultArr - 默认选中的ids（应仅为叶子节点的id）
   * @returns {object[]} 格式化后的 mapbar
   */
  formatMapbar(mapbarArr, defaultArr) {
    return mapbarArr.map((el) => {
      const hasDefault = defaultArr.includes(el[this.prop.id]);
      const leafIds = this.getLeafId(el[this.prop.children]);
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
            ? this.formatMapbar(
                el[this.prop.children],
                hasDefault ? leafIds : defaultArr
              )
            : [],
      };
    });
  }

  /**
   * 取消选中节点
   * @param {object} node - 目标节点
   */
  removeNodeSelect(node) {
    let ids = [];
    if (node[this.prop.children] && node[this.prop.children].length > 0) {
      ids = this.getLeafId(node[this.prop.children]);
    } else {
      ids = [node[this.prop.id]];
    }
    this.checkedArr = this.checkedArr.filter(
      (id) => !ids.some((el) => el === id)
    );
    this.initAndUpdateTree();
  }

  /**
   * 选中节点
   * @param {object} node - 目标节点
   */
  addNodeSelect(node) {
    let ids = [];
    if (node[this.prop.children] && node[this.prop.children].length > 0) {
      ids = this.getLeafId(node[this.prop.children]);
    } else {
      ids = [node[this.prop.id]];
    }
    this.checkedArr = [...this.checkedArr, ...ids];
    this.initAndUpdateTree();
  }

  /**
   * 修改节点的展开状态
   * @param {object} node - 目标节点
   * @param {array} tree - 目标树
   * @returns {object[]} 修改过展开状态的树
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
   * 修改节点展开状态
   * @param {object} node - 目标节点
   */
  expandNode(node) {
    this.treeArr = this._expandNode(node, this.treeArr);
    this.initAndUpdateTree();
  }

  /**
   * 初始化和更新树
   */
  initAndUpdateTree() {
    this.mapbarItems = this.formatMapbar(this.treeArr, this.checkedArr);
  }

  /**
   * 点击目标
   * @param {object} node - 目标节点
   */
  clickNode(node) {
    if (this.prop.isLink) {
      this.expandNode(node);
    } else {
      node.isSelect ? this.removeNodeSelect(node) : this.addNodeSelect(node);
    }
  }
}

export default TreeTool;
