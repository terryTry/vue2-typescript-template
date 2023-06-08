import { ObjectDirective } from "vue";

const options: ObjectDirective = {
  inserted: function (el, binding) {
    el.addEventListener("click", () => {
      if (!el.disabled) {
        console.log("click");
        el.disabled = true;
        setTimeout(() => {
          el.disabled = false;
        }, binding.value || 2000);
      } else {
        console.log("click disabled");
      }
    });
  },
};

export default options;
