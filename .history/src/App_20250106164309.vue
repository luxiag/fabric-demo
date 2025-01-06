

<template>
<div class="fabric-page">
  <div class="tool">
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
import { fabric } from 'fabric';

const state = reactive({
  canvas: null as fabric.Canvas | null
})


const initBackground = (canvas: fabric.Canvas) => {
  const workspace = document.querySelector('.workspace') as HTMLCanvasElement
  canvas.backgroundColor = 'white';
  canvas.backgroundImage = ''
  canvas.setWidth(workspace.offsetWidth)
  canvas.setHeight(workspace.offsetHeight)
}

onMounted(()=> {
  state.canvas = new fabric.Canvas('canvas', {
    stopContextMenu: true, 
  })
})

</script>
<style scoped lang="scss">
.fabric-page {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  .workspace {
    flex:1;
    .workspace-canvas {
    width: 300px;
    height: 300px;
    margin: 0 auto;
  }
  }

}
</style>
