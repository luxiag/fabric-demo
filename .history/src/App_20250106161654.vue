

<template>
<div class="fabric-page">
  <canvas id="canvas" class="canvas-container"></canvas>

</div>
</template>
<script setup lang="ts">
import { fabric } from 'fabric';

const state = reactive({
  canvas: null as fabric.Canvas | null
})

onMounted(()=> {
  state.canvas= new fabric.Canvas('canvas', {
    
  })
})

</script>
<style scoped lang="scss">
.fabric-page {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  .canvas-container {
    width: 300px;
    height: 300px;
    margin: 0 auto;
  }
}
</style>
