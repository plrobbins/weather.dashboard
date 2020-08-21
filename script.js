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
})
})

function showWeather(enterCity) {
    $("#weatherDisplay").empty();
    $("#fiveDayForecast").empty();
    $("#dayOne").empty();
    $("#dayTwo").empty();
    $("#dayThree").empty();
    $("#dayFour").empty();
    $("#dayFive").empty();
}
