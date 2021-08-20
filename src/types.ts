import * as React from 'react'
import { DEFAULT_HOURS_INTERVAL } from './constants'

export interface EventPreview {
    event: Event;
    defaultAttributes: React.HTMLAttributes<HTMLDivElement>;
    classNames: ClassNames;
}

export interface HourPreview {
    hour: string;
    defaultAttributes: React.HTMLAttributes<HTMLDivElement>;
    classNames?: ClassNames;
}

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

export interface TimeTable {
    events: Events;
    hoursInterval?: typeof DEFAULT_HOURS_INTERVAL;
    timeLabel?: string;
    getDayLabel?: (day: string) => string;
    renderEvent?: React.FC<EventPreview>;
    renderHour?: React.FC<HourPreview>;
}

export interface EventsList {
    day: string;
    events: Events;
    renderEvent: React.FC<EventPreview>;
    hoursInterval: typeof DEFAULT_HOURS_INTERVAL;
    rowHeight: number;
}

export interface HoursList {
    hoursInterval: typeof DEFAULT_HOURS_INTERVAL;
    rowHeight: number;
    renderHour: React.FC<HourPreview>;
}

export interface DayColumnPreview {
    events: Events;
    day: string;
    index: number;
    rowHeight: number;
    getDayLabel: (day: string) => string;
    renderEvent: React.FC<EventPreview>;
    hoursInterval: typeof DEFAULT_HOURS_INTERVAL;
}