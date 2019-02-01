const express = require('express')
const bodyParser = require('body-parser')
const graphqlHttp= require('express-graphql')
const mongoose = require('mongoose')


const isAuth = require('./middleware/isAuth')
const graphQlSchema = require('./graphql/schema/index')
const graphQlResolvers = require('./graphql/resolvers/index')
// const cors = require('cors')

const app = express()

// app.use(cors())

app.use(bodyParser.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*")
  res.setHeader('Access-Control-Allow-Methods', "POST, GET, OPTIONS")
  res.setHeader('Access-Control-Allow-Headers', "Content-Type, Authorization")
  if(req.method === "OPTIONS") {
    return res.sendStatus(200)
  }
  next()

})

app.use(isAuth) // return req.isAuth true or false

app.use('/graphql', graphqlHttp({
  schema: graphQlSchema,
  rootValue: graphQlResolvers,
  graphiql: true
}))
mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-0o2ie.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`
)
.then(() => {
  app.listen(8000)
}).catch(err => {

  console.log(err)
})
