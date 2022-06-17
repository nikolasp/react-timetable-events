import * as React from "react";
import { DEFAULT_HOURS_INTERVAL } from "./constants";

export type ClassNames = {
  time_table_wrapper: string;
  day: string;
  day_title: string;
  hour: string;
  event: string;
  event_info: string;
};

export interface Event {
  id: number | string;
  name: string;
  startTime: Date;
  endTime: Date;
  type?: string;
  [key: string]: unknown;
}

export interface Events {
  [day: string]: Event[];
}

export type DayHeaderPreviewProps = {
  day: string;
  rowHeight: number;
} & React.HTMLAttributes<HTMLDivElement>;

export type HourPreviewProps = {
  hour: string;
} & React.HTMLAttributes<HTMLDivElement>;

export interface EventPreviewProps {
  event: Event;
  defaultAttributes: React.HTMLAttributes<HTMLDivElement>;
  classNames: ClassNames;
}

export interface EventsListProps {
  day: string;
  events: Events;
  renderEvent: React.FC<EventPreviewProps>;
  hoursInterval: typeof DEFAULT_HOURS_INTERVAL;
  rowHeight: number;
}

export interface DayColumnPreviewProps {
  events: Events;
  day: string;
  index: number;
  rowHeight: number;
  renderDayHeader: React.FC<DayHeaderPreviewProps>;
  renderEvent: React.FC<EventPreviewProps>;
  hoursInterval: typeof DEFAULT_HOURS_INTERVAL;
  headerAttributes?: React.HTMLAttributes<HTMLDivElement>;
  bodyAttributes?: React.HTMLAttributes<HTMLDivElement>;
}

export interface HoursListProps {
  hoursInterval: typeof DEFAULT_HOURS_INTERVAL;
  rowHeight: number;
  renderHour: React.FC<HourPreviewProps>;
}

export type TimeTableProps = {
  events: Events;
  hoursInterval?: typeof DEFAULT_HOURS_INTERVAL;
  timeLabel?: string;
  renderDayHeader?: React.FC<DayHeaderPreviewProps>;
  renderEvent?: React.FC<EventPreviewProps>;
  renderHour?: React.FC<HourPreviewProps>;
  headerAttributes?: React.HTMLAttributes<HTMLDivElement>;
  bodyAttributes?: React.HTMLAttributes<HTMLDivElement>;
} & React.HTMLAttributes<HTMLDivElement>;
