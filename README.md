# react-timetable-events

[![NPM](https://img.shields.io/npm/v/react-timetable-events.svg)](https://www.npmjs.com/package/react-timetable-events) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Description [(Demo)](https://nikolasp.github.io/react-timetable-events/)

> React Timetable Events - flexible timetable component with overlapping event support. Ideal for school timetables, scheduling apps, and calendar views.

## Installation

```bash
# with yarn
yarn add react-timetable-events

# with npm
npm install react-timetable-events
```

## Usage

```tsx
import * as React from 'react'
import Timetable from 'react-timetable-events'

export const Example = () => (
  <Timetable 
    events={{
      monday: [
        {
          id: 1,
          name: "Custom Event 1",
          type: "custom",
          startTime: new Date("2018-02-23T11:30:00"),
          endTime: new Date("2018-02-23T13:30:00"),
        },
      ],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
    }}
    style={{ height: '500px' }}
  />
)
```

## Available props

```ts
interface TimetableProps {
  events: TimetableEvents;                          // events object organized by day
  hoursInterval?: { from: number; to: number };  // displayed hours range (default: 8-17)
  renderDayHeader?: React.ComponentType<DayHeaderProps>;   // custom day header component
  renderHour?: React.ComponentType<HourProps>;             // custom hour cell component
  renderEvent?: React.ComponentType<EventPreviewProps>;    // custom event component
  getDayLabel?: (day: string) => string;   // customize weekday labels
  timeLabel?: string;                      // Time column header text
  style?: React.CSSProperties;             // wrapper styles (height, width, etc.)
  headerAttributes?: Record<string, string>;  // HTML attributes for header
  bodyAttributes?: Record<string, string>;    // HTML attributes for body
  hourColumnWidth?: number;                // width of the hour column in px (default: 70)
}
```

Check [Storybook](./src/stories/Timetable.stories.tsx) for more details about customization.

## Events - the only required prop

```ts
export interface TimetableEvent {
  id: number | string;
  name: string;
  startTime: Date;
  endTime: Date;
  type?: string;
  [key: string]: unknown;
}

export interface TimetableEvents {
  [day: string]: TimetableEvent[];
}

const events: TimetableEvents = {
  monday: [
    {
      id: 1,
      name: "Custom Event 1",
      type: "custom",
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
};
```

## Features

- **Overlapping event detection** - Events that overlap in time are automatically displayed side-by-side in columns
- **Hours interval clipping** - Events are clamped to the visible hours range
- **Accessible markup** - ARIA roles and labels for screen readers
- **Fully customizable** - Override default rendering for day headers, hours, and events
- **Responsive** - Automatically adjusts to container size changes
- **TypeScript support** - Full type definitions included

## License

MIT © [Nikola Spalevic](https://github.com/nikolasp) & [Filip Furtula](https://github.com/fujee)
