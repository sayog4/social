import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyBWv-EWKYOca6mmJaUQE5qNmF8s1JMaAOc',
  authDomain: 'social-app-ddde7.firebaseapp.com',
  projectId: 'social-app-ddde7',
  storageBucket: 'social-app-ddde7.appspot.com',
  messagingSenderId: '68866728106',
  appId: '1:68866728106:web:a6b91f5ec750d654c3f0d3',
  measurementId: 'G-F3V9KW0TPV',
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
export default firebase
