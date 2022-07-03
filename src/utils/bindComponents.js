import VueTable from "../components/VueTable";
import VueForm from "../components/VueForm";
import VueFormTwo from "../components/VueFormTwo";

export default function bindComponents(vueIns) {
  vueIns.component("vue-table", VueTable);
  vueIns.component("vue-form", VueForm);
  vueIns.component("vue-form-two", VueFormTwo);
}
