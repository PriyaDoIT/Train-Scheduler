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

  //take form inputs and store in variables
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

// Clear form inputs 
$("#name-input").val("");
$("#destination-input").val("");
$("#frequency-input").val("");
$("#first-input").val("");
});
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  var train = childSnapshot.val().train;
  var destination = childSnapshot.val().destination;
  var frequency = childSnapshot.val().frequency;
  var firstTime = childSnapshot.val().firstTime;

  // first Train pushed back to make sure it comes before current time
  var firstTimeConverted = moment(firstTime, "hh:mm a").subtract(1, "years");
  var currentTime = moment().format("HH:mm a");
  // store difference between currentTime and first train converted in a variable.
  var timeDiff = moment().diff(moment(firstTimeConverted), "minutes");
  // find Remainder of the time left and store in a variable
  var timeRemainder = timeDiff % frequency;
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
