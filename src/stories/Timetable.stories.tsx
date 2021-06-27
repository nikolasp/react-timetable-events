import { ComponentMeta, ComponentStory } from "@storybook/react";
import moment from "moment";
import React from "react";
import { EventPreviewProps, HourPreviewProps, TimeTable } from "./../index";

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
  },
  hoursInterval: { from: 7, to: 24 },
  timeLabel: "Time",
  getDayLabel: (day) => day.slice(0, 3),
};

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

export const Secondary = Template.bind({});
Secondary.storyName = 'Customized: `renderEvent` and `renderHour`'
Secondary.args = {
  ...Primary.args,
  renderEvent: EventPreview,
  renderHour: HourPreview,
};
