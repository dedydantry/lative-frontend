import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/firestore'

// Initialize Firebase
const config = {
    apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
    authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.VUE_APP_FIREBASE_DB_URL,
    projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VUE_APP_FIREBASE_BUCKET,
    messagingSenderId: process.env.VUE_APP_FIREBASE_SENDER_ID,
    appId: process.env.VUE_APP_FIREBASE_APP_ID,
    measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID
}

firebase.initializeApp(config)
const FireStore = firebase.firestore()
const Database = firebase.database()


export {
    FireStore,
    Database
}
