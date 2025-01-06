

<template>
<div class="fabric-page">
  <canvas id="canvas" :class="state.ruler ? 'design-stage-grid' : ''"></canvas>

</div>
</template>
<script setup lang="ts">
import { fabric } from 'fabric';

</script>
<style scoped lang="scss">
.fabric-page {
  width: 100vw;
  height: 100vh;
}
</style>
