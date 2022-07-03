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
