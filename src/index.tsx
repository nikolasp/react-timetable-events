import range from "lodash/range";
import round from "lodash/round";
import upperCase from "lodash/upperCase";
import PropTypes from "prop-types";
import * as React from "react";
import { 
  setHours, 
  setMinutes, 
  differenceInMinutes, 
  format 
} from 'date-fns'
import type { 
  EventPreview, 
  DayColumnPreview,
  Event, 
  HoursList,
  HourPreview, 
  TimeTable, 
  EventsList 
} from './types'
// @ts-expect-error
import classNames from "./styles.module.css";
import { DEFAULT_HOURS_INTERVAL } from "./constants";

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
  let startOfDay = setMinutes(setHours(event.startTime, hoursInterval.from), 0)

  let minutesFromStartOfDay = round(
    differenceInMinutes(event.startTime, startOfDay)
  );
  
  let minutes = round(differenceInMinutes(event.endTime, event.startTime));
  console.log(minutes)
  console.log(minutesFromStartOfDay)
  return {
    height: (minutes * rowHeight) / 60 + "vh",
    marginTop: (minutesFromStartOfDay * rowHeight) / 60 + "vh",
  };
};

export const HourPreviewJSX: React.FC<HourPreview> = ({ hour, defaultAttributes }) => (
  <div {...defaultAttributes} key={hour}>
    {hour}
  </div>
);


export const EventPreviewJSX: React.FC<EventPreview> = ({
  event,
  defaultAttributes,
  classNames,
}) => {
  return (
    <div {...defaultAttributes} title={event.name} key={event.id}>
      <span className={classNames.event_info}>{event.name}</span>
      <span className={classNames.event_info}>
        {format(event.startTime, "HH:mm")} - {format(event.endTime, "HH:mm")}
      </span>
    </div>
  );
};

export const EventsListJSX = ({
  events,
  day,
  hoursInterval,
  rowHeight,
  renderEvent,
}: EventsList) => {
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

const DayColumnPreviewJSX = ({
  events,
  day,
  index,
  rowHeight,
  getDayLabel,
  renderEvent,
  hoursInterval,
}: DayColumnPreview) => (
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
    {EventsListJSX({
      events,
      day,
      renderEvent,
      hoursInterval,
      rowHeight,
    })}
  </div>
);

export const HoursListJSX = ({
  hoursInterval,
  rowHeight,
  renderHour,
}: HoursList) => {
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


export const TimeTableJSX = ({
  events,
  hoursInterval = DEFAULT_HOURS_INTERVAL,
  timeLabel = "Time",
  getDayLabel = getDefaultDayLabel,
  renderEvent = EventPreviewJSX,
  renderHour = HourPreviewJSX,
}: TimeTable) => {
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
        {HoursListJSX({ hoursInterval, renderHour, rowHeight })}
      </div>

      {Object.keys(events).map((day, index) =>
        DayColumnPreviewJSX({
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

TimeTableJSX.propTypes = {
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

TimeTableJSX.defaultProps = {
  hoursInterval: DEFAULT_HOURS_INTERVAL,
  timeLabel: "Time",
  renderHour: HourPreviewJSX,
  renderEvent: EventPreviewJSX,
  getDayLabel: getDefaultDayLabel,
};

export default TimeTable;
