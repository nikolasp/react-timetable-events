import range from "lodash/range";
import round from "lodash/round";
import upperCase from "lodash/upperCase";
import { Moment } from "moment";
import PropTypes from "prop-types";
import * as React from "react";

// @ts-expect-error
import classNames from "./styles.module.css";
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
  startTime: Moment;
  endTime: Moment;
  type?: string;
  [key: string]: unknown;
}

export interface Events {
  [day: string]: Event[];
}

const DEFAULT_HOURS_INTERVAL = { from: 7, to: 24 };

const getRowHeight = (from: number, to: number) => {
  const numberOfRows = to - from + 1;

  return round(100 / numberOfRows, 5);
};

export const getDefaultDayLabel = (day: string) => upperCase(day);

const getEventPositionStyles = ({
  event,
  hoursInterval,
  rowHeight,
}: {
  event: Event;
  hoursInterval: typeof DEFAULT_HOURS_INTERVAL;
  rowHeight: number;
}) => {
  let startOfDay = event.startTime
    .clone()
    .set("hour", hoursInterval.from)
    .set("minutes", 0);

  let minutesFromStartOfDay = round(
    event.startTime.diff(startOfDay) / 1000 / 60
  );
  let minutes = round(event.endTime.diff(event.startTime) / 1000 / 60);
  return {
    height: (minutes * rowHeight) / 60 + "vh",
    marginTop: (minutesFromStartOfDay * rowHeight) / 60 + "vh",
  };
};

export interface HourPreviewProps {
  hour: string;
  defaultAttributes: React.HTMLAttributes<HTMLDivElement>;
  classNames?: ClassNames;
}

export const HourPreview = ({ hour, defaultAttributes }: HourPreviewProps) => (
  <div {...defaultAttributes} key={hour}>
    {hour}
  </div>
);

export interface EventPreviewProps {
  event: Event;
  defaultAttributes: React.HTMLAttributes<HTMLDivElement>;
  classNames: ClassNames;
}

export const EventPreview = ({
  event,
  defaultAttributes,
  classNames,
}: EventPreviewProps) => {
  return (
    <div {...defaultAttributes} title={event.name} key={event.id}>
      <span className={classNames.event_info}>{event.name}</span>
      <span className={classNames.event_info}>
        {event.startTime.format("HH:mm")} - {event.endTime.format("HH:mm")}
      </span>
    </div>
  );
};

export const EventsList = ({
  events,
  day,
  hoursInterval,
  rowHeight,
  renderEvent,
}: {
  day: string;
  events: Events;
  renderEvent: typeof EventPreview;
  hoursInterval: typeof DEFAULT_HOURS_INTERVAL;
  rowHeight: number;
}) => {
  return (events[day] || []).map((event) =>
    renderEvent({
      event,
      defaultAttributes: {
        className: `${classNames.event} ${classNames.type}`,
        style: getEventPositionStyles({ event, hoursInterval, rowHeight }),
      },
      classNames,
    })
  );
};

const DayColumnPreview = ({
  events,
  day,
  index,
  rowHeight,
  getDayLabel,
  renderEvent,
  hoursInterval,
}: {
  events: Events;
  day: string;
  index: number;
  rowHeight: number;
  getDayLabel: (day: string) => string;
  renderEvent: typeof EventPreview;
  hoursInterval: typeof DEFAULT_HOURS_INTERVAL;
}) => (
  <div
    className={`${classNames.day} ${day}`}
    style={{
      backgroundSize: `1px ${2 * rowHeight}vh`,
      width: `calc((100% - 5rem) / ${Object.keys(events).length})`,
    }}
    key={`${day}-${index}`}
  >
    <div className={classNames.day_title} style={{ height: `${rowHeight}vh` }}>
      {getDayLabel(day)}
    </div>
    {EventsList({
      events,
      day,
      renderEvent,
      hoursInterval,
      rowHeight,
    })}
  </div>
);

export const HoursList = ({
  hoursInterval,
  rowHeight,
  renderHour,
}: {
  hoursInterval: typeof DEFAULT_HOURS_INTERVAL;
  rowHeight: number;
  renderHour: typeof HourPreview;
}) => {
  return range(hoursInterval.from, hoursInterval.to).map((hour) =>
    renderHour({
      hour: `${hour}:00`,
      defaultAttributes: {
        className: classNames.hour,
        style: { height: `${rowHeight}vh` },
      },
      classNames,
    })
  );
};

export interface TimeTableProps {
  events: Events;
  hoursInterval?: typeof DEFAULT_HOURS_INTERVAL;
  timeLabel?: string;
  getDayLabel?: (day: string) => string;
  renderEvent?: typeof EventPreview;
  renderHour?: typeof HourPreview;
}

export const TimeTable = ({
  events,
  hoursInterval = DEFAULT_HOURS_INTERVAL,
  timeLabel = "Time",
  getDayLabel = getDefaultDayLabel,
  renderEvent = EventPreview,
  renderHour = HourPreview,
}: TimeTableProps) => {
  const [rowHeight, setRowHeight] = React.useState<number>(0);

  React.useEffect(() => {
    setRowHeight(getRowHeight(hoursInterval.from, hoursInterval.to));
  }, [hoursInterval]);

  return (
    <div className={classNames.time_table_wrapper}>
      <div className={classNames.day}>
        <div
          className={classNames.day_title}
          style={{ height: `${rowHeight}vh` }}
        >
          {timeLabel}
        </div>
        {HoursList({ hoursInterval, renderHour, rowHeight })}
      </div>

      {Object.keys(events).map((day, index) =>
        DayColumnPreview({
          events,
          day,
          index,
          rowHeight,
          getDayLabel,
          renderEvent,
          hoursInterval,
        })
      )}
    </div>
  );
};

TimeTable.propTypes = {
  events: PropTypes.object.isRequired,
  hoursInterval: PropTypes.shape({
    from: PropTypes.number.isRequired,
    to: PropTypes.number.isRequired,
  }),
  renderHour: PropTypes.func,
  renderEvent: PropTypes.func,
  getDayLabel: PropTypes.func,
  timeLabel: PropTypes.string,
};

TimeTable.defaultProps = {
  hoursInterval: DEFAULT_HOURS_INTERVAL,
  timeLabel: "Time",
  renderHour: HourPreview,
  renderEvent: EventPreview,
  getDayLabel: getDefaultDayLabel,
};

export default TimeTable;
