const Event = require('../../models/event')
const User = require('../../models/user')
const { transformEvent } = require('./mergeFunctions')

module.exports = {
  events: async () => {
    try {
      const events = await Event.find()
      return events.map((event) => {
        return transformEvent(event)
      })
    } catch(err) {
      throw err
    }
  },

  createEvent: async (args, req) => {
    //using the Mongoose model
    if(!req.isAuth) {
      throw new Error('Unauthenticated')
    }
    const event = new Event ({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
      creator: req.userId
    })

    let createdEvent
    try {
      const res = await event.save()
      createdEvent =  transformEvent(res)

      const creatorUser = await User.findById(event.creator)
      if (!creatorUser) {
        throw new Error ('No user exists')
      }
      creatorUser.createdEvents.push(event)

      await creatorUser.save()

      return createdEvent
    } catch (err) {
      throw err
    }
  }
}
