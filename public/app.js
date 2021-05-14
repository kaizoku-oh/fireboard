
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize an instance of Cloud Firestore
const db = firebase.firestore();

const dht11Node = {};
const rfidNode = {};

// Listen for changes on a certain document in a collection
db.collection("devices").doc("rfid-node")
    .onSnapshot((doc) => {
        rfidNode.ts = new Date().getTime();
        rfidNode.sn = doc.data().sn;
        console.log("Current rfid serial-number: ", rfidNode);
    });

db.collection("devices").doc("dht11-node")
    .onSnapshot((doc) => {
        dht11Node.ts = new Date().getTime();
        dht11Node.temperature = doc.data().temperature;
        dht11Node.humidity = doc.data().humidity;
        console.log("Current temperature-humidity: ", dht11Node);
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