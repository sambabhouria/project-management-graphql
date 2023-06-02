const express = require('express')
const colors = require('colors')
const cors = require('cors')
const { graphqlHTTP } = require('express-graphql')
// const { buildSchema } = require('graphql')
const schema = require('./schema/schema')
const connectDB = require('./config/db')

require('dotenv').config()
const port = process.env.PORT || 4000

// Construct a schema, using GraphQL schema language
// const schema = buildSchema(`
//   type Query {
//     hello: String
//   }
// `)

// The root provides a resolver function for each API endpoint
// const root = {
//   hello: () => {
//     return 'Hello world!'
//   },
// }

const app = express()

// Connect to database
connectDB()

app.use(cors())

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    // rootValue: root,
    // graphiql: true,
    graphiql: process.env.NODE_ENV === 'development',
  })
)

app.listen(port, console.log(`Server running on port ${port}`))
