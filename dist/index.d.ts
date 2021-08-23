import PropTypes from "prop-types";
import * as React from "react";
import type { EventPreview, HoursList, HourPreview, TimeTable, EventsList } from './types';
export declare const getDefaultDayLabel: (day: string) => string;
export declare const HourPreviewJSX: React.FC<HourPreview>;
export declare const EventPreviewJSX: React.FC<EventPreview>;
export declare const EventsListJSX: ({ events, day, hoursInterval, rowHeight, renderEvent, }: EventsList) => (React.ReactElement<any, any> | null)[];
export declare const HoursListJSX: ({ hoursInterval, rowHeight, renderHour, }: HoursList) => (React.ReactElement<any, any> | null)[];
export declare const TimeTableJSX: {
    ({ events, hoursInterval, timeLabel, getDayLabel, renderEvent, renderHour, }: TimeTable): JSX.Element;
    propTypes: {
        events: PropTypes.Validator<object>;
        hoursInterval: PropTypes.Requireable<PropTypes.InferProps<{
            from: PropTypes.Validator<number>;
            to: PropTypes.Validator<number>;
        }>>;
        renderHour: PropTypes.Requireable<(...args: any[]) => any>;
        renderEvent: PropTypes.Requireable<(...args: any[]) => any>;
        getDayLabel: PropTypes.Requireable<(...args: any[]) => any>;
        timeLabel: PropTypes.Requireable<string>;
    };
    defaultProps: {
        hoursInterval: {
            from: number;
            to: number;
        };
        timeLabel: string;
        renderHour: React.FC<HourPreview>;
        renderEvent: React.FC<EventPreview>;
        getDayLabel: (day: string) => string;
    };
};
export default TimeTable;
