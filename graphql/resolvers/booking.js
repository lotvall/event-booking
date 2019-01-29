const Event = require('../../models/event')
const Booking = require('../../models/booking')
const { transformEvent, transformBooking} = require('./mergeFunctions')

const dateToString = date => new Date(date).toISOString()


const bookingResolver =  {

  bookings: async (args,req) => {
    if(!req.isAuth) {
      throw new Error('Unauthenticated')
    }
    try {
      const bookings = await Booking.find()
      return bookings.map(booking => {
        return transformBooking(booking)
      })
    } catch(err) {
      throw err
    }
  },

  bookEvent: async (args, req) => {
    if(!req.isAuth) {
      throw new Error('Unauthenticated')
    }
    const bookedEvent = await Event.findOne({_id: args.eventId})
    const booking = new Booking({
      user: req.userId,
      event: bookedEvent
    })
    const result = await booking.save()
    return transformBooking(result)
  },
  cancelBooking: async (args, req) => {
    if(!req.isAuth) {
      throw new Error('Unauthenticated')
    }
    try {
      const cancelledBooking = await Booking.findOne({_id: args.bookingId}).populate('event')
      const cancelledEvent = transformEvent(cancelledBooking.event)
      await Booking.deleteOne({_id: args.bookingId})
      return cancelledEvent
    } catch (err) {
      throw err
    }
  }
}

module.exports = bookingResolver
