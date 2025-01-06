

<template>
<div class="fabric-page">
  <canvas id="canvas" class="canvas-container"></canvas>

</div>
</template>
<script setup lang="ts">
import { fabric } from 'fabric';

</script>
<style scoped lang="scss">
.fabric-page {
  width: 100vw;
  height: 100vh;
  .canvas-container {
    width: 300px;
    height: 300px;
    margin: 0 auto;
  }
}
</style>
