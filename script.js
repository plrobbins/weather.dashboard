var startDate = moment().format('M/DD/YYYY');
var dayOne = moment().add(1, 'days').format('M/DD/YYY');
var dayTwo = moment().add(1, 'days').format('M/DD/YYY');
var dayThree = moment().add(1, 'days').format('M/DD/YYY');
var dayFour = moment().add(1, 'days').format('M/DD/YYY');
var dayFive = moment().add(1, 'days').format('M/DD/YYY');

$(document).ready(function() {
    console.log("start!");

// On-click
$("basic-text1").on("click", function(event){
    event.preventDefault();
    var enterCity = $("#input").val();
    var allCities = [];

    allCities = JSON.parse(localStorage.getItem("allCities")) || [];
    allCities.push(enterCity);
    localStorage.setItem("allCities", JSON.stringify(allCities));

    showWeather(enterCity);
});
})

function showWeather(enterCity) {
    $("#weatherDisplay").empty();
    $("#fiveDayForecast").empty();
    $("#dayOne").empty();
    $("#dayTwo").empty();
    $("#dayThree").empty();
    $("#dayFour").empty();
    $("#dayFive").empty();

// QueryURL for OpenWeather
var oneDay ="https://api.openweathermap.org/data/2.5/weather?id=524901" + enterCity + "&units=imperial" + "&appid=af4f15c4be077c8bd3f64d0e3bc446a1";
console.log("oneDay", oneDay);

// Ajax call
$.ajax({
    url: oneDay,
    method: "GET",
}).then(function(response) {
    var iconUrl = "http://openweathermap.com/img/w/" + response.weather[0].icon + ".png";
    var lat = response.coord.lat;
    var long = reponse.coord.long;

    $("#weatherDisplay").append(
        "<div class='col s12 m6'>"
        + "<h2 class='daily'>" + response.name + " (" + startDate + ")" + "&nbsp" + "<img src='" + iconUrl + "'>" + "</h2>"
        + "<ul class='daily'>" + "Temperature: " + response.main.temp + " °F" + "</ul>"
        + "<ul class='daily'>" + "Humidity: " + response.main.humidity + " %" + "</ul>"
        + "<ul class='daily'>" + "Wind Speed: " + response.wind.speed + " MPH" + "</ul>"
        + "</div>"
    );

    //QueryUrl to Open Weather API
    var fiveDay = "https://api.openweathermap.org/data/2.5/onecall?"+ "lat=" + lat + "&lon=" + lon + "&units=imperial" + "&appid=af4f15c4be077c8bd3f64d0e3bc446a1";
    console.log("fiveDay", fiveDay);

    $.ajax({
        url: fiveDay,
        method: "Get",
    }).then(function(response) {
        var iconUrl1 = "http://openweathermap.org/img/w/" + response.daily[0].weather[0].icon + ".png";
        var iconUrl2 = "http://openweathermap.org/img/w/" + response.daily[1].weather[0].icon + ".png";
        var iconUrl3 = "http://openweathermap.org/img/w/" + response.daily[2].weather[0].icon + ".png";
        var iconUrl4 = "http://openweathermap.org/img/w/" + response.daily[3].weather[0].icon + ".png";
        var iconUrl5 = "http://openweathermap.org/img/w/" + response.daily[4].weather[0].icon + ".png"; 
    })
})
}