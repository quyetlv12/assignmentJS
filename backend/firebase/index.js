import firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyCWR_9cNDnSpo59c-YCeC6BBi2IVRyEHyw",
  authDomain: "headphone-899cc.firebaseapp.com",
  projectId: "headphone-899cc",
  storageBucket: "headphone-899cc.appspot.com",
  messagingSenderId: "975118271133",
  appId: "1:975118271133:web:7fa12577c88bd498e00a74",
  measurementId: "G-3RCEQ439XG",
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
