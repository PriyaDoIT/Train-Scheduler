// Initialize Firebase
var config = {
  apiKey: "AIzaSyDcr61AkP3KAvHYq4RVON_5NzxjSLy6qAI",
  authDomain: "train-d9d92.firebaseapp.com",
  databaseURL: "https://train-d9d92.firebaseio.com",
  projectId: "train-d9d92",
  storageBucket: "train-d9d92.appspot.com",
  messagingSenderId: "964125274737"
};
firebase.initializeApp(config);

var database = firebase.database();

$(".add-train-btn").on("click", function(event) {
  event.preventDefault();

  var train = $("#name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var frequency = $("#frequency-input").val().trim();
  var firstTime = moment($("#first-input").val().trim(), "HH:mm").format("HH:mm");

  var newTrain = {
    train: train,
    destination: destination,
    frequency: frequency,
    firstTime: firstTime
  };

  database.ref().push(newTrain);

  console.log(newTrain.train);
  console.log(newTrain.destination);
  console.log(newTrain.frequency);
  console.log(newTrain.firstTime);

$("#name-input").val("");
$("#destination-input").val("");
$("#frequency-input").val("");
$("#first-input").val("");
});
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  console.log(childSnapshot.val());

  var train = childSnapshot.val().train;
  var destination = childSnapshot.val().destination;
  var frequency = childSnapshot.val().frequency;
  var firstTime = childSnapshot.val().firstTime;

  // Train Info
  console.log(train);
  console.log(destination);
  console.log(frequency);
  console.log(firstTime);

  // first Train pushed back to make sure it comes before current time
  var firstTimeConverted = moment(firstTime, "hh:mm a").subtract(1, "years");
  console.log(firstTimeConverted);
  var currentTime = moment().format("HH:mm a");
  console.log("CURRENT TIME: " + currentTime);
  // store difference between currentTime and first train converted in a variable.
  var timeDiff = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("Difference in Time: " + timeDiff);
  // find Remainder of the time left and store in a variable
  var timeRemainder = timeDiff % frequency;
  console.log("Time Remainder: " +timeRemainder);
  // to calculate minutes till train,we store it in a variable
  var minToTrain = frequency - timeRemainder;
  // next train
  var nxTrain = moment().add(minToTrain, "minutes").format("hh:mm A");
  

  // Add each train's data into the table
  $(".tablerow").append(
    "<tr><td>" + train + "</td>" +
    "<td>" + destination + "</td>" +
    "<td>" + frequency + "</td>" +
    "<td>" + nxTrain + "</td>" +
    "<td>" + minToTrain + "</td></tr>" 
  )
});
