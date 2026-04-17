import * as React from "react";
import { DEFAULT_HOURS_INTERVAL, DEFAULT_HOUR_COLUMN_WIDTH } from "./constants";

export type ClassNames = {
  timeTableWrapper: string;
  day: string;
  dayTitle: string;
  hour: string;
  event: string;
  eventInfo: string;
};

export interface TimetableEvent {
  id: number | string;
  name: string;
  startTime: Date;
  endTime: Date;
  type?: string;
  [key: string]: unknown;
}

export interface TimetableEvents {
  [day: string]: TimetableEvent[];
}

export type DayHeaderPreviewProps = {
  day: string;
  rowHeight: number;
} & React.HTMLAttributes<HTMLDivElement>;

export type HourPreviewProps = {
  hour: string;
} & React.HTMLAttributes<HTMLDivElement>;

export interface EventPreviewProps {
  event: TimetableEvent;
  defaultAttributes: React.HTMLAttributes<HTMLDivElement>;
  classNames: ClassNames;
  columnOffset?: number;
  totalColumns?: number;
}

export interface EventsListProps {
  day: string;
  events: TimetableEvents;
  renderEvent: React.ComponentType<EventPreviewProps>;
  hoursInterval: typeof DEFAULT_HOURS_INTERVAL;
  rowHeight: number;
}

export interface DayColumnPreviewProps {
  events: TimetableEvents;
  day: string;
  index: number;
  rowHeight: number;
  renderDayHeader: React.ComponentType<DayHeaderPreviewProps>;
  renderEvent: React.ComponentType<EventPreviewProps>;
  hoursInterval: typeof DEFAULT_HOURS_INTERVAL;
  headerAttributes?: React.HTMLAttributes<HTMLDivElement>;
  bodyAttributes?: React.HTMLAttributes<HTMLDivElement>;
  hourColumnWidth: string;
}

export interface HoursListProps {
  hoursInterval: typeof DEFAULT_HOURS_INTERVAL;
  rowHeight: number;
  renderHour: React.ComponentType<HourPreviewProps>;
}

export type TimeTableProps = {
  events: TimetableEvents;
  hoursInterval?: typeof DEFAULT_HOURS_INTERVAL;
  timeLabel?: string;
  renderDayHeader?: React.ComponentType<DayHeaderPreviewProps>;
  renderEvent?: React.ComponentType<EventPreviewProps>;
  renderHour?: React.ComponentType<HourPreviewProps>;
  headerAttributes?: React.HTMLAttributes<HTMLDivElement>;
  bodyAttributes?: React.HTMLAttributes<HTMLDivElement>;
  hourColumnWidth?: string;
  getDayLabel?: (day: string) => string;
} & React.HTMLAttributes<HTMLDivElement>;
