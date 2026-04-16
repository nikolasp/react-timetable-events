import { format } from "date-fns";
import type { Meta, StoryObj } from "@storybook/react";
import { TimeTable } from "..";
import {
  DayHeaderPreviewProps,
  EventPreviewProps,
  HourPreviewProps,
} from "./../types";
import customClassNames from "./styles.module.css";

export default {
  title: "Example/TimeTable",
  component: TimeTable,
} as Meta<typeof TimeTable>;

type Story = StoryObj<typeof TimeTable>;

export const Primary: Story = {
  args: {
    events: {
      monday: [
        {
          id: 1,
          name: "Custom Event 1",
          type: "error",
          startTime: new Date("2018-02-23T11:30:00"),
          endTime: new Date("2018-02-23T13:30:00"),
        },
      ],
      tuesday: [
        {
          id: 2,
          name: "Custom Event 2",
          type: "custom",
          startTime: new Date("2018-02-22T12:30:00"),
          endTime: new Date("2018-02-22T14:30:00"),
        },
        {
          id: 3,
          name: "Custom Event 3",
          type: "custom",
          startTime: new Date("2018-02-22T16:30:00"),
          endTime: new Date("2018-02-22T18:45:00"),
        },
      ],
      wednesday: [],
      thursday: [],
      friday: [],
    },
    style: { height: "500px" },
  },
};

const DayHeaderPreview = ({
  day,
  rowHeight,
  ...otherProperties
}: DayHeaderPreviewProps) => {
  return (
    <div
      {...otherProperties}
      style={{ ...(otherProperties?.style || {}), height: `${rowHeight}px` }}
    >
      {day}
    </div>
  );
};

const HourPreview = ({ hour, ...otherProperties }: HourPreviewProps) => {
  return (
    <div
      {...otherProperties}
      className={`${otherProperties.className} ${customClassNames.myCustomHour}`}
      key={hour}
    >
      {hour}
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
      <span className={classNames.eventInfo}>[ {event.name} ]</span>
      <span className={classNames.eventInfo}>
        {format(event.startTime, "HH:mm")} - {format(event.endTime, "HH:mm")}
      </span>
    </div>
  );
};

export const Secondary: Story = {
  name: "Customized: <renderEvent> and <renderHour>",
  args: {
    ...Primary.args,
    timeLabel: "",
    renderDayHeader: DayHeaderPreview,
    renderEvent: EventPreview,
    renderHour: HourPreview,
    headerAttributes: {
      className: customClassNames.myCustomDayHeader,
    },
    bodyAttributes: {
      className: customClassNames.myCustomDayBody,
    },
  },
};
