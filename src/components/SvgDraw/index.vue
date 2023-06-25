<template>
    <div>
        <svg width="400" height="400" @click.left="startDrawing" @mousemove="draw" @click.right="finishDrawing" @contextmenu.prevent>
            <rect v-if="drawingRect && rectX && rectY" :x="rectX" :y="rectY" :width="rectWidth" :height="rectHeight" fill="red" />
            <rect class="svg-draw-item" v-for="(rect, index) in rects" :key="`rect-${index}`" :x="rect.x" :y="rect.y" :width="rect.width" :height="rect.height"
                fill="red" />

            <polygon v-if="drawingPolygon" :points="formatPoints(polygonPoints)" fill="transparent" :stokeWidth="1" stroke="black" />
            
            <polygon 
                class="svg-draw-item" 
                v-for="(polygon, index) in polygons"
                :key="`polygon-${index}`"
                :points="formatPoints(polygon.points)"
                fill="transparent"
                :stokeWidth="1"
                stroke="black"
                @mousedown="startEditingPolygon(index, $event)"
                @mousemove="editingPolygon && editPolygon(index, $event)"
                @mouseup="finishEditingPolygon"
            />
            <g v-for="(polygon, index) in polygons" :key="`polygon-points-${polygon.id}`">
                <!-- 未完成：不同的端点cursor样式不同 -->
                <circle 
                    class="svg-draw-item-point"
                    v-for="(point, index) in polygon.points"
                    :key="`point-${index}`" 
                    :cx="point.x" 
                    :cy="point.y"
                    r="5"
                />
            </g>
            
            <line v-if="drawingLine && lineX2 && lineY2" :x1="lineX1" :y1="lineY1" :x2="lineX2" :y2="lineY2" stroke="green" />
            <line class="svg-draw-item" v-for="(line, index) in lines" :key="`line-${index}`" :x1="line.x1" :y1="line.y1" :x2="line.x2" :y2="line.y2"
                stroke="green" />
        </svg>
        <div class="btns">
            <el-button @click="clear" type="danger">{{$t('btn-clear')}}</el-button>
            <el-button @click="printAll">打印当前图形信息</el-button>
        </div>
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';

type SvgDrawData = {
    drawingRect: boolean
    drawingPolygon: boolean
    drawingLine: boolean

    editingRect: boolean
    editingPolygon: boolean
    editingPolygonIndex: number
    editingLine: boolean
    
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
    props: {
        enableDraw: {
            type: Boolean,
            default: false,
        },
    },
    data(): SvgDrawData {
        return {
            // 绘制图形
            drawingRect: false,
            drawingPolygon: false,
            drawingLine: false,

            // 修改图形
            editingRect: false,
            editingPolygon: false,
            editingPolygonIndex: -1,
            editingLine: false,
            
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
    computed: {
        editingPolygonPoints(): {x: number;y: number;}[] {
            return  this.editingPolygonIndex > -1 ? this.polygons[this.editingPolygonIndex].points : [];
        },
    },
    methods: {
        formatPoints(points) {
            return points.map((point) => `${point.x},${point.y}`).join(' ');
        },

        startDrawing(event) {
            if(!this.enableDraw) {
                return;
            }
            if(this.editingPolygon || this.editingRect || this.editingLine) {
                return;
            }
            if(this.drawingPolygon) {
                console.log('click left draw polygon');
                this.polygonPoints.push({
                    x: event.offsetX,
                    y: event.offsetY,
                });
                return;
            }
            if (event.target.tagName === 'svg') {
                //   if (/* 判断要绘制的图形类型 */) {
                //     // 开始绘制矩形
                        // this.drawingRect = true;
                        // this.rectX = event.offsetX;
                        // this.rectY = event.offsetY;
                //   } else if (/* 判断要绘制的图形类型 */) {
                //     // 开始绘制多边形
                    this.drawingPolygon = true;
                    this.polygonPoints = [{
                        x: event.offsetX,
                        y: event.offsetY,
                    }];
                //   } else if (/* 判断要绘制的图形类型 */) {
                //     // 开始绘制直线
                        // this.drawingLine = true;
                        // this.lineX1 = event.offsetX;
                        // this.lineY1 = event.offsetY;
                //   }
            }
        },
        draw(event) {
            if (this.drawingRect) {
                this.rectWidth = event.offsetX - this.rectX;
                this.rectHeight = event.offsetY - this.rectY;
            } else if(this.drawingPolygon) {
                if(this.polygonPoints.length === 1) {
                    this.polygonPoints.push({
                        x: event.offsetX,
                        y: event.offsetY,
                    });
                } else {
                    this.polygonPoints.splice(this.polygonPoints.length - 1, 1, {
                        x: event.offsetX,
                        y: event.offsetY,
                    });
                }
            } else if (this.drawingLine) {
                this.lineX2 = event.offsetX;
                this.lineY2 = event.offsetY;
            }
        },

        startEditingPolygon(index, event) {
            this.editingPolygon = true;
            this.editingPolygonIndex = index;
        },
        editPolygon(index, event) {
            const { movementX, movementY } = event;
            
            const points = this.editingPolygonPoints;
            if(points) {
                // 修改多边形的点, 原来的坐标加上偏移量
                this.polygons[this.editingPolygonIndex].points = points.map((point) => ({
                    x: point.x + movementX,
                    y: point.y + movementY,
                }));
            }
        },
        finishEditingPolygon() {
            this.editingPolygon = false;
            this.editingPolygonIndex = -1;
        },

        clear() {
            this.lines = [];
            this.rects = [];
            this.polygons = [];

            this.polygonPoints = [];
        },
        printAll() {
            console.log('lines', this.lines);
            console.log('rects', this.rects);
            console.log('polygons', this.polygons);
        },
        finishDrawing() {
            if(this.drawingRect) {
                this.finishDrawRect();
            } else if(this.drawingPolygon) {
                // 清除最后一个点
                this.polygonPoints.splice(this.polygonPoints.length - 1, 1);

                console.log('click right. finish draw polygon');
                this.finishDrawPolygon();
            } else if(this.drawingLine) {
                this.finishDrawLine();
            } else {
                console.log('do nothing');
            }
        },
        finishDrawPolygon() {
            this.drawingPolygon = false;

            if(this.polygonPoints.length < 3) {
                console.log('多边形点数不足, 此次绘制无效');
                return;
            } else {
                this.polygons.push({
                    id: this.polygons.length,
                    points: this.polygonPoints,
                });
            }
            this.polygonPoints = [];
        },
        finishDrawRect() {
            this.drawingRect = false;
            this.rects.push({
                x: this.rectX,
                y: this.rectY,
                width: this.rectWidth,
                height: this.rectHeight,
            });
            this.rectX = 0;
            this.rectY = 0;
            this.rectWidth = 0;
            this.rectHeight = 0;
        },
        finishDrawLine() {
            this.drawingLine = false;
            this.lines.push({
                x1: this.lineX1,
                y1: this.lineY1,
                x2: this.lineX2,
                y2: this.lineY2,
            });
            this.lineX1 = 0;
            this.lineY1 = 0;
            this.lineX2 = 0;
            this.lineY2 = 0;
        },
    }
});
</script>
  
<style lang="scss">
svg {
    border: 1px solid #ccc;

    .svg-draw-item {
        cursor: pointer;

    }
    .svg-draw-item-point {
        stroke-width: 1;
        fill: #000;
        stroke-dasharray: 10 10;
        stroke: #000;
        stroke-opacity: .8;
        cursor: move;
    }
}
</style>
  