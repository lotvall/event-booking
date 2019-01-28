const authResolver = require('./auth')
const eventResolver = require('./events')
const bookingResolver = require('./booking')

const rootResolver = {
  ...authResolver,
  ...eventResolver,
  ...bookingResolver,
}

console.log('root resolver: ', rootResolver)
console.log('rootResolver.events', rootResolver.events)
console.log('rootResolver.bookings', rootResolver.bookings)

module.exports = rootResolver
