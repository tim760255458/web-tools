import Vue from "vue";

function initBus() {
  const formStore = Vue.observable({
    dictionarys: {},
  });

  const bus = new Vue();
  bus.store = formStore;

  bus.$on("set-dic", (key, val = []) => {
    if (!key) return;
    Vue.set(formStore.dictionarys, key, val);
  });
  bus.getDic = (key) => {
    if (!key) return [];
    return formStore.dictionarys[key] || [];
  };

  return bus;
}

export default initBus;
