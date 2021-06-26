import moment from "moment";
import * as React from "react";
import {
  EventPreviewProps,
  Events,
  HourPreviewProps,
  TimeTable,
} from "react-timetable-events";

const HourPreview = ({ hour, defaultAttributes }: HourPreviewProps) => {
  return (
    <div {...defaultAttributes} key={hour}>
      {hour}h
    </div>
  );
};

const EventPreview = ({
  event,
  defaultAttributes,
  classNames,
}: EventPreviewProps) => {
  return (
    <div
      {...defaultAttributes}
      style={{
        ...defaultAttributes.style,
        background: event.type === "error" ? "#720000" : "#66B266",
      }}
      title={event.name}
      key={event.id}
      className={`${classNames.event}`}
    >
      <span className={classNames.event_info}>[ {event.name} ]</span>
      <span className={classNames.event_info}>
        {event.startTime.format("HH:mm")} - {event.endTime.format("HH:mm")}
      </span>
    </div>
  );
};

const App = () => {
  const [events] = React.useState<Events>({
    monday: [
      {
        id: 1,
        name: "Custom Event 1",
        type: "error",
        startTime: moment("2018-02-23T11:30:00"),
        endTime: moment("2018-02-23T13:30:00"),
      },
    ],
    tuesday: [
      {
        id: 2,
        name: "Custom Event 2",
        type: "custom",
        startTime: moment("2018-02-22T12:30:00"),
        endTime: moment("2018-02-22T14:30:00"),
      },
      {
        id: 3,
        name: "Custom Event 3",
        type: "custom",
        startTime: moment("2018-02-22T16:30:00"),
        endTime: moment("2018-02-22T18:45:00"),
      },
    ],
    wednesday: [],
    thursday: [],
    friday: [],
  });

  return (
    <div>
      <TimeTable
        events={events}
        renderHour={HourPreview}
        renderEvent={EventPreview}
        hoursInterval={{ from: 7, to: 20 }}
        timeLabel="Time"
        getDayLabel={(day) => day.slice(0, 3)}
      />
    </div>
  );
};

export default App;
