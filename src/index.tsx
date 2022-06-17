import format from "date-fns/format";
import range from "lodash/range";
import PropTypes from "prop-types";
import * as React from "react";
import { DEFAULT_HOURS_INTERVAL } from "./constants";
// @ts-expect-error Cannot find module './styles.module.css' or its corresponding type declarations.
import classNames from "./styles.module.css";
import type {
  DayColumnPreviewProps,
  DayHeaderPreviewProps,
  EventPreviewProps,
  EventsListProps,
  HourPreviewProps,
  HoursListProps,
  TimeTableProps,
} from "./types";
import {
  getDefaultDayLabel,
  getEventPositionStyles,
  getRowHeight,
} from "./utils";

export const DayHeaderPreview: React.FC<DayHeaderPreviewProps> = ({
  day,
  rowHeight,
  ...otherProperties
}) => {
  return (
    <div
      {...otherProperties}
      style={{ ...(otherProperties?.style || {}), height: `${rowHeight}px` }}
    >
      {getDefaultDayLabel(day)}
    </div>
  );
};

export const HourPreview: React.FC<HourPreviewProps> = ({
  hour,
  ...otherProperties
}) => (
  <div {...otherProperties} key={hour}>
    {hour}
  </div>
);

export const EventPreview: React.FC<EventPreviewProps> = ({
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

export const EventsList = ({
  events,
  day,
  hoursInterval,
  rowHeight,
  renderEvent,
}: EventsListProps) => {
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
  renderDayHeader,
  renderEvent,
  hoursInterval,
  headerAttributes,
  bodyAttributes,
}: DayColumnPreviewProps) => {
  return (
    <div
      {...bodyAttributes}
      className={`${classNames.day} ${day} ${bodyAttributes?.className || ""}`}
      style={{
        ...(bodyAttributes?.style || {}),
        backgroundSize: `1px ${2 * rowHeight}px`,
        width: `calc((100% - 5rem) / ${Object.keys(events).length})`,
      }}
      key={`${day}-${index}`}
    >
      {renderDayHeader({
        day,
        rowHeight,
        ...headerAttributes,
        className: `${classNames.day_title} ${
          headerAttributes?.className || ""
        }`,
      })}

      {EventsList({
        events,
        day,
        renderEvent,
        hoursInterval,
        rowHeight,
      })}
    </div>
  );
};

export const HoursList = ({
  hoursInterval,
  rowHeight,
  renderHour,
}: HoursListProps) => {
  return range(hoursInterval.from, hoursInterval.to).map((hour) =>
    renderHour({
      hour: `${hour}:00`,
      className: classNames.hour,
      style: { height: `${rowHeight}px` },
    })
  );
};

export const TimeTable = ({
  events,
  hoursInterval = DEFAULT_HOURS_INTERVAL,
  timeLabel = "Time",
  renderDayHeader = DayHeaderPreview,
  renderEvent = EventPreview,
  renderHour = HourPreview,
  headerAttributes,
  bodyAttributes,
  ...otherProperties
}: TimeTableProps) => {
  const [dimensions, setDimensions] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [rowHeight, setRowHeight] = React.useState<number>(0);
  const ref = React.useRef(null);
  const handleResize = () => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  React.useEffect(() => {
    window.addEventListener("resize", handleResize, false);
  }, []);

  React.useEffect(() => {
    if (ref.current) {
      const totalHeight = (ref.current as HTMLDivElement).clientHeight;
      setRowHeight(
        getRowHeight(hoursInterval.from, hoursInterval.to, totalHeight)
      );
    }
  }, [hoursInterval, dimensions]);

  return (
    <div
      {...otherProperties}
      className={`${classNames.time_table_wrapper} ${otherProperties.className}`}
      ref={ref}
    >
      <div className={classNames.day}>
        <div
          {...headerAttributes}
          className={`${classNames.day_title} ${
            headerAttributes?.className || ""
          }`}
          style={{
            ...(headerAttributes?.style || {}),
            height: `${rowHeight}px`,
          }}
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
          renderDayHeader,
          renderEvent,
          hoursInterval,
          headerAttributes,
          bodyAttributes,
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
  renderDayHeader: PropTypes.func,
  renderHour: PropTypes.func,
  renderEvent: PropTypes.func,
  getDayLabel: PropTypes.func,
  timeLabel: PropTypes.string,
  headerAttributes: PropTypes.object,
  bodyAttributes: PropTypes.object,
};

TimeTable.defaultProps = {
  hoursInterval: DEFAULT_HOURS_INTERVAL,
  timeLabel: "Time",
  renderDayHeader: DayHeaderPreview,
  renderHour: HourPreview,
  renderEvent: EventPreview,
};

export default TimeTable;
