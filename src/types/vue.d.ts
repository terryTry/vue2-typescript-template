import Vue, { VNode } from "vue";

declare global {
    interface Window {
        // i18n: any;
        // eCharts: any;
    }
}
declare module "vue/types/vue" {
    interface Vue {
        $bus: Vue;
    }
}
declare global {
    namespace JSX {
        interface Element extends VNode {}
        interface ElementClass extends Vue {}
        interface IntrinsicElements {
            [elem: string]: any;
        }
    }
}
