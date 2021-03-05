import { gql } from '@apollo/client'

export const ALL_POSTS = gql`
  query ALL_POSTS($cursor: String) {
    allPosts(cursor: $cursor) {
      cursor
      hasNextPage
      posts {
        _id
        createdAt
        caption
        image {
          url
          public_id
        }
        postedBy {
          name
          image {
            url
          }
        }
      }
    }
  }
`
export const ME = gql`
  query ME {
    me {
      _id
      name
      email
      image {
        url
        public_id
      }
      bio
      address
    }
  }
`

export const MY_POSTS = gql`
  query MY_POSTS {
    myPosts {
      _id
      caption
      createdAt
      image {
        url
        public_id
      }
      postedBy {
        name
        image {
          url
        }
      }
    }
  }
`
export const GET_SINGLE_POST = gql`
  query GET_SINGLE_POST($id: String!) {
    getSinglePost(id: $id) {
      _id
      caption
      createdAt
      image {
        url
        public_id
      }
      postedBy {
        name
        image {
          url
        }
      }
    }
  }
`
