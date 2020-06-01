import Firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyCRoGDCiTicpe0cPoB5q___qYeBhZWxDsQ",
  authDomain: "kanbanrn.firebaseapp.com",
  databaseURL: "https://kanbanrn.firebaseio.com",
  projectId: "kanbanrn",
  storageBucket: "kanbanrn.appspot.com",
  messagingSenderId: "385375136747",
  appId: "1:385375136747:web:37e0d9397246a381fd87ae",
  measurementId: "G-WF6FLVXSX8",
};
let app = Firebase.initializeApp(firebaseConfig);

export const db = app.database();
