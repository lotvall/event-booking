const User = require('../../models/user')
const Event = require('../../models/event')
const Booking = require('../../models/booking')

const bcrypt = require('bcryptjs')


const getEvents = async eventIds => {

  try {
    const events = await Event.find({_id: {$in: eventIds}})
    return events.map(event => {
      return {
        ...event._doc,
        _id: event.id,
        date: new Date(event._doc.date).toISOString(),
        creator: getUser.bind(this, event._doc.creator)
       }
    })
  } catch (err) {
    throw err
  }
}

const getSingleEvent = async eventId => {

  try {
    const event = await Event.findById(eventId)
    return {
      ...event._doc,
      _id: eventId,
      creator: getUser.bind(this, user._doc.createdEvents)
    }
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



const resolver =  {
  events: async () => {
    try {
      const events = await Event.find()
      return events.map(event => {
        return {
          ...event._doc,
          _id: event._doc._id.toString(),
          date: new Date(event._doc.date).toISOString(),
          creator: getUser.bind(this, event._doc.creator)
        }
      })
    } catch(err) {
      throw err
    }
  },
  bookings: async () => {
    try {
      const bookings = await Booking.find()
      return bookings.map(booking => {
        return {
          ...booking._doc,
          _id: booking.id,
          user: getUser.bind(this, booking._doc.user),
          event: getSingleEvent.bind(this, booking._doc.event),
          createdAt: new Date(booking._doc.createdAt).toISOString(),
          updatedAt: new Date(booking._doc.updatedAt).toISOString()
        }
      })
    } catch(err) {
      throw err
    }
  },

  createEvent: async (args) => {
    //using the Mongoose model
    const event = new Event ({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
      creator: "5c4dbde15862606942e6360a"
    })
    let createdEvent
    try {
      const res = await event.save()
      createdEvent =  {
        ...res._doc,
        _id: res._doc._id.toString(),
        date: new Date(event._doc.date).toISOString(),
        creator: getUser.bind(this, res._doc.creator)
      }
      const creatorUser = await User.findById("5c4dbde15862606942e6360a")
      if (!creatorUser) {
        throw new Error ('No user exists')
      }
      creatorUser.createdEvents.push(event)

      await creatorUser.save()

      return createdEvent
    } catch (err) {
      throw err
    }
  },

  createUser: async (args) => {
    try {
      const userExists = await User.findOne({email: args.userInput.email})
      if (userExists) {
        throw new Error ('User already exists')
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12)
      const createdUser = new User({
        email: args.userInput.email,
        password: hashedPassword
      })
      const result = await user.save()
      return {...result._doc, password: null, _id: result.id}
    } catch(err){
      throw err
    }
  },
  bookEvent: async (args) => {
    const bookedEvent = await Event.findOne({_id: args.eventId})
    const booking = new Booking({
      user: "5c4dbde15862606942e6360a",
      event: bookedEvent
    })
    const result = await booking.save()
    return {
      ...result._doc,
      _id: result.id,
      user: getUser.bind(this, booking._doc.user),
      event: getSingleEvent.bind(this, booking._doc.event),

      createdAt: new Date(result._doc.createdAt).toISOString(),
      updatedAt: new Date(result._doc.updatedAt).toISOString()
    }
  },
  cancelBooking: async (args) => {
    try {
      const cancelledBooking = await Booking.findOne({_id: args.bookingId}).populate('event')
      const cancelledEvent = {
        ...cancelledBooking.event._doc,
        _id: ...cancelledBooking.event.id,
        creator: user.bind(this, cancelledBooking.event._doc.creator)
      }
      await Booking.deleteOne({_id: args.bookingId})
      return cancelledEvent
    } catch (err) {
      throw err
    }
  }
}

module.exports = resolver
