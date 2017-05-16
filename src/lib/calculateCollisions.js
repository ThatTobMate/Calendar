// I'm not using this anymore, was using it for a different approach
import _ from 'lodash'

function getCollisions (collections) {
  _.forIn(collections, (v, k) => {
    let max = 0
    let collection = _.get(collections, [k])
    _.each(collection.events, (event, outerIndex) => {
      event.collisions = 0
      _.each(collection.events, (e, innderIndex) => {
        if (innderIndex !== outerIndex && e.end > event.start && e.start < event.end) {
          event.collisions ++
          if (event.collisions > max) max = event.collisions
        }
      })
    })
    collection.maxCollisions = max
  })
}

export default getCollisions
