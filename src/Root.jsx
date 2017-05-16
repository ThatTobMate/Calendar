import React from 'react'
import Calendar from './Calendar/Calendar'

const Root = props => (
  <div className='Root' style={{padding: 50}}>
    <Calendar events={props.events} />
  </div>
)

export default Root
