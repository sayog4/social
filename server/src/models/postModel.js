import mongoose from 'mongoose'

const schema = mongoose.Schema
const postSchema = schema(
  {
    caption: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: 'https://via.placeholder.com/800.png?text=POST',
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
