import React, { Component } from 'react'
import PropTypes from 'prop-types'
import range from 'lodash/range'
import upperCase from 'lodash/upperCase'
import round from 'lodash/round'
import keys from 'lodash/keys'

import styles from './styles.css';

class TimeTable extends Component {

  constructor() {
    super()
    this.state = {
      rowHeight: 0
    }
  }

  componentWillMount() {
    this.setState({
      rowHeight: this.getRowHeight()
    })
  }

  getRowHeight() {
    let numberOfRows =
      this.props.hoursInterval[1] - this.props.hoursInterval[0] + 1

    return round((100 / numberOfRows), 5)
  }

  getEventPositionStyles(event) {
    let startOfDay = event.startTime.clone()
      .set('hour', this.props.hoursInterval[0])
      .set('minutes', 0);

    let minutesFromStartOfDay = round(
      event.startTime.diff(startOfDay) / 1000 / 60
    )
    let minutes = round(
      event.endTime.diff(event.startTime) / 1000 / 60
    );
    return {
      height: (minutes * this.state.rowHeight / 60) + 'vh',
      marginTop: (minutesFromStartOfDay * this.state.rowHeight / 60) + 'vh'
    }
  }

  renderDay(day, index) {
    return (
      <div className={`${styles.day} ${day}`}
           style={{
             backgroundSize: `1px ${2 * this.state.rowHeight}vh`,
             width: `calc((100% - 5rem) / ${keys(this.props.events).length})`
           }}
           key={`${day}-${index}`}>
        <div className={styles.day_title}
             style={{ height: `${this.state.rowHeight}vh` }}>
          { this.props.getDayLabel(day) }
        </div>
        {
          this.renderDayEvents(day)
        }
      </div>
    )
  }

  renderDayEvents(day) {
    return (this.props.events[day] || []).map((event) =>
              this.props.renderEvent.apply(this, [ event ]))
  }

  renderHours() {
    return (
      range(...this.props.hoursInterval)
        .map((hour) => this.props.renderHour.apply(this, [ `${hour}:00` ]))
    )
  }

  render() {
    return (
      <div className={styles.time_table_wrapper}>
        <div className={styles.day}>
          <div className={styles.day_title}
               style={{ height: `${this.state.rowHeight}vh` }}>
            {
              this.props.timeLabel
            }
          </div>
          {
            this.renderHours()
          }
        </div>

        { keys(this.props.events).map((day, index) => (
          this.renderDay(day, index)
        )) }
      </div>
    )
  }

}

TimeTable.propTypes = {
  hoursInterval: PropTypes.array,
  events: PropTypes.object.isRequired,
  renderEvent: PropTypes.func,
  getDayLabel: PropTypes.func,
  timeLabel: PropTypes.string
}

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

export default TimeTable;