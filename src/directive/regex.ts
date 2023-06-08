/**
 * 用途：正则表达式指令
 * created at 2023-05-30
 */

import { replaceEmoji } from "@/utils";
import { ObjectDirective } from "vue";

export type RegExpInfo = {
  obj: object;
  regExp: string;
  prop: string;
};

const options: ObjectDirective<{}, RegExpInfo> = {
  update: function (el, binding, vnode, oldNode) {
    if (
      vnode.tag?.indexOf("ElInput") === -1 &&
      vnode.tag?.indexOf("ElAutocomplete") === -1
    ) {
      return;
    }
    const regInfo = binding.value;
    if (!regInfo || !regInfo.regExp) {
      return;
    }
    if (regInfo.obj && regInfo.prop) {
      if (!regInfo.obj[regInfo.prop]) {
        return;
      }
      const curVal = regInfo.obj[regInfo.prop];
      const pattern = new RegExp(regInfo.regExp);
      if (!pattern.test(curVal)) {
        regInfo.obj[regInfo.prop] = oldNode.data.model.value;
      } else {
        const str = replaceEmoji(regInfo.obj[regInfo.prop]);
        if (str != regInfo.obj[regInfo.prop]) {
          regInfo.obj[regInfo.prop] = str;
        }
      }
    }
  },
};

export default options;
