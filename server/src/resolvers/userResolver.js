import shortId from 'shortid'
import { authCheck } from '../utils/fbAuthCheck'

const userResolver = {
  Query: {
    user() {
      return 'hello'
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
  },
}

export default userResolver
