console.log("new code loaded 1");

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCnD00DCXAEUzyEJQVNwA7yI7G5OUstYHs",
  authDomain: "chat-test-56e7c.firebaseapp.com",
  databaseURL: "https://chat-test-56e7c.firebaseio.com",
  projectId: "chat-test-56e7c",
  storageBucket: "chat-test-56e7c.appspot.com",
  messagingSenderId: "1003382859041"
};
firebase.initializeApp(config);

var database = firebase.database();

//begin database js File
var loginData = database.ref("/login");
var scoreData = database.ref("/scores");

var provider_fb = new firebase.auth.FacebookAuthProvider();
// var provider_gh = new firebase.auth.GithubAuthProvider();

var displayName;
var biggestWinner;
var playerPic;
var highScore;
// var playerHighScore;
var facebook = "facebook";
var github = "github";

// // github loginObject
// var loginObj_gh = {
//   name: displayName,
//   type: github,
//   time: firebase.database.ServerValue.TIMESTAMP
//
// }; //end gh loginObject


// //start gh score object
// var scoreObj_gh = {
//   name: displayName,
//   high_score: playerScore,
//   time: firebase.database.ServerValue.TIMESTAMP
//
// }; //end gh score object

//start firebase auth sdk function
firebase.auth().getRedirectResult().then(function(result) {
    if (result.credential) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
    }
    var user = result.user;
    console.log(user.displayName);
    console.log(result);

    displayName = user.displayName;
    $("#player1").html(displayName);

    // facebook loginObject
    var loginObj_fb = {
      name: displayName,
      type: facebook,
      time: firebase.database.ServerValue.TIMESTAMP

    }; //end fb loginObject

    console.log(loginObj_fb);
    loginData.push(loginObj_fb);

    playerPic = user.photoURL;
    console.log(playerPic);

    $("#playerPic").attr("src", playerPic);


  }) //end firebase login sdk

  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    console.log("error code: " + errorCode);
    console.log("error message: " + errorMessage);

  }); //end .catch

// firebase sign out fx
firebase.auth().signOut().then(function() {}).catch(function(error) {}); //end firebase sign out fx

//log in fb
$("#fbIn").on("click", function() {
  firebase.auth().signInWithRedirect(provider_fb);
  console.log("logged in with facebook");

});

// log out fb
$("#fbOut").on("click", function() {
  firebase.auth().signOut().then(function() {
    console.log("logged out of Facebook");

    //fb score object
    var scoreObj_fb = {
      name: displayName,
      high_score: playerScore,
      time: firebase.database.ServerValue.TIMESTAMP

    }; //end fb score obj
    scoreData.push(scoreObj_fb);

  });
});

//start write high score to score box
database.ref("/scores").orderByChild("high_score").limitToLast(1).on("value", function(snapshot) {

  var arr = Object.keys(snapshot.val());
  highScore = snapshot.val()[arr[0]].high_score;
  $("#allTimeHigh").html(highScore);

  biggestWinner = snapshot.val()[arr[0]].name;
  $("#biggestWinner").html(biggestWinner);

}); //end write high score to scorebox

//order result by value to get highest score

// $("#ghIn").on("click", function() {
//   firebase.auth().signInWithRedirect(provider_gh);
//   console.log("logged in with Github");
//   loginData.push(loginObj_gh);
// });
//
// // log out gh
// $("#ghOut").on("click", function() {
//   firebase.auth().signOut().then(function() {
//     console.log("logged out of Github");
//     scoreData.push(scoreObj_gh);
//
//   });
// });