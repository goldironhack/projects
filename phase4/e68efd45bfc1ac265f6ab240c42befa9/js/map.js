mapboxgl.accessToken = 'pk.eyJ1IjoiamVzdXNmY2hhdmFycm8iLCJhIjoiY2owd3JhNTg5MDAyMDMzc2Q5djhheHhleiJ9.gbHmrqcN3ktZBZYQmGNVIg';

var isDragging;
var isCursorOverPoint;

var center = [-87.6505, 41.8708];
var dataSets = {};
var profile = "walking";

function HelloWorldControl() {}
HelloWorldControl.prototype.onAdd = function(map) {
   this._map = map;
   var button = $("<div class=\"mapboxgl-ctrl mapboxgl-ctrl-group\">" +
      "<button class=\"mapboxgl-ctrl-icon mapboxgl-ctrl-layer\" type=\"button\">" +
      "<span class=\"flaticon-layers fa-1x \"></span>" +
      "</div>");
   var layerMenu = $("<div id=\"layer-menu\" class=\"mapboxgl-ctrl mapboxgl-ctrl-group\">" +
      "<input name=\"layer\" id=\"basic\" type=\"radio\" value=\"basic\">" +
      "<label for=\"basic\">basic</label><br>" +
      "<input name=\"layer\" id=\"streets\" type=\"radio\" value=\"streets\"  checked=\"checked\">" +
      "<label for=\"streets\">streets</label><br>" +
      "<input name=\"layer\" id=\"bright\" type=\"radio\" value=\"bright\">" +
      "<label for=\"bright\">bright</label><br>" +
      "<input name=\"layer\" id=\"light\" type=\"radio\" value=\"light\">" +
      "<label for=\"light\">light</label><br>" +
      "<input name=\"layer\" id=\"dark\" type=\"radio\" value=\"dark\">" +
      "<label for=\"dark\">dark</label><br>" +
      "<input name=\"layer\" id=\"satellite\" type=\"radio\" value=\"satellite\">" +
      "<label for=\"satellite\">satellite</label>" +
      "</div>");

   var a = button.children()
      .click(function() {
         layerMenu.animate({
            opacity: "toggle",
            height: "toggle"
         }, 1000);
      });
   layerMenu.children("input")
      .click(function() {
         map.setStyle('mapbox://styles/mapbox/' + this.id + '-v9');
      });


   button.children()
      .click();
   this._container = button[0];
   this._container.appendChild(layerMenu[0])
   return this._container;
};

HelloWorldControl.prototype.onRemove = function() {
   this._container.parentNode.removeChild(this._container);
   this._map = undefined;
};



var drag = {
   "type": "FeatureCollection",
   "features": [{
      "type": "Feature",
      "geometry": {
         "type": "Point",
         "coordinates": [center[0] + 0.01, center[1]]
      },
      "properties":{
        "id":0
      }
   },{
      "type": "Feature",
      "geometry": {
         "type": "Point",
         "coordinates": [center[0] - 0.01, center[1]]
      },
      "properties":{
        "id":1
      }
   }]
};


function mouseDown() {
   if (!isCursorOverPoint) return;

   isDragging = true;

   // Set a cursor indicator
   canvas.style.cursor = 'grab';

   // Mouse events
   map.on('mousemove', onMove);
   map.once('mouseup', onUp);
}

function onMove(e) {
   if (!isDragging) return;
   var coords = e.lngLat;

   canvas.style.cursor = 'grabbing';
   search[window.___point].setLngLat(coords)
   drag.features[window.___point].geometry.coordinates = [coords.lng, coords.lat];
   map.getSource('point')
      .setData(drag);
}

function onUp(e) {
   if (!isDragging) return;
   var coords = e.lngLat;

   // Print the coordinates of where the point had
   // finished being dragged to on the map.
   canvas.style.cursor = '';
   isDragging = false;

   // Unbind mouse events
   map.off('mousemove', onMove);
}



var map = new mapboxgl.Map({
   container: 'map',
   style: 'mapbox://styles/mapbox/streets-v9',
   zoom: 12,
   center: center
});

var canvas = map.getCanvasContainer();
map.addControl(new mapboxgl.NavigationControl());
map.addControl(new HelloWorldControl());

var popup = new mapboxgl.Popup({
      offset: 25
   })
   .setText('Department of Computer Science – University of Illinois, Chicago');

var flag = document.createElement('div');
flag.id = "UIC-flag"

new mapboxgl.Marker(flag, {
      offset: [-25, -25]
   })
   .setLngLat(center)
   .setPopup(popup) // sets a popup on this marker
   .addTo(map);

var google = document.createElement('div');
google.className = "search-marker"
var search = [];
for (var i = 0; i < drag.features.length; i++) {
  search.push(
    new mapboxgl.Marker(google.cloneNode(false), {
       offset: [-18, -18]
    })
    .setLngLat(drag.features[i].geometry.coordinates) // sets a popup on this marker
    .addTo(map)
  )

}

map.on('load', function() {

   // Add a single point to the map
   map.addSource('point', {
      "type": "geojson",
      "data": drag
   });

   map.addLayer({
      "id": "point",
      "type": "circle",
      "source": "point",
      "paint": {
         "circle-radius": 100,
         "circle-color": "#ccc",
         "circle-opacity": 0.4
      }
   });

   // When the cursor enters a feature in the point layer, prepare for dragging.
   map.on('mouseenter', 'point', function(e) {
      map.setPaintProperty('point', 'circle-color', '#3bb2d0');
      canvas.style.cursor = 'move';
      window.___point = e.features[0].properties.id;
      isCursorOverPoint = true;
      map.dragPan.disable();
   });

   map.on('mouseleave', 'point', function() {
      map.setPaintProperty('point', 'circle-color', '#3887be');
      canvas.style.cursor = '';
      isCursorOverPoint = false;
      map.dragPan.enable();
   });

   map.on('mousedown', mouseDown);
});
