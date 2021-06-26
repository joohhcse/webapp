import firebase from 'firebase';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

let database;
let config = {
    
};

if (!firebase.apps.length) {
  console.log('Initialize...!!!')
  firebase.initializeApp(config);
}

database = firebase.database()

// export const fire = () => {

//   if (!firebase.apps.length) {
//     firebase.initializeApp(config);
//   }

//   database = firebase.database()
// }

// export const getFireDB = () => {
//   return database.ref('table').once('value')
// }

// export const dbRef = firebase.database().ref();
// dbRef.child("users").child(userId).get().then((snapshot) => {
//   if (snapshot.exists()) {
//     console.log(snapshot.val());
//   } else {
//     console.log("No data available");
//   }
// }).catch((error) => {
//   console.error(error);
// });

export default firebase;