import { gql } from 'apollo-server'

const userSchema = gql`
  type User {
    _id: ID
    name: String
    email: String
    image: String
    bio: String
    address: String
    createdAt: String
    updatedAt: String
  }
  type Query {
    user: String!
  }
  type Mutation {
    createUser: Boolean!
  }
`

export default userSchema
