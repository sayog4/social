import mongoose from 'mongoose'

const schema = mongoose.Schema
const postSchema = schema(
  {
    caption: {
      type: String,
      required: true,
    },
    image: {
      url: {
        type: String,
      },
      public_id: {
        type: String,
      },
    },
    postedBy: {
      type: schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
)

const Post = mongoose.model('Post', postSchema)

export default Post
