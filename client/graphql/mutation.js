import { gql } from '@apollo/client'

export const CREATE_USER = gql`
  mutation CREATE_USER {
    createUser
  }
`
export const UPLOAD_FILE = gql`
  mutation UPLAD_FILE($file: String!) {
    uploadFile(file: $file) {
      url
      public_id
    }
  }
`

export const CREATE_POST = gql`
  mutation CREATE_POST($data: PostCreateInput!) {
    createPost(data: $data) {
      caption
      image {
        url
        public_id
      }
      postedBy {
        name
      }
    }
  }
`

export const UPDATE_USER = gql`
  mutation UPDATE_USER($data: UpdateUserInput!) {
    updateUser(data: $data) {
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
export const UPDATE_POST = gql`
  mutation UPDATE_POST($data: PostUpdateInput!) {
    updatePost(data: $data) {
      caption
      image {
        url
        public_id
      }
      postedBy {
        name
      }
    }
  }
`

export const DELETE_POST = gql`
  mutation DELETE_POST($id: String!) {
    deletePost(id: $id) {
      caption
      image {
        url
        public_id
      }
      postedBy {
        name
      }
    }
  }
`
