# 介绍vue2接入ts的流程，问题与解决方案

## 一. 项目初始化

1. 安装vue-cli

```
npm install -g @vue/cli
```

2. 创建项目

```
vue create vue2-ts
```

3. 选择配置

```
Vue CLI v4.5.13
? Please pick a preset: Manually select features
? Check the features needed for your project: 

- [x]Babel,
- [x]TS,
- [ ]PWA,
- [x]Router,
- [x]Vuex,
- [x]CSS Pre-processors,
- [x]Linter / Formatter,
- [ ]Unit Testing,
- [ ]E2E Testing,

? Choose a version of Vue.js that you want to start the project with

- [x]2.x,
- [ ]3.x,

? Use class-style component syntax? No
? Use Babel alongside TypeScript (required for modern mode, auto-detected polyfills, transpiling JSX)? No
? Use history mode for router? (Requires proper server setup for index fallback in production) No
? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): Sass/SCSS (with dart-sass)
? Pick a linter / formatter config: ESLint + Prettier
? Pick additional lint features: 

- [ ]Lint on save,
- [ ]Lint and fix on commit,

? Where do you prefer placing config for Babel, ESLint, etc.? In dedicated config files

```

## 全局对象与Vue对象的ts支持

- window对象的ts支持

创建`src/types/index.d.ts`文件，内容如下：
```ts
declare global {
  interface Window {
      // i18n: any;
      // eCharts: any;
  }
}
```

- Vue.prototype的ts支持，例如：$bus

创建`src/types/vue.d.ts`文件，内容如下：
```ts
import Vue, { VNode } from "vue";

declare module "vue/types/vue" {
    interface Vue {
        $bus: Vue;
        // 挂在vue实例上的属性声明在这里
    }
}
```

- *.d.ts导入import其它类型导致全局类型失效问题

原因：如果在 .d.ts 文件中使用了 import 或者 require 等方式引入了其他模块，那么 ts 就会将其视为一个模块，从而导致文件下的所有类型声明直接失效。

## 二. vuex中的ts支持

- RootState书写

```ts
import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";

import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";
import user from "./modules/user";

Vue.use(Vuex);

// 此处为hack写法，参考https://github.com/vuejs/vuex/issues/1652
const rootState = {
  loading: false,
} as RootState;

const store: StoreOptions<RootState> = {
  state: rootState,
  mutations,
  actions,
  getters,
  modules: {
    user,
  },
};

export default new Vuex.Store(store);
```

- modules书写

```ts
// modules/user.ts
import { Module } from "vuex";

const user: Module<UserState, RootState> = {
  namespaced: true,
  state: {
    userName: "admin",
    token: "123",
  },
  mutations: {
    SET_TOKEN(state, token: string) {
      state.token = token;
    },
  },
  actions: {
    login({ commit }, payload: UserInfo) {
      console.log(payload);
      commit("SET_TOKEN", "123456");
    },
    logout({ commit }) {
      commit("SET_TOKEN", "");
    },
  },
};
```

- getters、actions书写

```ts
// getters.ts
import { GetterTree } from "vuex";

const getters: GetterTree<RootState, RootState> = {
  appLoading: (state: RootState) => state.loading,
};

export default getters;


// actions.ts
import { ActionTree } from "vuex";

const actions: ActionTree<RootState, RootState> = {};

export default actions;

```

- 支持$store

vuex3.6.2已默认支持$store
```ts
// node_modules/vuex/types/vue.d.ts

/**
 * Extends interfaces in Vue.js
 */

import Vue, { ComponentOptions } from "vue";
import { Store } from "./index";

declare module "vue/types/options" {
  interface ComponentOptions<V extends Vue> {
    store?: Store<any>;
  }
}

declare module "vue/types/vue" {
  interface Vue {
    $store: Store<any>;
  }
}
```

## 三. 单文件组件中的类型声明与类型推导

>为了让 TypeScript 正确地推导出组件选项内的类型，我们需要通过 defineComponent() 这个全局 API 来定义组件.

### Props类型声明与推导

```vue
<template>
  <!-- 启用了类型检查和自动补全 -->
  {{ count.toFixed(2) }}
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  // 启用了类型推导
  props: {
    name: String,
    msg: { type: String, required: true }
  },
  data() {
    return {
      count: 1
    }
  },
  mounted() {
    this.name // 类型：string | undefined
    this.msg // 类型：string
    this.count // 类型：number
  }
})
</script>
```

### Data类型声明与推导

```vue
<script lang="ts">
import { defineComponent } from 'vue';

type SvgDrawData = {
    drawingRect: boolean
    drawingPolygon: boolean
    drawingLine: boolean
    
    rectX: number
    rectY: number
    rectWidth: number
    rectHeight: number
    rects: Array<{
        x: number
        y: number
        width: number
        height: number
    }>

    polygonPoints: Array<{
        x: number
        y: number
    }>
    polygons: Array<{
        id: number
        points: Array<{
            x: number
            y: number
        }>
    }>

    lineX1: number
    lineY1: number
    lineX2: number
    lineY2: number

    lines: Array<{
        x1: number
        y1: number
        x2: number
        y2: number
    }>
}

export default defineComponent({
    data(): SvgDrawData {
        return {
            // 绘制图形
            drawingRect: false,
            drawingPolygon: false,
            drawingLine: false,
            
            rectX: 0,
            rectY: 0,
            rectWidth: 0,
            rectHeight: 0,
            rects: [], // 已绘制的矩形

            polygonPoints: [], // 绘制多边形的点
            polygons: [
                {
                    id: 0,
                    points: [
                        { x: 100, y: 100 },
                        { x: 200, y: 100 },
                        { x: 200, y: 200 },
                        { x: 100, y: 200 },
                    ],
                }
            ], // 已绘制的多边形

            lineX1: 0,
            lineY1: 0,
            lineX2: 0,
            lineY2: 0,

            lines: [], // 已绘制的直线
        };
    },
});
```

### Computed类型声明与推导

```vue
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    computed: {
        // 定义函数返回值类型
        rectStyle(): CSSProperties {
            return {
                left: this.rectX + 'px',
                top: this.rectY + 'px',
                width: this.rectWidth + 'px',
                height: this.rectHeight + 'px',
            };
        },
    },
});
</script>
```

## 四. 第三方组件的ts支持

例如：vue-draggable-resizable 本身不支持ts，但是我们可以通过声明文件的方式来支持ts

创建一个`vue-draggable-resizable-gorkys.d.ts`文件，内容如下：
```ts
declare module 'vue-draggable-resizable-gorkys' {
    import { DefineComponent } from "vue";

    interface VueDraggableResizableProps {
        w: number;
        h: number;
        x: number;
        y: number;
        parent: boolean;
        isConflictCheck: boolean;
        snap: boolean;
        snapTolerance: number;
    }

    const VueDraggableResizable: DefineComponent<VueDraggableResizableProps>;
    export default VueDraggableResizable;
}
```

## 参考

- [vue2-typescript支持](https://v2.cn.vuejs.org/v2/guide/typescript.html)
