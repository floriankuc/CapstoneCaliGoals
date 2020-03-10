import firebase from 'firebase/app'
import 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyBwuHnIYNd6kafYDipYQ460uA_vd_KZxxc',
  authDomain: 'caligoalscapstone.firebaseapp.com',
  databaseURL: 'https://caligoalscapstone.firebaseio.com',
  projectId: 'caligoalscapstone',
  storageBucket: 'caligoalscapstone.appspot.com',
  messagingSenderId: '584069505725',
  appId: '1:584069505725:web:a1ef4adf008efab8de0dd4',
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

export const exercisesRef = db.collection('EXERCISES')
export const pathsRef = db.collection('paths')
export const sessionsRef = db.collection('sessions')

export default firebase
