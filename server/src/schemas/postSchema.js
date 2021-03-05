import { gql } from 'apollo-server'

const postSchema = gql`
  scalar Date
  type Image {
    url: String
    public_id: String
  }
  type Post {
    _id: ID!
    caption: String
    image: Image
    postedBy: User
    createdAt: Date
  }
  input ImageInput {
    url: String!
    public_id: String!
  }
  input PostCreateInput {
    caption: String!
    image: ImageInput!
  }
  input PostUpdateInput {
    id: String!
    caption: String!
    image: ImageInput!
  }
  type PostPayload {
    cursor: String
    hasNextPage: Boolean
    posts: [Post]
  }

  type Query {
    allPosts(cursor: String): PostPayload
    myPosts: [Post]
    getSinglePost(id: String!): Post
  }
  type Mutation {
    deletePost(id: String!): Post
    updatePost(data: PostUpdateInput!): Post
    createPost(data: PostCreateInput!): Post!
    uploadFile(file: String!): Image
  }
`

export default postSchema
