# react-timetable-events

> React Timetable Events Component

[![NPM](https://img.shields.io/npm/v/react-timetable-events.svg)](https://www.npmjs.com/package/react-timetable-events) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-timetable-events
```

## Usage

```jsx
import React, { Component } from 'react'

import Timetable from 'react-timetable-events'

class Example extends Component {
  render () {
    return (
      <Timetable events={this.state.events}/>
    )
  }
}
```

## Available props

```js
TimeTable.propTypes = {
  events: PropTypes.object.isRequired, // events object prepared with days and list of events
  hoursInterval: PropTypes.array, // array with min and max hours
  renderEvent: PropTypes.func, // render event element in timetable
  getDayLabel: PropTypes.func, // change weekday label
  timeLabel: PropTypes.string // Time label
}
```

## Default props

```js
TimeTable.defaultProps = {
  hoursInterval: [ 7, 24 ],
  timeLabel: 'Time',
  renderHour(hour) {
    return (
      <div className={styles.hour}
           style={{ height: `${this.state.rowHeight}vh` }}
           key={hour}>
        { hour }
      </div>
    )
  },
  renderEvent(event) {
    return (
      <div className={`${styles.event} ${event.type}`}
           style={ this.getEventPositionStyles(event) }
           title={event.name}
           key={event.id}>
        <span className={styles.event_info}>{ event.name }</span>
        <span className={styles.event_info}>
          { event.startTime.format('HH:mm') } - { event.endTime.format('HH:mm') }
        </span>
      </div>
    )
  },
  getDayLabel: (day) => upperCase(day)
}
```

## Events prop format

```js
  this.state = {
    events: {
      monday: [
        {
          id: 1,
          name: 'Custom Event 1',
          type: 'custom',
          startTime: moment('2018-02-23T11:30:00'),
          endTime: moment('2018-02-23T13:30:00')
        }
      ],
      tuesday: [
        {
          id: 2,
          name: 'Custom Event 2',
          type: 'custom',
          startTime: moment('2018-02-22T12:30:00'),
          endTime: moment('2018-02-22T14:30:00')
        },
        {
          id: 3,
          name: 'Custom Event 3',
          type: 'custom',
          startTime: moment('2018-02-22T16:30:00'),
          endTime: moment('2018-02-22T18:45:00')
        }
      ],
      wednesday: [],
      thursday: [],
      friday: []
    }
  }
```

## License

MIT © [Nikola Spalevic](https://github.com/nikolasp) & [Filip Furtula](https://github.com/fujee)
