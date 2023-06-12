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