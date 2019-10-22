var firebaseConfig = {
  apiKey: "AIzaSyAQk3Ekt93MK15WSTNojpHPEb90bJhj-6I",
  authDomain: "example-project-trilo.firebaseapp.com",
  databaseURL: "https://example-project-trilo.firebaseio.com",
  projectId: "example-project-trilo",
  storageBucket: "example-project-trilo.appspot.com",
  messagingSenderId: "770993550040",
  appId: "1:770993550040:web:5244e77952a04f20b0ddad"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();
//console.log(moment([1994, 9, 4]).fromNow());

var trainScheduleRef = firebase.database().ref('/');
trainScheduleRef.on('value', function(snapshot) {
  addTrainToSchedule(snapshot.val());
});

function addTrainToSchedule(trainObjects){
  for(train in trainObjects){
    var currentTrain = trainObjects[train];
    var timeArr = currentTrain["First Train"].split(":");
    var trainTime = moment().hours(timeArr[0]).minutes(timeArr[1]);
    var trainMinute = trainTime.get('minute');
    trainMinute = moment(trainMinute, 'mm');
    var currMinutes = moment().minutes();
    currMinutes = moment(currMinutes, 'mm');
    console.log(trainMinute);
    console.log(currMinutes);
    var minutesAway = trainMinute.diff(currMinutes, "minutes");
    console.log(minutesAway);
    var nextTrainTime = moment().add(minutesAway, 'm').format('LT');
    console.log(nextTrainTime);
    var newRow = $("<tr>");
    var trainNameData = $("<td>" + currentTrain["Train Name"] + "</td>");
    var trainDestinationData = $("<td>" + currentTrain["Destination"] + "</td>");
    var trainFreqData = $("<td>" + currentTrain["Frequency"] + "</td>");
    
    var nextTimeForTable = $("<td>" + nextTrainTime + "</td>");
    var minutesForTable = $("<td>" + minutesAway + "</td>");

    newRow.append(trainNameData);
    newRow.append(trainDestinationData);
    newRow.append(trainFreqData);
    newRow.append(nextTimeForTable);
    newRow.append(minutesForTable);
    

    $("tbody").append(newRow);
  }
}

$("#add-user").on('click',function(event){
  event.preventDefault();

  var trainName = $("#trainName").val();
  var destination =  $("#destination").val();
  var firstTrain =  $("#firstTrain").val();
  var frequency =  $("#frequency").val();

  database.ref().push({
      "Train Name":trainName,
      "Destination":destination,
      "First Train":firstTrain,
      "Frequency":frequency,
  });

});