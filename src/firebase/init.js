import firebase from 'firebase'
import firestore from 'firebase/firestore'

var config = {
  apiKey: "OH YOU NEED YOUR SECRET KEY",
  authDomain: "geo-project-vue.firebaseapp.com",
  databaseURL: "https://geo-project-vue.firebaseio.com",
  projectId: "geo-project-vue",
  storageBucket: "geo-project-vue.appspot.com",
  messagingSenderId: "NEED YOUR SECRET KEY"
};
const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings({ timestampsInSnapshots: true })

export default firebaseApp.firestore()
