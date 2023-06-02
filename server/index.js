const express = require('express')
require('colors')
const path = require('path')
const cors = require('cors')
const { graphqlHTTP } = require('express-graphql')
// const { buildSchema } = require('graphql')
const schema = require('./schema/schema')
const connectDB = require('./config/db')

require('dotenv').config()
const port = process.env.PORT || 4000

// const PORT  = parseInt((process.env.PORT || '4000') , 10)
// const PORT: number = parseInt((process.env.PORT || '4000') as string, 10)

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

// add middlewares
// app.use(express.static(path.join(__dirname, '..', 'build')))
// app.use(express.static('public'))
// app.use(express.static(path.join(__dirname, '../client/build/static')))

app.use(express.static(path.join(__dirname, '../client', 'build')))
app.get('*', (req, res) =>
  // res.sendFile(path.join(__dirname, '../../client/build/index.html'))
  res.sendFile(path.join(__dirname, '../client', 'build', 'index.html'))
)

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message })
  next()
})

app.listen(port, console.log(`Server running on port ${port}`))
