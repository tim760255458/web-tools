import ChartDirect from "../orders/chart";
import MapDirect from "../orders/map";

export default function bindDirect(vueIns) {
  vueIns.directive("chart2", ChartDirect);
  vueIns.directive("map", MapDirect);
}
