export default class virtualTree {
  constructor(options) {
    const {
      tree = [],
      renderNum = 20,
      prop = { id: "id", children: "children" },
      expandedKeys = [],
      checkedKeys = [],
      autoExpandParent = true,
    } = options;
    this.tree = tree;
    this.renderNum = renderNum;
    this.expandedKeys = expandedKeys;
    this.checkedKeys = checkedKeys;
    this.autoExpandParent = autoExpandParent;

    this.idTag = prop.id;
    this.childrenTag = prop.children;

    this.current = null;
    this._formatTree = this._format(this.tree, 1, true);
  }

  /**
   * 格式化
   * TODO: expand 状态，选中、半选中，后代节点选中后祖先节点的状态
   * ! 两种情况
   * ! 1. 展开子节点的时候自动展开父节点
   * ! 2. 不自动展开父节点
   */
  _format(arr = [], level, visible) {
    return arr.map((el) => {
      const isExpanded = this.autoExpandParent
        ? this.expandedKeys.some((nodeId) => this._isIncludeNode([el], nodeId))
        : this.expandedKeys.includes(el[this.idTag]);
      // const isChecked = this.checkedKeys.includes(el[this.idTag])
      // const isActive = el[this.idTag] === this.current
      return {
        ...el,
        expanded: isExpanded,
        // checked: isChecked,
        level: level,
        // acitve: isActive,
        visible: visible,
        children: this._format(el[this.childrenTag], level + 1, isExpanded),
      };
    });
  }

  // 摊平
  _flatten() {}

  // 截取
  _slice() {}

  // 是否包含此节点
  _isIncludeNode(tree = [], nodeId) {
    return tree.some(
      (el) =>
        el[this.idTag] === nodeId ||
        this._isIncludeNode(el[this.childrenTag], nodeId)
    );
  }
}

// const a = [
//   { id: 1, children: [{ id: 2 }, { id: 3, children: [{ id: 5 }] }] },
//   { id: 4 },
// ];
// const b = [2];
// const c = [1];

// const d = new virtualTree({
//   tree: a,
//   renderNum: 20,
//   prop: { id: "id", children: "children" },
//   expandedKeys: b,
//   checkedKeys: [],
//   autoExpandParent: true,
// });
// console.log(JSON.stringify(d._formatTree));
