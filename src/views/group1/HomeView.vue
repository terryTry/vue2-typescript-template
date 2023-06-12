<template>
  <div class="home">
    <div class="rect-draw algorithm-draw-box">
      <h2 class="title">矩形区域绘制</h2>
      <AlgorithmDraw :parentWidth="500" :parentHeight="500" />
    </div>
    <div class="line-draw algorithm-draw-box">
      <h2 class="title">人流区域绘制</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AlgorithmDraw from "@/components/AlgorithmDraw.vue";
import { mapActions } from "vuex";

export default defineComponent({
  name: "HomeView",
  components: {
    AlgorithmDraw,
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
    }
  }
</style>
