const express = require('express')
const bodyParser = require('body-parser')
const graphqlHttp= require('express-graphql')
const { buildSchema }= require('graphql')


const app = express()

app.use(bodyParser.json())

const schema = buildSchema(`
  type RootQuery {
    events: [String!]!
  }

  type RootMutation {
    createEvent(name: String) : String
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);

app.use('/graphql', graphqlHttp({
  schema,
  rootValue:{
    events: () => {
      return ['cooking', 'sailing', 'coding']
    },
    createEvent: (args) => {
      const eventName = args.name
      return eventName
    }
  },
  graphiql: true
}))

// app.get('/', (req, res, next) => {
//   res.send('Hello world')
// })

app.listen(3000)
