<script type="text/javascript">
	function initMap(){
		var mapDiv = document.getElementById('map');
		var map = new google.maps.Map(mapDiv, {
			center: {lat: 40.4237, lng: -86.9212},
			zoom: 12});
		var marker = new google.maps.Marker({ //Line 1
			position: {lat: 40.4237, lng: -86.9212}, //Line2: Location to be highlighted
			map: map,//Line 3: Reference to map object
			title: 'Purdue University' //Line 4: Title to be given
		})
	}
</script>