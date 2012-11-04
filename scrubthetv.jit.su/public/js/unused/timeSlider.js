<script type="text/javascript" charset="utf-8" src="/static/js/plugins/jquery.ui.timeslider.js"></script>

function initSlider( duration ){
	$("#slider2").timeslider({
		sliderOptions: {
			range: true, 
			min: 0, 
			max: duration, 
			values: [ 0, duration ],
			step: 1
		},
		errorMessage: '#max2',
		timeDisplay: '#time2',
		submitButton: '#schedule-submit2',
		clickSubmit: function (e){
			var that = $(this).siblings('#slider2');
			$('#schedule2 tbody').append('<tr>' +
			'<td>' + that.attr('id') + '</td>' +
			'<td>' + that.timeslider('getTime', that.slider("values", 0)) + '</td>' + 
			'<td>' + that.timeslider('getTime', that.slider("values", 1)) + '</td>' + 
			'</tr>');
			e.preventDefault(); 
		}
	});

	$("#slider2").bind("slidestop", onSlideStopHandler );
	function onSlideStopHandler( e, ui ){
		var currentTime = ui.values[0]
		//Send data to server (app.js)
		//console.log( "onSlideStopHandler:", currentTime );
		socket.emit('timeupdate', { time: currentTime } );
	}	
}