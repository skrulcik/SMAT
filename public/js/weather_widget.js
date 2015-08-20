// Docs at http://simpleweatherjs.com
$(document).ready(function() {
  $.simpleWeather({
    zipcode: '15217',
    location: 'Pittsburgh',
    unit: 'f',
    success: function(weather) {
      if(weather.temp > 80) {
        $('.weather_color').addClass('red lighten-1');
      } else if (weather.temp > 65) {
        $('.weather_color').addClass('yellow lighten-2');
      } else if (weather.temp > 30) {
      	$('.weather_color').addClass('indigo');
      } else {
      	$('.weather_color').addClass('light-blue lighten-1');
      }
      html = '<h1 class="icon-'+weather.code+'"></h1>';
      html += '<h2>'+weather.temp+'&deg;</h2>';
      html += '<ul><li>'+weather.city+', '+weather.region+'</li>';
      html += '<li class="currently">'+weather.currently+'</li></ul>';
      //html += '<li>'+weather.tempAlt+'&deg;C</li></ul>';
      
      var timestamp = moment(weather.updated);
      html += '<p class="updated">Updated '+moment(timestamp).fromNow()+'</p>';
  
      $("#weather").html(html);
    },
    error: function(error) {
    	alert('error is ' + error);
      $("#weather").html('<p>'+error+'</p>');
    }
  });
});
