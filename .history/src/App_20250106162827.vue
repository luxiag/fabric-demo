

<template>
<div class="fabric-page">
  <div class="tool">
    <!--  -->
  </div>
  <div class="content">
    <canvas id="canvas" class="canvas-container"></canvas>
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
  canvas.backgroundColor = 'white';
  canvas.backgroundImage = ''
  canvas.setWidth = document.
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
  .content {
    flex:1;
  }
  .canvas-container {
    width: 300px;
    height: 300px;
    margin: 0 auto;
  }
}
</style>
