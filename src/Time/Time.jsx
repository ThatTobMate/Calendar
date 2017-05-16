import React, { Component } from 'react'
import styles from './Time.css'

class Time extends Component {
  render () {
    return (
      <div>
        { this.renderTimeBlocks() }
        { this.renderTimeLabels() }
      </div>
    )
  }

  renderTimeBlocks () {
    const { endTime, startTime, height } = this.props
    const timeBlocks = []
    const timeSpan = endTime - startTime

    for (let i = 0; i < timeSpan; i++) {
      let style = {
        height: height / timeSpan
      }
      if (i + 1 !== timeSpan) {
        style.borderBottom = '1px solid #f4f4f4'
      }
      timeBlocks.push(
        <div style={style} key={`timeBlock-${i}`} />
      )
    }
    return timeBlocks
  }

  renderTimeLabels () {
    const { endTime, startTime } = this.props
    const timeLabels = []
    const timeSpan = (endTime - startTime) + 0.5
    const height = 20

    for (let i = 0; i < timeSpan; i += 0.5) {
      const time = (i + startTime) * 60
      let hour = Math.floor(time / 60)
      let period = 'AM'
      let minute = time % 60
      const halfHour = i % 1 !== 0

      let style = {
        top: i * 60 - (height / 2),
        height
      }

      if (hour > 12) {
        hour = hour - 12
        period = 'PM'
      } else if (hour === 12) {
        period = 'PM'
      }

      if (halfHour) {
        period = ''
      } else {
        minute = `${minute}0`
      }

      timeLabels.push(
        <TimeLabel
          hour={hour}
          minute={minute}
          period={period}
          halfHour={halfHour}
          styles={styles}
          dynamicStyles={style}
          key={`timeLabel-${i}`}
        />
      )
    }
    return timeLabels
  }
}

const TimeLabel = ({ hour, minute, period, halfHour, styles, dynamicStyles }) => (
  <div
    className={`${styles.times} ${halfHour ? styles.halfHour : styles.hour}`}
    style={dynamicStyles}
  >
    <p className={styles.time}>{hour}:{minute}
      <span className={styles.period}> {period}</span>
    </p>
  </div>
)

export default Time
