// Docs at http://simpleweatherjs.com
function refreshWeatherInfo() {
    $.simpleWeather({
        zipcode: '15217',
        location: 'Pittsburgh',
        unit: 'f',
        success: function(weather) {

            setWeatherColorForTemperature(weather.temp);
            
            var html = '<h1 class="icon-' + weather.code + '"></h1>';
            html += '<h2>' + weather.temp + '&deg;</h2>';
            html += '<h5>' + weather.currently + '</h5>';
            var timestamp = moment(weather.updated);
            html += '<p class="updated">Updated ' + moment(timestamp).fromNow() + '</p>';
            $('#weather').html(html);

        }, error: function(error) {
            $('#weather').html('<p><emph>Error Fetching Weather:</emph>\n' + error + '</p>');
        }
    });
}

var mappedWeatherColors = [
    'blue-grey',    // < 10
    'purple',       // 10 - 19
    'indigo',       // 20 - 29
    'blue',         // 30 - 39
    'cyan',         // 40 - 49
    'teal',         // 50 - 59
    'green',        // 60 - 69
    'yellow',       // 70 - 79
    'orange',       // 80 - 89
    'red',          // > 90
]
var allWeatherColorClasses = mappedWeatherColors.join(' ');
function setWeatherColor(color) {
    if (!$('.weather_color').hasClass('darken-2')) {
        $('.weather_color').addClass('darken-2');
    }
    $('.weather_color').removeClass(allWeatherColorClasses).addClass(color);
}
function setWeatherColorForTemperature(temp) {
    var mappedTemp = Math.floor(temp/10);
    mappedTemp = Math.min(mappedTemp, mappedWeatherColors.length - 1);
    mappedTemp = Math.max(mappedTemp, 0);
    setWeatherColor(mappedWeatherColors[mappedTemp]);

}

$(document).ready(function() {
    refreshWeatherInfo();
});

setTimeout(function() {
    refreshWeatherInfo();
}, 50000);



