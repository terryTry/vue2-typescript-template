import Vue from "vue";
import moment from "moment-timezone";

const filters = {
  // 保留小数点后两位
  toFixed2(value: number) {
    return value.toFixed(2);
  },
  formatDatetime(
    value: string,
    formatStr: string,
    timezone = moment.tz.guess()
  ) {
    if (!value) {
      return value;
    }
    return moment(value)
      .tz(timezone)
      .format(formatStr || "YYYYMMDD");
  },
};

export default {
  install() {
    console.log("filter install");
    Object.keys(filters).forEach((key) => {
      Vue.filter(key, filters[key]);
    });
  },
};
