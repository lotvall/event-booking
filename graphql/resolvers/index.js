const User = require('../../models/user')
const Event = require('../../models/event')
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
const getUser = userId => {
  try {
    const user = User.findById(userId)
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
  }
}

module.exports = resolver
