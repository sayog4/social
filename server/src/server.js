import dotenv from 'dotenv'
dotenv.config()
import { ApolloServer } from 'apollo-server'
import path from 'path'
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'
import { loadFilesSync } from '@graphql-tools/load-files'
import models from './models'

import connectDB from './db/db'

// Database connection
connectDB()

// merging typeDefs
const typeDefs = mergeTypeDefs(loadFilesSync(path.join(__dirname, './schemas')))
// merging resolvers
const resolvers = mergeResolvers(
  loadFilesSync(path.join(__dirname, './resolvers'))
)

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, models }),
})

server.listen(process.env.PORT || 8000).then(({ url }) => {
  console.log(`SERVER IS RUNNING ON --- ${url}${server.graphqlPath}`)
})
