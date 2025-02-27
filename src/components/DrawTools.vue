<template>
  <div class="tools-components">
    <!--  -->
  </div>
</template>
<script setup lang="ts">
import * as fabric from 'fabric';
import type { IWorkSpaceCanvas } from '@/types'
import type { PropType } from 'vue';

const defaultPosition = {
  fill: '#000000FF'
}

const props = defineProps({
  WorkSpaceCanvas: {
    type: Object as PropType<IWorkSpaceCanvas>,
    default: () => ({})
  }
})

const { WorkSpaceCanvas } = props

const addText = (event) => {
  const text = new fabric.IText('双击编辑文本', {
    ...defaultPosition,
  })
  WorkSpaceCanvas.addObject(text, { event })

}

</script>
