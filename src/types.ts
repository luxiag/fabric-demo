import * as fabric from 'fabric';

export interface IWorkSpaceCanvas {
  canvasFC: fabric.Canvas | null
  editorFR: fabric.Rect | null
  workspaceDom: HTMLCanvasElement | null
  resizeObserver: ResizeObserver | null
  initEditorFR(): void
  initCanvasFC(): void
  initResizeObserve(): void
  setCenterFromObject(obj: fabric.Object): void
  addObject(obj: fabric.Object): void

}
