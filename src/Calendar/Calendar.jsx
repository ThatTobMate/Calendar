import React, { Component } from 'react'
import _ from 'lodash'
import Event from '../Event/Event'
import Time from '../Time/Time'
import styles from './Calendar.css'
import sortEvents from '../lib/sortEvents'

// Need to refactor, can extract some of this code into their own lib files.

class Calendar extends Component {

	static defaultProps = {
		startTime: 9,
		endTime: 21,
		calWidth: 620,
		calPadding: 10
	}

	render () {
		let { endTime, startTime, calWidth, calPadding, events } = this.props
		const style = {
			height: (endTime - startTime) * 60,
			width: calWidth
		}
		const filteredEvents = this.filterEvents(events)
		this.groupEvents(filteredEvents)

		return (
			<div className={styles.container} style={style}>
				<Time height={style.height} startTime={startTime} endTime={endTime} />
				{ events.map((e, i) => {
					return <Event start={e.start} end={e.end} key={i} styling={e.style} />
				})}
			</div>
		)
	}

	groupEvents (collections) {
		const { calWidth } = this.props
		const length = Object.keys(collections).length
		const events = []
		for(var i = 0; i < length; i++) {
			const collection = collections[i]
			events.push(this.styleEvents(collection.events))
		}
		return _.flatten(events)
	}

	styleEvents (events) {
		const { calWidth, calPadding } = this.props
		const sortedEvents = sortEvents(events)
		const eventPadding = 10
    const totalEvents = sortedEvents.length
    const eventOffsets = eventPadding * totalEvents
    const width = (calWidth - eventOffsets) / totalEvents
    _.each(sortedEvents, (events, i) => {
    	this.styleEvent(events, i, width, eventPadding)
    })
  }

  styleEvent (events, index, width, eventPadding) {
	  const left = index * (width + eventPadding)
	  _.each(events, event => {
			event.style = {
	      left,
	      width,
	      top: event.start,
	      height: event.end - event.start
	    }
	  })
  }

	checkOverlap (ev, collection) {
		return _.some(collection, c => ev.start >= c.start && ev.start < c.end)
	}

	filterEvents (events) {
		const eventCollections = {}
		let count = 0
		// Collect any events that overlap times into their own array
		_.each(events, (e, i) => {
			if (i === 0) {
				eventCollections[count] = {events: [e]}
				count ++
			} else {
				let lastCollection = eventCollections[Object.keys(eventCollections).length - 1].events
				// Check if the event overlaps any of the events in lastCollection, if it does, push the event into that collection. If it doesn't add the event to it's own array and push this into the eventCollections.
				if (this.checkOverlap(e, lastCollection)) {
					lastCollection.push(e)
				} else {
					eventCollections[count] = {events: [e]}
					count ++
				}
			}
		})

		return eventCollections
	}
}

export default Calendar
