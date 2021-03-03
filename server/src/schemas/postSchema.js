import { gql } from 'apollo-server'

const postSchema = gql`
  type Query {
    post: String!
  }
`

export default postSchema
