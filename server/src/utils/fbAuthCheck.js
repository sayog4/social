import * as admin from 'firebase-admin'

import serviceAccount from '../firebase.json'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

export async function authCheck(req) {
  try {
    const currentUser = await admin.auth().verifyIdToken(req.headers.token)

    return currentUser
  } catch (error) {
    console.log('fbAuthCheck err----', error)
    throw new Error('Token is invalid or not provided')
  }
}
