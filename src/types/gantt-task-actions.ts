import { BarTask } from "./bar-task";

export type BarMoveAction = "progress" | "end" | "start" | "move" | "move-finished";
export type GanttContentMoveAction =
  | "mouseenter"
  | "mouseleave"
  | "delete"
  | "dblclick"
  | "click"
  | "select"
  | ""
  | BarMoveAction;

export type GanttEvent = {
  changedTask?: BarTask | BarTask[];
  originalSelectedTask?: BarTask | BarTask[];
  action: GanttContentMoveAction;
};
