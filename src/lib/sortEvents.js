import _ from 'lodash'

// Provided an array of events that have been grouped by their collisions, sortEvents will filter the events further by checking which block of events start and end times overlap. This can then be used to tell us the positioning for each event.

// I don't like 'blocks'.. Need to change

function sortEvents (collection) {
  let blocks = []
  _.each(collection, (event, i) => {
    !i ? blocks.push([event]) : mapEventsToBlocks(event, blocks)
  })
  return blocks
}

function mapEventsToBlocks (event, blocks) {
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i]
    const lastEv = _.last(block)
    if (lastEv.end < event.start) {
      block.push(event)
      return
    }
  }
  blocks.push([event])
}

export default sortEvents
