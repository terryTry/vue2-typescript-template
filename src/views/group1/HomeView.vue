<template>
  <div class="home">
    <div class="rect-draw algorithm-draw-box">
      <h2 class="title">矩形区域绘制</h2>
      <AlgorithmDraw :parentWidth="500" :parentHeight="500" />
    </div>
    <div class="line-draw algorithm-draw-box">
      <h2 class="title">
        人流区域绘制

        <el-button type="text">切换方向</el-button>
      </h2>
      <div class="human-flow">
        <SvgDraw />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AlgorithmDraw from "@/components/AlgorithmDraw.vue";
import SvgDraw from "@/components/SvgDraw/index.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    AlgorithmDraw,
    SvgDraw,
  },
  methods: {
  },
});
</script>

<style lang="scss">
  .home {
    padding: 12px;
    display: flex;
    flex-direction: row;
    .algorithm-draw-box {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .human-flow {
      width: 500px;
      height: 500px;
      border: 1px solid black;
    }
  }
</style>
