import cloudinary from 'cloudinary'
import { authCheck } from '../utils/fbAuthCheck'

cloudinary.v2.config({
  cloud_name: process.env.C_NAME,
  api_key: process.env.C_KEY,
  api_secret: process.env.C_SECRET,
})
const uploadFile = (file) => {
  return cloudinary.v2.uploader.upload(file, (error, result) => {
    if (error) {
      console.log(error)
      throw new Error(error.message)
    }

    return result
  })
}

const postResolver = {
  Query: {
    async allPosts(parent, { cursor }, { models }, info) {
      const limit = 10
      let hasNextPage = false
      let query = {}
      if (cursor) {
        query = { _id: { $lt: cursor } }
      }
      let posts = await models.Post.find(query)
        .sort({ _id: -1 })
        .limit(limit + 1)
        .populate('postedBy', 'name image')

      if (posts.length > limit) {
        hasNextPage = true
        posts = posts.slice(0, -1)
      }
      const newcursor = posts[posts.length - 1]._id

      return {
        posts,
        cursor: newcursor,
        hasNextPage,
      }
    },
    async myPosts(parent, args, { models, req }, info) {
      const currentUser = await authCheck(req)
      const { _id } = await models.User.findOne({ email: currentUser.email })
      const res = await models.Post.find({ postedBy: _id }).populate(
        'postedBy',
        'name image'
      )

      return res
    },
    async getSinglePost(parent, { id }, { models }, info) {
      return await models.Post.findById(id).populate('postedBy', 'name image')
    },
  },
  Mutation: {
    async uploadFile(parent, { file }, { req, models }, info) {
      await authCheck(req)

      const result = await uploadFile(file)

      return {
        url: result.secure_url,
        public_id: result.public_id,
      }
    },
    async createPost(parent, { data }, { req, models }, info) {
      const currentUser = await authCheck(req)
      if (data.caption.trim() === '') throw new Error('Caption is must')
      const { _id } = await models.User.findOne({
        email: currentUser.email,
      })
      const newPost = await new models.Post({
        postedBy: _id,
        ...data,
      })
      return await newPost.save().then((res) => {
        return res.populate('postedBy', 'name image')
      })
    },
    async updatePost(parent, { data }, { req, models }, info) {
      const currentUser = await authCheck(req)

      // chack if current post is posted by current user
      const { _id } = await models.User.findOne({ email: currentUser.email })
      const { postedBy } = await models.Post.findById(data.id)
      if (_id.toString() !== postedBy.toString())
        throw new Error('You are not authorized to Update This Post')

      return await models.Post.findByIdAndUpdate(
        data.id,
        { caption: data.caption, image: data.image },
        { new: true }
      ).populate('postedBy', 'name image')
    },
    async deletePost(parent, { id }, { req, models }, info) {
      const currentUser = await authCheck(req)
      const { _id } = await models.User.findOne({ email: currentUser.email })
      const { postedBy } = await models.Post.findById(id)
      if (_id.toString() !== postedBy.toString())
        throw new Error('You are not Authorized to delete this post')

      return await models.Post.findByIdAndRemove(id)
    },
  },
}

export default postResolver
