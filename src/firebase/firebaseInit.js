import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCLm9T3_05nNxRab3cTmPqVBnd9Qgu0V5Y",
    authDomain: "kinocms-bc0b5.firebaseapp.com",
    projectId: "kinocms-bc0b5",
    storageBucket: "kinocms-bc0b5.appspot.com",
    messagingSenderId: "187769372756",
    appId: "1:187769372756:web:df9d4d4d7b3b3dbf4fedc1",
    measurementId: "G-XVKLDR8Z0C",
  };

const firebaseApp = firebase.initializeApp(firebaseConfig)
const database = firebaseApp.firestore()
const storage = firebase.storage()
export const storageRef = storage.ref().child('Banners&Sliders/TopSlider/city.jpg')
export const topSliderRef = storageRef.getDownloadURL()


export default database
