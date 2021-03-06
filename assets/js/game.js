//api links
var easyURL = "https://opentdb.com/api.php?amount=1&difficulty=easy&type=multiple";

var mediumURL = "https://opentdb.com/api.php?amount=1&difficulty=medium&type=multiple";

var hardURL = "https://opentdb.com/api.php?amount=1&difficulty=hard&type=multiple";

// performing our GET request
$.ajax({
    url: easyURL,
    method: "GET"
  })

  .done(function(response) {

    //storing the array of results in the variable
    var results = response.results;

    for (var i = 0; i < results.length; i++) {
      // console.log(results[i].question);
      var easy = $("button");
      easy.attr("data-question", results[i].question);

    }
  }); //end of .done fx

$.ajax({
    url: mediumURL,
    method: "GET"
  })

  .done(function(response) {

    //storing the array of results in the variable
    var results = response.results;

    for (var i = 0; i < results.length; i++) {
      var medium = $("button");
      medium.attr("data-question", results[i].question);

    }
  }); //end .done mediumURL

$.ajax({
    url: hardURL,
    method: "GET"
  })

  .done(function(response) {
    // console.log(response);

    //storing the array of results in the variable
    var results = response.results;

    for (var i = 0; i < results.length; i++) {
      var hard = $("button");
      hard.attr("data-question", results[i].question);

    }
  }); //end of .done hard fx
