import { format } from "date-fns";
import * as React from "react";
import { DEFAULT_HOURS_INTERVAL, DEFAULT_HOUR_COLUMN_WIDTH } from "./constants";
import cssClasses from "./styles.module.css";
import type {
  DayColumnPreviewProps,
  DayHeaderPreviewProps,
  EventPreviewProps,
  EventsListProps,
  HourPreviewProps,
  HoursListProps,
  TimeTableProps,
  TimetableEvent,
} from "./types";
import {
  clampEventToInterval,
  computeOverlappingColumns,
  getDefaultDayLabel,
  getEventPositionStyles,
  getRowHeight,
} from "./utils";

const range = (start: number, end: number) => {
  const result: number[] = [];
  for (let i = start; i < end; i++) result.push(i);
  return result;
};

export const DayHeaderPreview = React.memo(function DayHeaderPreview({
  day,
  rowHeight,
  ...otherProperties
}: DayHeaderPreviewProps) {
  return (
    <div
      {...otherProperties}
      style={{ ...(otherProperties?.style || {}), height: `${rowHeight}px` }}
    >
      {getDefaultDayLabel(day)}
    </div>
  );
});

export const HourPreview = React.memo(function HourPreview({
  hour,
  ...otherProperties
}: HourPreviewProps) {
  return (
    <div {...otherProperties}>
      {hour}
    </div>
  );
});

export const EventPreview = React.memo(function EventPreview({
  event,
  defaultAttributes,
  classNames: cls,
}: EventPreviewProps) {
  return (
    <div {...defaultAttributes} title={event.name} role="article" aria-label={`Event: ${event.name}`}>
      <span className={cls.eventInfo}>{event.name}</span>
      <span className={cls.eventInfo}>
        {format(event.startTime, "HH:mm")} - {format(event.endTime, "HH:mm")}
      </span>
    </div>
  );
});

export const EventsList = React.memo(function EventsList({
  events,
  day,
  hoursInterval,
  rowHeight,
  renderEvent,
}: EventsListProps) {
  const dayEvents: TimetableEvent[] = events[day] || [];
  const clampedEvents = dayEvents.map((e) => clampEventToInterval(e, hoursInterval));
  const positionedEvents = computeOverlappingColumns(clampedEvents);

  return positionedEvents.map((event) => {
    const RenderEvent = renderEvent;
    return (
      <RenderEvent
        key={event.id}
        event={event}
        defaultAttributes={{
          className: `${cssClasses.event} ${event.type || ""}`,
          style: getEventPositionStyles({
            event,
            hoursInterval,
            rowHeight,
            columnOffset: event.columnOffset,
            totalColumns: event.totalColumns,
          }),
        }}
        classNames={cssClasses}
        columnOffset={event.columnOffset}
        totalColumns={event.totalColumns}
      />
    );
  });
});

const DayColumnPreview = React.memo(function DayColumnPreview({
  events,
  day,
  index,
  rowHeight,
  renderDayHeader,
  renderEvent,
  hoursInterval,
  headerAttributes,
  bodyAttributes,
  hourColumnWidth,
}: DayColumnPreviewProps) {
  const dayCount = Object.keys(events).length;
  const columnWidthStyle = `calc((100% - ${hourColumnWidth}) / ${dayCount})`;
  const RenderDayHeader = renderDayHeader;

  return (
    <div
      {...bodyAttributes}
      className={`${cssClasses.day} ${day} ${bodyAttributes?.className || ""}`}
      style={{
        ...(bodyAttributes?.style || {}),
        backgroundSize: `1px ${2 * rowHeight}px`,
        width: columnWidthStyle,
      }}
      role="region"
      aria-label={`${getDefaultDayLabel(day)} schedule`}
    >
      <RenderDayHeader
        day={day}
        rowHeight={rowHeight}
        {...headerAttributes}
        className={`${cssClasses.dayTitle} ${
          headerAttributes?.className || ""
        }`}
      />

      <EventsList
        events={events}
        day={day}
        renderEvent={renderEvent}
        hoursInterval={hoursInterval}
        rowHeight={rowHeight}
      />
    </div>
  );
});

export const HoursList = React.memo(function HoursList({
  hoursInterval,
  rowHeight,
  renderHour,
}: HoursListProps) {
  const RenderHour = renderHour;
  return range(hoursInterval.from, hoursInterval.to).map((hour) => (
    <RenderHour
      key={hour}
      hour={`${hour}:00`}
      className={cssClasses.hour}
      style={{ height: `${rowHeight}px` }}
    />
  ));
});

export const TimeTable = ({
  events,
  hoursInterval = DEFAULT_HOURS_INTERVAL,
  timeLabel = "Time",
  renderDayHeader = DayHeaderPreview,
  renderEvent = EventPreview,
  renderHour = HourPreview,
  headerAttributes,
  bodyAttributes,
  hourColumnWidth = DEFAULT_HOUR_COLUMN_WIDTH,
  ...otherProperties
}: TimeTableProps) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [rowHeight, setRowHeight] = React.useState(0);

  const computeRowHeight = React.useCallback(() => {
    if (!ref.current) return;
    const totalHeight = ref.current.clientHeight;
    if (totalHeight > 0) {
      setRowHeight(getRowHeight(hoursInterval.from, hoursInterval.to, totalHeight));
    }
  }, [hoursInterval]);

  React.useLayoutEffect(() => {
    computeRowHeight();
  }, [computeRowHeight]);

  React.useEffect(() => {
    window.addEventListener("resize", computeRowHeight, false);
    return () => window.removeEventListener("resize", computeRowHeight, false);
  }, [computeRowHeight]);

  const RenderHour = renderHour;

  const dayColumns = React.useMemo(
    () =>
      Object.keys(events).map((day, index) => (
        <DayColumnPreview
          key={`${day}-${index}`}
          events={events}
          day={day}
          index={index}
          rowHeight={rowHeight}
          renderDayHeader={renderDayHeader}
          renderEvent={renderEvent}
          hoursInterval={hoursInterval}
          headerAttributes={headerAttributes}
          bodyAttributes={bodyAttributes}
          hourColumnWidth={hourColumnWidth}
        />
      )),
    [events, rowHeight, renderDayHeader, renderEvent, hoursInterval, headerAttributes, bodyAttributes, hourColumnWidth]
  );

  return (
    <div
      {...otherProperties}
      className={`${cssClasses.timeTableWrapper} ${otherProperties.className || ""}`}
      ref={ref}
      role="grid"
      aria-label="Timetable"
    >
      <div className={cssClasses.day} role="rowheader">
        <div
          {...headerAttributes}
          className={`${cssClasses.dayTitle} ${
            headerAttributes?.className || ""
          }`}
          style={{
            ...(headerAttributes?.style || {}),
            height: `${rowHeight}px`,
          }}
        >
          {timeLabel}
        </div>
        {range(hoursInterval.from, hoursInterval.to).map((hour) => (
          <RenderHour
            key={hour}
            hour={`${hour}:00`}
            className={cssClasses.hour}
            style={{ height: `${rowHeight}px` }}
          />
        ))}
      </div>

      {dayColumns}
    </div>
  );
};

export default TimeTable;
