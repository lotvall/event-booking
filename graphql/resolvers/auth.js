const bcrypt = require('bcryptjs')
const User = require('../../models/user')
const jwt = require('jsonwebtoken')

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
  login: async({email, password}) => {
    try {
      const user = await User.findOne({email: email})
      if (!user) {
        throw new Error ('User doesnt exist')
      }
      const correctPassword = await bcrypt.compare(password, user.password)
      if(!correctPassword) {
        throw new Error ('Password is incorrect')
      }
      const token = jwt.sign({userId: user.id, email: user.email}, 'a string that we use to hash very secure', {
        expiresIn: '1hr'
      })

      return {
        userId: user.id,
        token: token,
        tokenExpiration: 1
      }
    } catch (err) {
      throw err
    }
  }
}

module.exports = userResolver
