var startDate = moment().format('M/DD/YYYY');  
var dayOne = moment().add(1, 'days').format('M/DD/YYYY');
var dayTwo = moment().add(2, 'days').format('M/DD/YYYY');
var dayThree = moment().add(3, 'days').format('M/DD/YYYY');
var dayFour = moment().add(4, 'days').format('M/DD/YYYY');
var dayFive = moment().add(5, 'days').format('M/DD/YYYY');

$(document).ready(function() {
console.log("ready!");

// On-click 
$("#basic-text1").on("click", function(event) {
  event.preventDefault();
  //saves the city entered
  var enterCity = $("#input").val(); 
  // Array for cities
  var allCities = []; 
  // Get the cities
  allCities = JSON.parse(localStorage.getItem("allCities")) || []; 
  allCities.push(enterCity); 
  // Saves city to local storage
  localStorage.setItem("allCities", JSON.stringify(allCities)); 

  showWeather(enterCity); 
}); 

function showWeather(enterCity) {

  // empties out previous data 
  $("#weatherDisplay").empty();
  $("#fiveDayForecast").empty();
  $("#dayOne").empty();
  $("#dayTwo").empty();
  $("#dayThree").empty();
  $("#dayFour").empty();
  $("#dayFive").empty();

  // QueryURL for Open Weather 
  var oneDay ="https://api.openweathermap.org/data/2.5/weather?q=" 
  + enterCity + "&units=imperial" + "&appid=af4f15c4be077c8bd3f64d0e3bc446a1";
  console.log("oneDay", oneDay);  

  //AJAX call 
  $.ajax({
      url: oneDay,
      method: "GET",
  }).then(function(response) {

    //icon url 
    var iconUrl = "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png"; 
    var lat = response.coord.lat; 
    var lon = response.coord.lon;  
  
    // Append daily details 
    $("#weatherDisplay").append(
      "<div class='col s12 m6'>"
      +  "<h2 class='daily'>" + response.name + " (" + startDate + ")" + "&nbsp" + "<img src='" + iconUrl  + "'>" + "</h2>"
      +  "<ul class='daily'>" + "Temperature: " +  response.main.temp + " °F" + "</ul>"
      +  "<ul class='daily'>" + "Humidity: " + response.main.humidity + "%" + "</ul>"
      +  "<ul class='daily'>" + "Wind Speed: " +  response.wind.speed + " MPH" + "</ul>"
      + "</div>"
      ); 

  // QueryURL for Open Weather
  var fiveDay = "https://api.openweathermap.org/data/2.5/onecall?" 
  + "lat=" + lat + "&lon=" + lon + "&units=imperial" + "&appid=af4f15c4be077c8bd3f64d0e3bc446a1";  
    console.log("fiveDay", fiveDay);

   //AJAX call 
  $.ajax({
    url: fiveDay,
    method: "GET",
    }).then(function(response) {
      
      //icon urls
      var iconUrl1 = "http://openweathermap.org/img/w/" + response.daily[0].weather[0].icon + ".png";
      var iconUrl2 = "http://openweathermap.org/img/w/" + response.daily[1].weather[0].icon + ".png";
      var iconUrl3 = "http://openweathermap.org/img/w/" + response.daily[2].weather[0].icon + ".png";
      var iconUrl4 = "http://openweathermap.org/img/w/" + response.daily[3].weather[0].icon + ".png";
      var iconUrl5 = "http://openweathermap.org/img/w/" + response.daily[4].weather[0].icon + ".png";
   
      // Adding in UV Index 
      $("#weatherDisplay").append(
        "<div class='col s12 m6'>"
       + "<button class='w3-button' id='uvIndex' class='daily'>" + "UV Index: " + response.current.uvi + "</button>"
       + "</div>"
       );  

      // UV Index colors 
      if (response.current.uvi <= 2) {
        $("#uvIndex").addClass("green");
       } else if (response.current.uvi <= 5) {
         $("#uvIndex").addClass("yellow");
       } else if (response.current.uvi <= 7) {
           $("#uvIndex").addClass("orange");
       } else if (response.current.uvi <= 10) {
           $("#uvIndex").addClass("red");
       } else if (response.current.uvi <= 40) {
           $("#uvIndex").addClass("purple");
       };

      // HEADER
      $("#fiveDayForecast").append(
        "<div class='col-md-12'>"
       + "<h2 id='fiveDayForecast'>" + "5-Day Forecast:" + "</h2>" 
      );  

       // DAY ONE DETAILS
      $("#dayOne").append(
       "<div class='fiveDayCard card col s12 m6'>"
       +  "<div class='card-body'>"
       +  "<div class='card-header'>" + dayOne +"</div>"
       +  "<div class='card-text'>" + "<img src='" + iconUrl1 + "'>" +"</div>"
       +  "<div class='card-text'>" + "Temp: " + response.daily[0].temp.day + " °F" + "</div>"
       +  "<div class='card-text'>" + "Humidity: " + response.daily[0].humidity + "%" + "</div>" 
       + "</div>" 
      );  

     
      $("#dayTwo").append(
        "<div class='fiveDayCard card col s12 m6'>"
        +  "<div class='card-body'>"
        +  "<div class='card-header'>" + dayTwo +"</div>"
        +  "<div class='card-text'>" + "<img src='" + iconUrl2 + "'>" +"</div>"
        +  "<div class='card-text'>" + "Temp: " + response.daily[1].temp.day + " °F" + "</div>"
        +  "<div class='card-text'>" + "Humidity: " + response.daily[1].humidity + "%" + "</div>" 
        + "</div>" 
      );  

      
      $("#dayThree").append(
        "<div class='fiveDayCard card col s12 m6'>"
        +  "<div class='card-body'>"
        +  "<div class='card-header'>" + dayThree +"</div>"
        +  "<div class='card-text'>" + "<img src='" + iconUrl3 + "'>" +"</div>"
        +  "<div class='card-text'>" + "Temp: " + response.daily[2].temp.day + " °F" + "</div>"
        +  "<div class='card-text'>" + "Humidity: " + response.daily[2].humidity + "%" + "</div>" 
        + "</div>" 
      );  

      
      $("#dayFour").append(
        "<div class='fiveDayCard card col s12 m6'>"
        +  "<div class='card-body'>"
        +  "<div class='card-header'>" + dayFour +"</div>"
        +  "<div class='card-text'>" + "<img src='" + iconUrl4 + "'>" +"</div>"
        +  "<div class='card-text'>" + "Temp: " + response.daily[3].temp.day + " °F" + "</div>"
        +  "<div class='card-text'>" + "Humidity: " + response.daily[3].humidity + "%" + "</div>" 
        + "</div>" 
      );  

      
      $("#dayFive").append(
        "<div class='fiveDayCard card col s12 m6'>"
        +  "<div class='card-body'>"
        +  "<div class='card-header'>" + dayFive +"</div>"
        +  "<div class='card-text'>" + "<img src='" + iconUrl5 + "'>" +"</div>"
        +  "<div class='card-text'>" + "Temp: " + response.daily[4].temp.day + " °F" + "</div>"
        +  "<div class='card-text'>" + "Humidity: " + response.daily[4].humidity + "%" + "</div>" 
        + "</div>" 
      ); 
      
      showCities(); 
      })   
    }) 
  } 

//  Function to retrieve the stored input  
function showCities() {
  // empties out previous array
  $("#cityButtons").empty();  
  // Makes all cities searched a string
  var arrayFromStorage = JSON.parse(localStorage.getItem("allCities")) || []; 
  // limits length of array
  var arrayLength = arrayFromStorage.length; 

  for (var i = 0; i < arrayLength; i++) {
    var cityNameFromArray = arrayFromStorage[i]; 

    $("#cityButtons").append (
      
      "<div class='list-group'>"
  
    // City text
    + "<button class='list-group-item'>" + cityNameFromArray 
    + "</button>")
  } 
}  

showCities (); 

// show cities on click 
$("#cityButtons").on("click", ".list-group-item", function(event) {
  event.preventDefault();
  var enterCity = ($(this).text());
  showWeather(enterCity); 
})

}); 