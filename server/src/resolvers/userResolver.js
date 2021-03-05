import shortId from 'shortid'
import { authCheck } from '../utils/fbAuthCheck'

const userResolver = {
  Query: {
    async me(parent, args, { models, req }, info) {
      const currentUser = await authCheck(req)

      return models.User.findOne({ email: currentUser.email })
    },
  },
  Mutation: {
    async createUser(parent, args, { req, models }, info) {
      // check if authenticated
      const currentUser = await authCheck(req)
      // check if email exists for google login only save one instance
      const user = await models.User.findOne({ email: currentUser.email })
      if (user) return true
      await new models.User({
        email: currentUser.email,
        name: shortId.generate(),
      }).save()
      return true
    },
    async updateUser(parent, { data }, { req, models }, info) {
      const currentUser = await authCheck(req)

      const updatedUser = await models.User.findOneAndUpdate(
        { email: currentUser.email },
        { ...data },
        { new: true }
      )
      return updatedUser
    },
  },
}

export default userResolver
