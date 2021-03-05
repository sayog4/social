import mongoose from 'mongoose'

const schema = mongoose.Schema

const userSchema = schema(
  {
    name: {
      type: String,
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    image: {
      url: {
        type: String,
      },
      public_id: {
        type: String,
      },
    },
    bio: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)

export default User
