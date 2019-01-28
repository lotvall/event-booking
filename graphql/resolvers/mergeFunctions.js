const Event = require('../../models/event')
const User = require('../../models/user')
const dateToString = date => new Date(date).toISOString()


const transformBooking = (booking) => {
return  {
    ...booking._doc,
    _id: booking.id,
    user: getUser.bind(this, booking._doc.user),
    event: getSingleEvent.bind(this, booking._doc.event),
    createdAt: dateToString(booking._doc.createdAt),
    updatedAt: dateToString(booking._doc.updatedAt)
  }
}

const transformEvent = (event) => {
  return {
    ...event._doc,
    _id: event.id,
    date: dateToString(event._doc.date),
    creator: getUser.bind(this, event._doc.creator)
   }
}


const getEvents = async eventIds => {

  try {
    const events = await Event.find({_id: {$in: eventIds}})
    return events.map(event => {
      return transformEvent(event)
    })
  } catch (err) {
    throw err
  }
}

const getSingleEvent = async eventId => {

  try {
    const event = await Event.findById(eventId)
    return transformEvent(event)
  } catch (err) {
    throw err
  }
}

const getUser = async userId => {
  try {
    const user = await User.findById(userId)
    return {
      ...user._doc,
      _id: userId,
      password: null,
      createdEvents: getEvents.bind(this, user._doc.createdEvents)
    }
  } catch (err) {
    throw err
  }
}
exports.transformEvent = transformEvent
exports.transformBooking = transformBooking
// exports.getUser = getUser
// exports.getEvents = getEvents
// exports.getSingleEvent = getSingleEvent
