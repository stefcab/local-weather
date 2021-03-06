$(document).ready(function() {
// get location from user's IP address
$.getJSON('https://ipinfo.io', function(info){
  var locString = info.loc.split(', ');
  var latitude = parseFloat(locString[0]);
  var longitude = parseFloat(locString[1]);
  $('#location').html('Location: ' + info.city + ', ' + info.region + ', ' + info.country)
  
// get weather using OpenWeatherMap API
  $.getJSON('https://cors.5apps.com/?uri=http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude +'&units=metric&APPID=c3e00c8860695fd6096fe32896042eda', function(data){
    var windSpeedkmh = Math.round(data.wind.speed * 3.6);
    var Celsius = Math.round(data.main.temp)
    var iconId = data.weather[0].icon;
    var weatherURL = "http://openweathermap.org/img/w/" +
            iconId + ".png";

    var iconImg = "<img src='" + weatherURL + "'>";
    $('#sky-image').html(iconImg);
    $('#weather-id').html('Skies: ' + data.weather[0].description);
    
    $('#temperature').html(Celsius);
    $('#toFahrenheit').click(function(){
      $('#temperature').html(Math.round((9/5) * Celsius + 32));
      $('#wind-speed').html(Math.round(windSpeedkmh * 0.621) + ' mph')
    })
    $('#toCelsius').click(function(){
      $('#temperature').html(Celsius);
      $('#wind-speed').html(windSpeedkmh + ' km/hr')
    })
    
    $('#wind-speed').html(windSpeedkmh + ' km/h');
    $('#humidity').html('Humidity: ' + data.main.humidity + ' %');
    
})
  })
})