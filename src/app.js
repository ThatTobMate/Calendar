import React from 'react'
import { render } from 'react-dom'
import Root from './Root'
import _ from 'lodash'

if (module.hot) {
  module.hot.accept()
}

const events = [
  {start: 30, end: 150},
  {start: 30, end: 150},
  {start: 30, end: 150},
  {start: 540, end: 600},
  {start: 560, end: 620},
  {start: 610, end: 670},
  {start: 610, end: 670}
]

let key = 0

function addKey (event) {
  event.key = key
  key++
  return event
}

function layOutDay (events) {
  const newEvents = _.orderBy(events, ['start']).map(addKey)

  render(
    <Root events={newEvents} />,
    document.getElementById('root')
  )
}

window.layOutDay = layOutDay

layOutDay(events)
