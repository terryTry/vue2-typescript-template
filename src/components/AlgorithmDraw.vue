<template>
    <div class="algorithm-draw-component" :style="`width: ${parentWidth}px; height: ${parentHeight}px;`">
        <vue-draggable-resizable :w="rect.width" :h="rect.height" :x="rect.x" :y="rect.y" :parent="true" class="rect-draw"
            :isConflictCheck="true" :snap="true" :snapTolerance="20">
        </vue-draggable-resizable>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    name: "AlgorithmDraw",
    props: {
        parentWidth: {
            type: Number,
            required: true,
        },
        parentHeight: {
            type: Number,
            required: true,
        }
    },
    data() {
        return {
            rect: {
                width: this.parentWidth - 12,
                height: this.parentHeight - 12,
                x: 6,
                y: 6
            }
        };
    },
    methods: {
        onResize: function (x: number, y: number, width: number, height: number) {
            this.rect.x = x
            this.rect.y = y
            this.rect.width = width
            this.rect.height = height
        },
        onDrag: function (x: number, y: number) {
            this.rect.x = x
            this.rect.y = y
        }
    }
});
</script>

<style lang="scss">
.algorithm-draw-component {
    border: 1px solid red;
    position: relative;
    .rect-draw {
        border-style: solid;
        border-color: aquamarine;
    }
}
</style>
