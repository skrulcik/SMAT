function updateCalendarData() {
	var today = moment();
    $('#displayday').html('<h3>' + today.format('dddd') + ', '
                                + today.format('MMM') + ' '
                                + today.date() + '</h3>');
}

// Your Client ID can be retrieved from your project in the Google
// Developer Console, https://console.developers.google.com
var CLIENT_ID = '<RAW_CLIENT_ID>';

var SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

/**
* Check if current user has authorized this application.
*/
function checkAuth() {
    console.log('Checking authorization status for Google Calendar...');
	gapi.auth.authorize(
	{
		'client_id': CLIENT_ID,
		'scope': SCOPES,
		'immediate': true
	}, handleAuthResult);
}

/**
* Handle response from authorization server.
*
* @param {Object} authResult Authorization result.
*/
function handleAuthResult(authResult) {
	var authorizeDiv = document.getElementById('authorize-div');
	if (authResult && !authResult.error) {
        console.log('Handling Google Authentication result: Success');
		// Hide auth UI, then load client library.
		authorizeDiv.style.display = 'none';
		loadCalendarApi();
	} else {
        console.log('Handling Google Authentication result: Failure');
        console.log(authResult.error);
		// Show auth UI, allowing the user to initiate authorization by
		// clicking authorize button.
		authorizeDiv.style.display = 'inline';
	}
}

/**
* Initiate auth flow in response to user clicking authorize button.
*
* @param {Event} event Button click event.
*/
function handleAuthClick(event) {
	gapi.auth.authorize(
	{client_id: CLIENT_ID, scope: SCOPES, immediate: false},
	handleAuthResult);
	return false;
}

/**
* Load Google Calendar client library. List upcoming events
* once client library is loaded.
*/
function loadCalendarApi() {
	gapi.client.load('calendar', 'v3', listUpcomingEvents);
}

/**
* Print the summary and start datetime/date of the next ten events in
* the authorized user's calendar. If no events are found an
* appropriate message is printed.
*/
function listUpcomingEvents() {
    if (gapi.client.calendar) {
    	var request = gapi.client.calendar.events.list({
        	'calendarId': 'primary',
        	'timeMin': (new Date()).toISOString(),
        	'showDeleted': false,
        	'singleEvents': true,
        	'maxResults': 10,
        	'orderBy': 'startTime'
         });
        
         request.execute(function(resp) {
              clearCalendarList();
          	var events = resp.items;
          	if (events.length > 0) {
          		appendCalendarList(htmlForCalendarEventList(events));
          	} else {
          		appendCalendarList('No upcoming events found.');
          	}
         });
    } else {
        console.log('Calendar API not loaded when requesting event list');
    }
}

/**
* Add html to calendar list
*
* @param {string} message Text to be placed in pre element.
*/
function appendCalendarList(newContent) {
    var currentHTML = $('#calendar_output').html();
    $('#calendar_output').html(currentHTML + newContent);
}

/**
* Remove current content from calendar section
*/
function clearCalendarList() {
    $('#calendar_output').html("");
}


/**
* Render event cells, and combine them together to make a list of
* calendar event views from calendar event objects.
*/
function htmlForCalendarEventList(events) {
    html = '<ul class="collection">';
    for (i = 0; i < events.length; i++) {
        html += htmlForCalendarEvent(events[i]);
    }
    html += '</ul>';
    return html;
}


/**
* Render a decent looking Event Box for Google Calendar event
* Assumes Materialize.css is loaded
*/
function htmlForCalendarEvent(event) {
    var startTime = event.start.dateTime;
    if (!startTime) {
        startTime = event.start.date;
    }
    var startTimeString = moment(startTime).fromNow();
    return '<li class="collection-item"><h5>' + event.summary
                + '</h5><p>' + startTimeString + '</p></li>';
}

$(document).ready(function() {
	$('#displayday').addClass('white')
		.addClass('weather_color')
    updateCalendarData();
});

setTimeout(function() {
    updateCalendarData();
    listUpcomingEvents();
}, 50000);


