import React, { Component } from 'react'
import moment from 'moment';

import TimeTable from 'react-timetable-events'

export default class App extends Component {

  constructor() {
    super()
    this.state = {
      events: {
        monday: [
          {
            id: 1,
            name: 'Custom Event 1',
            type: 'custom',
            startTime: moment("2018-02-23T11:30:00"),
            endTime: moment("2018-02-23T13:30:00")
          }
        ],
        tuesday: [
          {
            id: 2,
            name: 'Custom Event 2',
            type: 'custom',
            startTime: moment("2018-02-22T12:30:00"),
            endTime: moment("2018-02-22T14:30:00")
          },
          {
            id: 3,
            name: 'Custom Event 3',
            type: 'custom',
            startTime: moment("2018-02-22T16:30:00"),
            endTime: moment("2018-02-22T18:45:00")
          }
        ],
        wednesday: [],
        thursday: [],
        friday: []
      }
    }
  }

  render () {
    return (
      <div>
        <TimeTable events={this.state.events} />
      </div>
    )
  }
}