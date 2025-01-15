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


let canvas: fabric.Canvas | null = null
let resizeObserve: ResizeObserver | null = null
let workspace: HTMLCanvasElement | null = null



interface IWorkSpaceCanvas {
  canvasFC: fabric.Canvas | null
  editorFR: fabric.Rect | null
  workspaceDom: HTMLCanvasElement | null
  resizeObserver: ResizeObserver | null,
  initWorkspace(): void,
  initCanvasFc(): void,
  initResizeObserve(): void,
  setCenterFromObject(obj: fabric.Object): void
}


class WorkSpaceCanvas implements IWorkSpaceCanvas {

  private canvasFC: fabric.Canvas | null = null
  private editorFR: fabric.Rect | null = null
  private workspaceDom: HTMLCanvasElement | null = null
  private resizeObserver: ResizeObserver | null = null

  constructor(options: { canvasClass: string, workspaceClass: string }) {
    this.workspaceDom = document.querySelector(options.workspaceClass) as HTMLCanvasElement
    this.canvasFC = new fabric.Canvas(options.canvasClass, {
      // 
      stopContextMenu: true,

    })
  }
  initCanvasFc(){
    if(!this.canvasFC) {
      console.error('canvasFC is null')
      return
    }
    if(!this.workspaceDom) {
      console.error('workspaceDom is null')
      return
    }
    this.canvasFC.backgroundImage = undefined
    this.canvasFC.setDimensions({ width: this.workspaceDom?.offsetWidth, height: this.workspaceDom?.offsetHeight })
  }
  initWorkspace() {
    this.editorFR = new fabric.Rect({
      fill: 'rgba(255,255,255,1)',
      id: 'workspace',
      strokeWidth: 0,
      width: 900,
      height: 1200

    })
    this.editorFR.set('selectable', true);
    this.editorFR.set('hasControls', true);
    this.canvasFC?.add(this.editorFR)
  }
  initResizeObserve() {
    if(!this.workspaceDom) {
      console.error('workspaceDom is null')
      return
    }
    if(!this.workspaceDom) {
      console.error('workspaceDom is null')
      return
    }
    this.resizeObserver = new ResizeObserver(() => {
      if (!this.canvasFC || !this.workspaceDom) return
      this.canvasFC.setDimensions({ width: this.workspaceDom.offsetWidth, height: this.workspaceDom.offsetHeight })
      this.setCenterFromObject(this.editorFR as fabric.Rect)
    })

  }
  setCenterFromObject(object: fabric.Rect) {
    const objCenter = object.getCenterPoint()
    // viewportTransform
    // [ scaleX, skewX, skewY, scaleY, translateX, translateY ]
    const viewportTransform = canvas?.viewportTransform
    if (viewportTransform && canvas) {
      viewportTransform[4] = canvas.width / 2 - objCenter.x * viewportTransform[0]
      viewportTransform[5] = canvas.height / 2 - objCenter.y * viewportTransform[3]
      canvas.setViewportTransform(viewportTransform)
      canvas.renderAll()
    }
  }
}


const getDom = () => {
  workspace = document.querySelector('.workspace') as HTMLCanvasElement
}

const initBackground = (canvas: fabric.Canvas) => {
  if (!workspace || !canvas) return
  canvas.backgroundImage = undefined

  canvas.setDimensions({ width: workspace.offsetWidth, height: workspace.offsetHeight })
}

const initWorkspace = (canvas: fabric.Canvas) => {
  const workspace = new fabric.Rect({
    fill: 'rgba(255,255,255,1)',
    id: 'workspace',
    strokeWidth: 0,
    width: 900,
    height: 1200

  })
  workspace.set('selectable', true);
  workspace.set('hasControls', true);
  canvas.add(workspace)
  setCenterFromObject(workspace)
}



const setCenterFromObject = (object: fabric.Rect) => {
  const objCenter = object.getCenterPoint()
  // viewportTransform
  // [ scaleX, skewX, skewY, scaleY, translateX, translateY ]
  const viewportTransform = canvas?.viewportTransform
  if (viewportTransform && canvas) {
    viewportTransform[4] = canvas.width / 2 - objCenter.x * viewportTransform[0]
    viewportTransform[5] = canvas.height / 2 - objCenter.y * viewportTransform[3]
    canvas.setViewportTransform(viewportTransform)
    canvas.renderAll()
  }

}

const resizeWorkspace = () => {
  if (!workspace || !canvas) return
  const width = workspace.offsetWidth
  const height = workspace.offsetHeight

  canvas.setDimensions({ width, height })
}

const initResizeObserve = () => {
  if (!workspace) return

  // 监视 Element 内容盒或边框盒或者 SVGElement 边界尺寸的变化。
  resizeObserve = new ResizeObserver(
    debounce(() => {
      resizeWorkspace()
    }, 50)
  )
  resizeObserve.observe(workspace)
}

onMounted(() => {
  getDom()
  canvas = new fabric.Canvas('canvas', {
    stopContextMenu: true,
  })
  initBackground(canvas)
  initWorkspace(canvas)
  initResizeObserve()
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
      width: 300px;
      height: 300px;
      margin: 0 auto;
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
