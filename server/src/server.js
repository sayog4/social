import dotenv from 'dotenv'
dotenv.config()
import { ApolloServer, gql } from 'apollo-server'

import connectDB from './db/db'

// Database connection
connectDB()

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
]

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`

const resolvers = {
  Query: {
    books: () => books,
  },
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  console.log(`SERVER IS RUNNING ON --- ${url}`)
})
