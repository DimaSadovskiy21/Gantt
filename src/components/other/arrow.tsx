import React from "react";
import { BarTask } from "../../types/bar-task";
import { Task } from "../../types/public-types";

type ArrowProps = {
  taskFrom: BarTask;
  isSelectedItem: boolean;
  taskTo: BarTask;
  rowHeight: number;
  taskHeight: number;
  arrowIndent: number;
  rtl: boolean;
  onArrowClick?: (taskFrom: Task, taskTo: Task) => void;
};
export const Arrow: React.FC<ArrowProps> = ({
  taskFrom,
  isSelectedItem,
  taskTo,
  rowHeight,
  taskHeight,
  arrowIndent,
  rtl,
  onArrowClick,
}) => {
  let path: string;
  let trianglePoints: string;
  if (rtl) {
    [path, trianglePoints] = drownPathAndTriangleRTL(
      taskFrom,
      taskTo,
      rowHeight,
      taskHeight,
      arrowIndent
    );
  } else {
    [path, trianglePoints] = drownPathAndTriangle(
      taskFrom,
      taskTo,
      rowHeight,
      taskHeight,
      arrowIndent
    );
  }

  const color = isSelectedItem ? "#52c41a" : "inherit";
  return (
    <g
      className="arrow"
      onClick={() => {
        if (!isSelectedItem) return;

        onArrowClick?.(taskFrom, taskTo);
      }}
      cursor={isSelectedItem ? "pointer" : "default"}
    >
      <path
        strokeWidth={isSelectedItem ? "2" : "1.5"}
        d={path}
        fill="none"
        stroke={color}
      />
      <polygon points={trianglePoints} stroke={color} fill={color} />
    </g>
  );
};

const drownPathAndTriangle = (
  taskFrom: BarTask,
  taskTo: BarTask,
  rowHeight: number,
  taskHeight: number,
  arrowIndent: number
) => {
  const indexCompare = taskFrom.index > taskTo.index ? -1 : 1;
  const taskToEndPosition = taskTo.y + taskHeight / 2;
  const taskFromEndPosition = taskFrom.x2 + arrowIndent * 2;
  const taskFromHorizontalOffsetValue =
    taskFromEndPosition < taskTo.x1 ? "" : `H ${taskTo.x1 - arrowIndent}`;
  const taskToHorizontalOffsetValue =
    taskFromEndPosition > taskTo.x1
      ? arrowIndent
      : taskTo.x1 - taskFrom.x2 - arrowIndent;

  const isSameRow = taskFrom.y === taskTo.y;

  const path = `M ${taskFrom.x2} ${taskFrom.y + taskHeight / 2} 
  h ${arrowIndent} 
  v ${isSameRow ? 0 : (indexCompare * rowHeight) / 2} 
  ${taskFromHorizontalOffsetValue}
  V ${taskToEndPosition} 
  h ${taskToHorizontalOffsetValue}`;

  const trianglePoints = `${taskTo.x1},${taskToEndPosition} 
  ${taskTo.x1 - 5},${taskToEndPosition - 5} 
  ${taskTo.x1 - 5},${taskToEndPosition + 5}`;
  return [path, trianglePoints];
};

const drownPathAndTriangleRTL = (
  taskFrom: BarTask,
  taskTo: BarTask,
  rowHeight: number,
  taskHeight: number,
  arrowIndent: number
) => {
  const indexCompare = taskFrom.index > taskTo.index ? -1 : 1;
  const taskToEndPosition = taskTo.y + taskHeight / 2;
  const taskFromEndPosition = taskFrom.x1 - arrowIndent * 2;
  const taskFromHorizontalOffsetValue =
    taskFromEndPosition > taskTo.x2 ? "" : `H ${taskTo.x2 + arrowIndent}`;
  const taskToHorizontalOffsetValue =
    taskFromEndPosition < taskTo.x2
      ? -arrowIndent
      : taskTo.x2 - taskFrom.x1 + arrowIndent;

  const path = `M ${taskFrom.x1} ${taskFrom.y + taskHeight / 2} 
  h ${-arrowIndent} 
  v ${(indexCompare * rowHeight) / 2} 
  ${taskFromHorizontalOffsetValue}
  V ${taskToEndPosition} 
  h ${taskToHorizontalOffsetValue}`;

  const trianglePoints = `${taskTo.x2},${taskToEndPosition} 
  ${taskTo.x2 + 5},${taskToEndPosition + 5} 
  ${taskTo.x2 + 5},${taskToEndPosition - 5}`;
  return [path, trianglePoints];
};
