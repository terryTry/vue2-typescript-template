import Vue from "vue";
import dialogDrag from "./dialog-drag";
import repeatClick from "./repeat-click";
import regex from "./regex";

export default {
  install() {
    console.log("directive install");
    Vue.directive("dialogDrag", dialogDrag);
    Vue.directive("repeatClick", repeatClick);
    Vue.directive("regex", regex);
  },
};
