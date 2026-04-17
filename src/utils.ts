import { differenceInMinutes, setHours, setMinutes } from "date-fns";
import { DEFAULT_HOURS_INTERVAL } from "./constants";
import type { TimetableEvent } from "./types";

export const getRowHeight = (from: number, to: number, totalHeight: number) => {
  const numberOfRows = to - from;
  return Math.round((totalHeight / numberOfRows) * 100000) / 100000;
};

export const getDefaultDayLabel = (day: string) => day.toUpperCase();

export const getEventPositionStyles = ({
  event,
  hoursInterval,
  rowHeight,
  columnOffset,
  totalColumns,
}: {
  event: TimetableEvent;
  hoursInterval: typeof DEFAULT_HOURS_INTERVAL;
  rowHeight: number;
  columnOffset: number;
  totalColumns: number;
}) => {
  const startOfDay = setMinutes(
    setHours(event.startTime, hoursInterval.from),
    0
  );
  const minutesFromStartOfDay = Math.round(
    differenceInMinutes(event.startTime, startOfDay)
  );
  const minutes = Math.round(differenceInMinutes(event.endTime, event.startTime));
  const columnWidth = 100 / totalColumns;

  return {
    height: `${(minutes * rowHeight) / 60}px`,
    marginTop: `${(minutesFromStartOfDay * rowHeight) / 60 + rowHeight}px`,
    left: `${columnOffset * columnWidth}%`,
    width: `${columnWidth}%`,
  };
};

export interface PositionedEvent extends TimetableEvent {
  columnOffset: number;
  totalColumns: number;
}

export const computeOverlappingColumns = (events: TimetableEvent[]): PositionedEvent[] => {
  if (events.length === 0) return [];

  const sorted = [...events].sort(
    (a, b) => a.startTime.getTime() - b.startTime.getTime()
  );

  const columns: TimetableEvent[][] = [];

  for (const event of sorted) {
    let placed = false;
    for (let i = 0; i < columns.length; i++) {
      const lastInColumn = columns[i][columns[i].length - 1];
      if (lastInColumn.endTime <= event.startTime) {
        columns[i].push(event);
        placed = true;
        break;
      }
    }
    if (!placed) {
      columns.push([event]);
    }
  }

  const totalColumns = columns.length;
  const result: PositionedEvent[] = [];

  for (let colIndex = 0; colIndex < columns.length; colIndex++) {
    for (const event of columns[colIndex]) {
      result.push({
        ...event,
        columnOffset: colIndex,
        totalColumns,
      });
    }
  }

  return result;
};

export const clampEventToInterval = (
  event: TimetableEvent,
  hoursInterval: typeof DEFAULT_HOURS_INTERVAL
): TimetableEvent => {
  const intervalStart = setMinutes(
    setHours(event.startTime, hoursInterval.from),
    0
  );
  const intervalEnd = setMinutes(
    setHours(event.startTime, hoursInterval.to),
    0
  );

  const clampedStart = event.startTime < intervalStart ? intervalStart : event.startTime;
  const clampedEnd = event.endTime > intervalEnd ? intervalEnd : event.endTime;

  if (clampedStart >= clampedEnd) {
    return { ...event, startTime: intervalStart, endTime: intervalStart };
  }

  return { ...event, startTime: clampedStart, endTime: clampedEnd };
};
