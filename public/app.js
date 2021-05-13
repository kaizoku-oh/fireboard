
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize an instance of Cloud Firestore
var db = firebase.firestore();

// Listen for changes on a certain document
db.collection("devices").doc("rfid-node")
    .onSnapshot((doc) => {
        console.log("Current serial-number: ", doc.data().sn);
    });

// Add example
// db.collection("users").add({
//   first: "Ada",
//   last: "Lovelace",
//   born: 1815
// })
// .then((docRef) => {
//   console.log("Document written with ID: ", docRef.id);
// })
// .catch((error) => {
//   console.error("Error adding document: ", error);
// });

// Get example
// db.collection("users").get().then((querySnapshot) => {
//   querySnapshot.forEach((doc) => {
//       console.log(`${doc.id} => ${doc.data()}`);
//   });
// });