import Vue from "vue";

let infos = Vue.observable({
  message: "hell",
  count: 0,
  form: {
    name: "姓名",
    age: 20,
  },
});

export function resetInfos() {
  infos.message = "hell";
  infos.count = 0;
  infos.form = {
    name: "姓名",
    age: 20,
  };
}

export default infos;
