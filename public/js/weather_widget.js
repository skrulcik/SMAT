// Docs at http://simpleweatherjs.com

function refreshWeatherInfo() {
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
            var html = '<h1 class="icon-' + weather.code + '"></h1>';
            html += '<h2>' + weather.temp + '&deg;</h2>';
            html += '<h5>' + weather.currently + '</h5>';

            // Show time of last update
            var timestamp = moment(weather.updated);
            html += '<p class="updated">Updated ' + moment(timestamp).fromNow() + '</p>';

            $('#weather').html(html);
        }, error: function(error) {
            $('#weather').html('<p><emph>Error Fetching Weather:</emph>\n' + error + '</p>');
        }
    });
}

$(document).ready(function() {
    refreshWeatherInfo();
});

setTimeout(function() {
    refreshWeatherInfo();
}, 50000);



