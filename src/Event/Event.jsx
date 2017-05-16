import React from 'react'
import styles from './Event.css'

const Event = ({ start, end, styling }) => {
  const style = {
    position: 'absolute',
    top: start,
    height: end - start,
    ...styling
  }
  const { eventContainer, title, subtitle } = styles
  return (
    <div className={eventContainer} style={style}>
      <h1 className={title}>Sample Event</h1>
      <h4 className={subtitle}>Sample location</h4>
    </div>
  )
}

export default Event
