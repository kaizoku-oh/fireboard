
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize an instance of Cloud Firestore
const db = firebase.firestore();

const dht11Node = {};
const rfidNode = {};

const labels = [];

const data = {
  labels: labels,
  datasets: [{
    label: 'Temperature in °C',
    backgroundColor: [
      'rgba(105, 0, 132, .2)',
    ],
    borderColor: [
      'rgba(200, 99, 132, .7)',
    ],
    borderWidth: 2,
    data: [],
  },
  {
    label: 'Humidity in %',
    backgroundColor: [
      'rgba(0, 137, 132, .2)',
    ],
    borderColor: [
      'rgba(0, 10, 130, .7)',
    ],
    borderWidth: 2,
    data: [],
  }
  ]
};

const config = {
  type: 'line',
  data,
  options: {}
};

const myChart = new Chart(
  document.getElementById('myChart').getContext('2d'),
  config
);

function addData(chart, label, datasetIndex, data) {
  chart.data.labels.push(label);
  chart.data.datasets[datasetIndex].data.push(data);
  chart.update();
}

// Listen for changes on a certain document in a collection
db.collection("devices").doc("rfid-node")
  .onSnapshot((doc) => {
    if (!rfidNode.timestamp) {
      rfidNode.timestamp = new Date().getTime();
    }
    rfidNode.sn = doc.data().sn;
    console.log("Received rfid object: ", rfidNode);
  });

db.collection("devices").doc("dht11-node")
  .onSnapshot((doc) => {
    if (!dht11Node.timestamp) {
      dht11Node.timestamp = new Date().getTime();
    }
    dht11Node.temperature = doc.data().temperature;
    dht11Node.humidity = doc.data().humidity;
    console.log("Received dht11 object: ", dht11Node);
    addData(myChart, new Date(dht11Node.timestamp).toLocaleString(), 0, dht11Node.temperature);
    addData(myChart, new Date(dht11Node.timestamp).toLocaleString(), 1, dht11Node.humidity);
  });

// setTimeout(function () {
//   // Run this function after 3 seconds
// }, 3000);

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