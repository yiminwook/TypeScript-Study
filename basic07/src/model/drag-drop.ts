/* eslint-disable @typescript-eslint/no-unused-vars */

export interface Draggable {
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}

export interface DragTarget {
  dragOverHandler(event: DragEvent): void;
  dragLeaveHandler(event: DragEvent): void;
  dropHandler(event: DragEvent): void;
}
