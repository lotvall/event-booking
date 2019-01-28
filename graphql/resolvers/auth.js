const bcrypt = require('bcryptjs')
const User = require('../../models/user')

const userResolver =  {

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
}

module.exports = userResolver
