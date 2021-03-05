import { gql } from 'apollo-server'

const userSchema = gql`
  input ImageInput {
    url: String
    public_id: String
  }
  input UpdateUserInput {
    name: String
    email: String
    image: ImageInput
    bio: String
    address: String
  }
  type User {
    _id: ID
    name: String
    email: String
    image: Image
    bio: String
    address: String
    createdAt: String
    updatedAt: String
  }
  type Query {
    user: String!
    me: User!
  }

  type Mutation {
    createUser: Boolean!
    updateUser(data: UpdateUserInput!): User
  }
`

export default userSchema
