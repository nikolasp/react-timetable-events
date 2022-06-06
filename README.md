# react-timetable-events

[![NPM](https://img.shields.io/npm/v/react-timetable-events.svg)](https://www.npmjs.com/package/react-timetable-events) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Description [(Demo)](https://nikolasp.github.io/react-timetable-events/)

> React Timetable Events - flexible timetable component

## Install

```bash
yarn add react-timetable-events
```

## Usage

```tsx
import * as React from 'react'
import Timetable from 'react-timetable-events'

export const Example () => <Timetable 
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
```

## Available props

```js
TimeTable.propTypes = {
  events: PropTypes.object.isRequired, // events object prepared with days and list of events
  hoursInterval: PropTypes.shape({
    from: PropTypes.number.isRequired,
    to: PropTypes.number.isRequired,
  }), // displayed hours
  renderHour: PropTypes.func, // hour preview component
  renderEvent: PropTypes.func, // event preview component
  getDayLabel: PropTypes.func, // change weekday label
  timeLabel: PropTypes.string, // Time label
  style: React.CSSProperties, // pass custom wrapper styles like height and width
};
```

## Default props

```js
TimeTable.defaultProps = {
  hoursInterval: { from: 7, to: 24 },
  timeLabel: "Time",
  renderHour({hour, defaultAttributes, styles}) {
    return (
      <div {...defaultAttributes} key={hour}>
        {hour}
      </div>
    );
  },
  renderEvent({event, defaultAttributes, styles}) {
    return (
      <div {...defaultAttributes} title={event.name} key={event.id}>
        <span className={styles.event_info}>{event.name}</span>
        <span className={styles.event_info}>
          {event.startTime} - {event.endTime}
        </span>
      </div>
    );
  },
  getDayLabel: (day) => upperCase(day),
};
```

## Events - the only required prop

```ts
export interface Event {
  id: number | string;
  name: string;
  startTime: Date;
  endTime: Date;
  type?: string;
  [key: string]: unknown;
}

export interface Events {
  [day: string]: Event[];
}

const events: Events = {
  events: {
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
  },
};
```

## License

MIT © [Nikola Spalevic](https://github.com/nikolasp) & [Filip Furtula](https://github.com/fujee)
