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
    this.checkedKeys = new Set(checkedKeys);
    this.autoExpandParent = autoExpandParent;

    this.idTag = prop.id;
    this.childrenTag = prop.children;

    this.current = null;
    this._formatTree = this._format(this.tree, 1, true);
    this._formatTreeList = this._flattenFn(this._formatTree);
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
      // const isActive = el[this.idTag] === this.current
      return {
        ...el,
        expanded: isExpanded,
        checked: this.getNodeCheckedStatus(el),
        level: level,
        // acitve: isActive,
        visible: visible,
        isLeaf: !el[this.childrenTag],
        [this.childrenTag]: this._format(
          el[this.childrenTag],
          level + 1,
          isExpanded
        ),
      };
    });
  }

  // 摊平
  _flatten(arr, result) {
    arr.forEach((el) => {
      if (el.visible) {
        result.push(el);
      }
      if (
        el.expanded &&
        el[this.childrenTag] &&
        el[this.childrenTag].length > 0
      ) {
        this._flatten(el[this.childrenTag], result);
      }
    });
  }
  _flattenFn(arr) {
    const result = [];
    this._flatten(arr, result);
    return result;
  }

  // 截取
  _slice(startNum) {
    return this._formatTreeList.slice(startNum, startNum + this.renderNum);
  }

  // 是否包含此节点
  _isIncludeNode(tree = [], nodeId) {
    return tree.some(
      (el) =>
        el[this.idTag] === nodeId ||
        this._isIncludeNode(el[this.childrenTag], nodeId)
    );
  }

  add() {}

  // 展开
  _toggle(nodeId) {
    const node = this._formatTreeList.find((el) => el[this.idTag] === nodeId);

    if (!node.expanded) {
      this.expandedKeys.push(nodeId);
    } else {
      this.expandedKeys = this.expandedKeys.filter((el) => el !== nodeId);
    }

    this._formatTree = this._format(this.tree, 1, true);
    this._formatTreeList = this._flattenFn(this._formatTree);
  }

  // 选中
  _check(item) {
    let nodeIds = [];
    if (item.isLeaf) {
      nodeIds = [item[this.idTag]];
    } else {
      nodeIds = this.getAllLeaf(item);
    }
    if (item.checked === -1 || item.checked === 0) {
      this.checkedKeys = new Set([...this.checkedKeys, ...nodeIds]);
    } else if (item.checked === 1) {
      nodeIds.forEach((nodeId) => this.checkedKeys.delete(nodeId));
    }

    this._formatTree = this._format(this.tree, 1, true);
    this._formatTreeList = this._flattenFn(this._formatTree);
  }

  // 获取当前节点的选中状态：1 选中 0 半选中 -1 未选中
  getNodeCheckedStatus(node) {
    const children = node[this.childrenTag];
    if (children && children.length) {
      let status = -1;
      children.forEach((childNode) => {
        this.getNodeCheckedStatus(childNode);
      });
      if (
        children.every(
          (childNode) => this.getNodeCheckedStatus(childNode) === 1
        )
      ) {
        status = 1;
      } else if (
        children.every(
          (childNode) => this.getNodeCheckedStatus(childNode) === -1
        )
      ) {
        status = -1;
      } else {
        status = 0;
      }
      return status;
    } else {
      return this.checkedKeys.has(node[this.idTag]) ? 1 : -1;
    }
  }

  // 获取所有叶子节点
  getAllLeaf(node) {
    if (!node.isLeaf) {
      return node[this.childrenTag]
        .map((childNode) => this.getAllLeaf(childNode))
        .reduce((a, b) => [...a, ...b], []);
    } else {
      return [node[this.idTag]];
    }
  }

  // render
  render(startNum) {
    const result = this._slice(startNum);
    return result;
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
