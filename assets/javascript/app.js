// This makes the carousel move.
$(document).ready(function () {
  $('#carouselExampleIndicators').carousel({
    interval: 1200
  });
});

// ------- my giphy api key Y4xlv8FyBnZbqm0KrrYBv04TFs0MkfZ2 -------
//================================================================================================================================================
// A short list of history topics displayed at the bottom with your current history
var topics = ["ninja fail", "date fail", "pet fail", "old people fail", "haircut fail"];
// function to render buttons onto the page
function renderButtons() {
  console.log("renderButtons has fired");
  // Deleting the buttons prior to adding new buttons
  $("#btn-attachment-div").empty();
  // Looping through the topics array
  for (var i = 0; i < topics.length; i++) {
    // dynamicaly generated buttons for each topic
    // REMEMBER THIS SYNTAX FOR CREATING CONTENT LATER
    var btn = $("<button>");
    // Adding a data-name attribute with a value of topics at each index i
    // Adding a class atribute of btn btn-color margin-control to match existing bootstrap buttons
    btn.attr("data-name", topics[i]);
    btn.attr("class", "btn btn-color margin-control dynamic");
    // Providing the button's text with a value of the topic at each index i
    btn.text(topics[i]);
    // appending the button to a div at the bottom of the page for easy visibility
    $("#btn-attachment-div").append(btn);
  }
};
//Tried this instead of renderButtons
function renderNewButtonsOnly(){
  // clearIt();
  var addBtn = $("<button>");
  // addBtn.attr("data-name", this.topics);
  addBtn.attr("data-name", topics[topics.length-1]);
  addBtn.attr("class", "btn btn-color margin-control dynamic");
  addBtn.text(topics[topics.length-1]);
  $("#btn-attachment-div").append(addBtn);
  console.log(typeof addBtn);
};
// Calling the renderButtons function for initial topics
renderButtons();
var clickBait;
//=====================THIS ON-CLICK EVENT WORKS PROPERLY  UNTIL THE NEXT SEARCH BUTTON IS CLICKED THE FIRST TIME=========================
$(document).on("click", ".dynamic", function (){
//$(".dynamic").on("click", function () {
  clearIt();
  // Grabbing and storing the data property value from the button
  clickBait = $(this).attr("data-name");
  var attach = $("<div>");
  // Constructing a queryURL using the fail name
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    clickBait + "&api_key=dc6zaTOxFJmzC&limit=20";
  // Performing an AJAX request with the queryURL
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // After data comes back from the request
    .then(function (response) {
      // storing the data from the AJAX request in the results variable
      var results = response.data;
      // Looping through each result item
      //My Sorting Loop that assigns rows every fourth element
      for (i = 0; i < results.length; i++) {
        if (i % 4 !== 0) {
          var newDiv = $("<div>");
          // Creating a paragraph tag with the result item's rating
          var p = $("<p>").text("Rating: " + results[i].rating);
          // Creating and storing an image tag
          var failImage = $("<img>");
          // Setting the src attribute of the image to a property pulled off the result item
          // assigning attributes
          failImage.attr("src", results[i].images.fixed_height.url);
          failImage.attr("alt", "fail image");
          failImage.attr("class", "grid-assn");
          newDiv.attr("class", "col-md-3")
          // append the image and rating to newDiv (dynamically created)
          newDiv.append(failImage);
          newDiv.append(p);
          $("#row1").prepend(newDiv);
          // This is where the logic for the for loop comes into play. Every 4rth image starting at image#5
          // gets assigned to a brand new dynamically created row
        } else {
          var newRow = $('<div>');
          newRow.attr("class", "row");
          console.log("1");
          console.log(results[i]);
          // Creating and storing a div tag
          var newDiv = $("<div>");
          // Creating a paragraph tag with the result item's rating
          var p = $("<p>").text("Rating: " + results[i].rating);
          // Creating and storing an image tag
          var failImage = $("<img>");
          // Setting the src attribute of the image to a property pulled off the result item
          failImage.attr("src", results[i].images.fixed_height.url);
          failImage.attr("alt", "fail image");
          failImage.attr("class", "grid-assn");
          newDiv.attr("class", "col-md-3")
          //append everything
          newDiv.append(failImage);
          newDiv.append(p);
          // prepending
          $("#row1").prepend(newDiv);
        }
      }
    });
});
//=====================================================THESE TWO FUNCTIONS APPEAR TO BE WORKING PROPERLY================================================================================================
var topic;
function iBelieveInYou()  {
// This function handles events where the search button is clicked
// $("#search-for-image").on("click", function (event) {
  // event.preventDefault();
  // grab user text from the input box and concatenate the word 'fail'
  topic = $("#searching").val().trim() + " fail";
  // The topic from the textbox is then added to topics array
  topics.push(topic);
  // calling renderButtons which creates buttons dynamically
  renderNewButtonsOnly();
//});
};
function clearIt(){
  $("#row1").empty();
  $("#row2").empty();
  $("#row3").empty();
  $("#row4").empty();
  $("#row5").empty();
  }
  //====SOMEWHERE IN HERE IS WHERE THE PROBLEM IS. ONCE THIS BUTTON IS CLICKED FOR THE FIRST TIME, THE BUTTONS AT THE BOTTOM OF THE PAGE CEASE TO WORK===========================================================================
//on-click of the search button, a function will be called and gifs related to that search will be rendered
$("#search-for-image").on("click", function () {
  // clearing out the rows of images to be replaced by gifs on the grid
  clearIt();
  //calling function I believe in you
  iBelieveInYou();
  // create a variable called attach for making a div and a variable called searching
  // to capture the value inside the text box
  var attach = $("<div>");
  var searching = document.getElementById("searching").value;       // need to remember this later. this is how you capture value placed in an input box for later manipulation

  // takes input and adds the word 'fail' to it when searching for gifs that match keyword
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    searching + " fail " + "&api_key=dc6zaTOxFJmzC&limit=20";
  // Perfoming an AJAX GET request to our queryURL
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // After the data from the AJAX request comes back
    .then(function (response) {
      //best to keep this in for later
      console.log(response);
      // storing the data from the AJAX request in the results variable
      var results = response.data;
      //a for loop could be used to print multiple objects/gifs
      // this 
      for (i = 0; i < results.length; i++) {
        if (i % 4 !== 0) {
          var newDiv = $("<div>");
          // Creating a paragraph tag with the result item's rating
          var p = $("<p>").text("Rating: " + results[i].rating);
          // Creating and storing an image tag
          var failImage = $("<img>");
          // Setting the src attribute of the image to a property pulled off the result item
          // assigning attributes
          failImage.attr("src", results[i].images.fixed_height.url);
          failImage.attr("alt", "fail image");
          failImage.attr("class", "grid-assn");
          newDiv.attr("class", "col-md-3")
          // append the image and rating to newDiv (dynamically created)
          newDiv.append(failImage);
          newDiv.append(p);
          $("#row1").prepend(newDiv);
          // This is where the logic for the for loop comes into play. Every 4rth image starting at image#5
          // gets assigned to a brand new dynamically created row
        } else {
          var newRow = $('<div>');
          newRow.attr("class", "row");
          console.log("1");
          console.log(results[i]);
          // Creating and storing a div tag
          var newDiv = $("<div>");
          // Creating a paragraph tag with the result item's rating
          var p = $("<p>").text("Rating: " + results[i].rating);
          // Creating and storing an image tag
          var failImage = $("<img>");
          // Setting the src attribute of the image to a property pulled off the result item
          failImage.attr("src", results[i].images.fixed_height.url);
          failImage.attr("alt", "fail image");
          failImage.attr("class", "grid-assn");
          newDiv.attr("class", "col-md-3");
          //append everything
          newDiv.append(failImage);
          newDiv.append(p);
          //attach the div to the page here
          $("#row1").prepend(newDiv);
        }
      }
      // renderButtons();
    });
});
function refresh(){
  location.reload();
};