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
  workspace.set('selectable', false);
  workspace.set('hasControls', false);
  canvas.add(workspace)
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
    throttle(() => {
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

    .workspace-canvas {
      width: 300px;
      height: 300px;
      margin: 0 auto;
    }
  }

}
</style>
