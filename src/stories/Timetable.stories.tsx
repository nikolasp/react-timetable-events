import { ComponentMeta, ComponentStory } from "@storybook/react";
import format from "date-fns/format";
import { TimeTable } from "..";
import {
  DayHeaderPreviewProps,
  EventPreviewProps,
  HourPreviewProps,
} from "./../types";
// @ts-expect-error Cannot find module './styles.module.css' or its corresponding type declarations.
import customClassNames from "./styles.module.css";

export default {
  title: "Example/TimeTable",
  component: TimeTable,
  argTypes: {
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
  },
} as ComponentMeta<typeof TimeTable>;

const Template: ComponentStory<typeof TimeTable> = (args) => (
  <TimeTable {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
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
      className={`${otherProperties.className} ${customClassNames.my_custom_hour}`}
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
      <span className={classNames.event_info}>[ {event.name} ]</span>
      <span className={classNames.event_info}>
        {format(event.startTime, "HH:mm")} - {format(event.endTime, "HH:mm")}
      </span>
    </div>
  );
};

export const Secondary = Template.bind({});
Secondary.storyName = "Customized: <renderEvent> and <renderHour>";
Secondary.args = {
  ...Primary.args,
  timeLabel: "",
  renderDayHeader: DayHeaderPreview,
  renderEvent: EventPreview,
  renderHour: HourPreview,
  headerAttributes: {
    className: customClassNames.my_custom_day_header,
  },
  bodyAttributes: {
    className: customClassNames.my_custom_day_body,
  },
};
