import { DEFAULT_HOURS_INTERVAL } from './constants'

export interface EventPreviewProps {
    event: Event;
    defaultAttributes: React.HTMLAttributes<HTMLDivElement>;
    classNames: ClassNames;
}


export interface HourPreviewProps {
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

export interface TimeTableProps {
    events: Events;
    hoursInterval?: typeof DEFAULT_HOURS_INTERVAL;
    timeLabel?: string;
    getDayLabel?: (day: string) => string;
    renderEvent?: React.FC<EventPreviewProps>;
    renderHour?: React.FC<HourPreviewProps>;
}

export interface EventsList {
    day: string;
    events: Events;
    renderEvent: React.FC<EventPreviewProps>;
    hoursInterval: typeof DEFAULT_HOURS_INTERVAL;
    rowHeight: number;
}