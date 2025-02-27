<template>
  <div class="fabric-page">
    <div class="tools">
      <!--  -->
    </div>
    <div class="workspace">
      <canvas id="canvas" class="workspace-canvas"></canvas>
    </div>
    <div class="option">
      <!--  -->
    </div>
  </div>
</template>
<script setup lang="ts">

import * as fabric from 'fabric';
import { v4 as uuid } from 'uuid';

import type { IWorkSpaceCanvas } from './types';

const WorkSpaceCanvasClass = ref<WorkSpaceCanvas | null>(null)








class WorkSpaceCanvas implements IWorkSpaceCanvas {

  canvasFC!: fabric.Canvas
  editorFR!: fabric.Rect
  workspaceDom: HTMLCanvasElement
  resizeObserver!: ResizeObserver
  zoomRatio: number = 1

  constructor(options: { canvasClass: string, workspaceClass: string } = { canvasClass: 'canvas', workspaceClass: '.workspace' }) {
    
    this.workspaceDom = document.querySelector(options.workspaceClass) as HTMLCanvasElement
    this.canvasFC = new fabric.Canvas(options.canvasClass, {
      stopContextMenu: true,
    })
    this.initCanvasFC()
    this.initEditorFR()
    this.initResizeObserve()
  }
  initCanvasFC() {
    if (!this.canvasFC) {
      console.error('canvasFC is null')
      return
    }
    if (!this.workspaceDom) {
      console.error('workspaceDom is null')
      return
    }

    this.canvasFC.backgroundImage = undefined
    console.log(this.workspaceDom.offsetHeight, this.workspaceDom.offsetWidth,'initCanvasFc')
    this.canvasFC.setDimensions({ width: this.workspaceDom?.offsetWidth, height: this.workspaceDom?.offsetHeight })
  }
  initEditorFR() {
    const width = this.workspaceDom.offsetWidth * 0.8 || 900
    const height = this.workspaceDom.offsetHeight * 0.8 || 1200
    this.editorFR = new fabric.Rect({
      fill: 'rgba(255,255,255,1)',
      id: 'editor',
      strokeWidth: 0,
      width,
      height
    })
    this.editorFR.set('selectable', false);
    this.editorFR.set('hasControls', false);
    this.canvasFC?.add(this.editorFR)
  }
  initResizeObserve() {
    if (!this.workspaceDom) {
      console.error('workspaceDom is null')
      return
    }
    if (!this.canvasFC) {
      console.error('canvasFC is null')
      return
    }
    this.resizeObserver = new ResizeObserver(() => {
      // if (!this.canvasFC || !this.workspaceDom) return
      // this.canvasFC.setDimensions({ width: this.workspaceDom.offsetWidth, height: this.workspaceDom.offsetHeight })
      // this.setCenterFromObject(this.editorFR as fabric.Rect)
      this.resize()
    })
    this.resizeObserver.observe(this.workspaceDom)
  }
  setCenterFromObject(object: fabric.Rect) {
    const objCenter = object.getCenterPoint()
    // viewportTransform
    // [ scaleX, skewX, skewY, scaleY, translateX, translateY ]
    const viewportTransform = this.canvasFC?.viewportTransform
    if (viewportTransform && this.canvasFC) {
      viewportTransform[4] = this.canvasFC.width / 2 - objCenter.x * viewportTransform[0]
      viewportTransform[5] = this.canvasFC.height / 2 - objCenter.y * viewportTransform[3]
      this.canvasFC.setViewportTransform(viewportTransform)
      this.canvasFC.renderAll()
    }
  }
  zoomInCanvas() {
    if (!this.canvasFC) {
      console.error('canvasFC is null')
      return
    }
    let zoomRatio = this.canvasFC.getZoom()
    zoomRatio += 0.5
    const center = this.canvasFC.getCenterPoint()
    this.canvasFC.zoomToPoint(center, zoomRatio < 0 ? 0.1 : zoomRatio)
  }
  zoomOutCanvas() {
    if (!this.canvasFC) {
      console.error('canvasFC is null')
      return
    }
    let zoomRatio = this.canvasFC.getZoom()
    zoomRatio -= 0.5
    const center = this.canvasFC.getCenterPoint()
    this.canvasFC.zoomToPoint(center, zoomRatio < 0 ? 0.1 : zoomRatio)
  }
  setZoomRatio(ratio: number) {
    const width = this.workspaceDom.offsetWidth
    const height = this.workspaceDom.offsetHeight
    this.canvasFC.setDimensions({ width, height })
    const center = this.canvasFC.getCenterPoint()
    this.canvasFC.zoomToPoint(center, ratio)
    this.setCenterFromObject(this.editorFR)

    this.zoomRatio = ratio
    this.editorFR.clone().then(clone => {
      this.canvasFC.clipPath = clone
      this.canvasFC.requestRenderAll();
    });
  }
  resize() {
    const scaleNum = fabric.util.findScaleToFit(this.editorFR, {
      width: this.workspaceDom?.offsetWidth,
      height: this.workspaceDom?.offsetHeight
    })
    this.setZoomRatio(scaleNum)
  }

  addObject(object: fabric.Object, options?: {
    event: DragEvent
  }) {
    const { event = false } = options || {}
    object.set({
      id: uuid()
    })

    if (event) this.setObjectLocationFromDrag(object, event)

    this.canvasFC?.add(object)
    this.canvasFC?.setActiveObject(object)
    this.canvasFC?.renderAll()
  }
  setObjectLocationFromDrag(object: fabric.Object, event: DragEvent) {
    if (!this.canvasFC) {
      console.error('canvasFC is null')
      return
    }
    const { left, top } = this.canvasFC.getSelectionElement().getBoundingClientRect()
    if (event.x < left || event.y < top || !object.width) return
    const position = {
      ...event,
      x: event.x - left,
      y: event.y - top,
    }
    // 获取当前位置在画布中的位置
    const canvasPosition = this.canvasFC.getScenePoint(position)
    object.set({
      left: canvasPosition.x,
      top: canvasPosition.y
    })
  }
}

onMounted(() => {
  WorkSpaceCanvasClass.value = new WorkSpaceCanvas()
})



</script>
<style scoped lang="scss">
.fabric-page {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  display: flex;

  .workspace {
    flex: 1;
    width: 100%;
    overflow: hidden;
    background-color: #f1f1f1;
    position: relative;

    .workspace-canvas {
      --offsetX: 0px;
      --offsetY: 0px;
      --size: 16px;
      --color: #dedcdc;
      background-image: linear-gradient(45deg,
          var(--color) 25%,
          transparent 0,
          transparent 75%,
          var(--color) 0),
        linear-gradient(45deg, var(--color) 25%, transparent 0, transparent 75%, var(--color) 0);
      background-position: var(--offsetX) var(--offsetY),
        calc(var(--size) + var(--offsetX)) calc(var(--size) + var(--offsetY));
      background-size: calc(var(--size) * 2) calc(var(--size) * 2);
    }
  }

}
</style>
