
function initMap(){
  var mapDiv = document.getElementById('map');
  map = new google.maps.Map(mapDiv, {
    center: {lat: 41.8708, lng: -87.6505},
    zoom: 14});

  var marker = new google.maps.Marker({
    position: {lat: 41.8708, lng: -87.6505},
    map: map,
    title: 'illinois University',
    icon: 'img/u_ico.png'
  });
  
  
  
  //loadingRentalHouses();
}
/*function loadingRentalHouses() {
	var xmlhttp = new XMLHttpRequest();
	var url = "https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json?accessType=DOWNLOAD";
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
	var myArr;
	var text;
	var json;
	var numberOfPA;
	xmlhttp.onreadystatechange = function() {
	    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	        myArr = xmlhttp.responseText;
	        text = myArr;
	        json = JSON.parse(text);
	        numberOfPA = json.data.length;
	        for(var i=0; i<numberOfPA; i++){
	        	var latLng = "";
            var namePlayArt ="";
	        	latLng = JSON.parse('{ "lat":'+ json.data[i][19] +', "lng":'+ json.data[i][20] +' }');
            namePlayArt = json.data[i][11];
	        	var n = new google.maps.Marker({
						    	position: latLng,
						   		map: map,
						  		title: namePlayArt,
						  		icon: 'img/house_ico.png'
						  	});
	        }
		}
	}	
}*/
function search(){
	initMap();
	var LatU=41.8708;
	var LonU=-87.6505
	var MaxDistInx=document.getElementById("SelcNear").selectedIndex;
	var MaxDist = parseInt(document.getElementById("SelcNear").options[MaxDistInx].value);
	
	//document.getElementById("demo").innerHTML = x;
	var xmlhttp = new XMLHttpRequest(); 
	var url = "https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json?accessType=DOWNLOAD";
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
	var myArr;
	var text;
	var json;
	var numberOfPA;
	 var markers = [];
	 var windows = [];
	xmlhttp.onreadystatechange = function() {
	    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	        myArr = xmlhttp.responseText;
	        text = myArr;
	        json = JSON.parse(text);
	        numberOfPA = json.data.length;
	        var prev_infowindow =false;
	       
	        for(var i=0; i<numberOfPA; i++){
	        	var latLng = "";
            	var namePlayArt ="";
            	if (MaxDist!=0){
	            	var x=((parseFloat(json.data[i][19])-LatU)*10000)/90;
	            	var y=((parseFloat(json.data[i][20])-LonU)*40000)/360;
	            	var dist=  (Math.sqrt((Math.pow(x, 2)+Math.pow(y, 2))))
	            	//document.getElementById("demo").innerHTML = dist;
		        	if(dist<=MaxDist){
			        	latLng = JSON.parse('{ "lat":'+ json.data[i][19] +', "lng":'+ json.data[i][20] +' }');
		            	namePlayArt = json.data[i][11];
		            	var infowindow = new google.maps.InfoWindow({
    						content: "b"
  						});
  						windows.push(infowindow);
			        	var n = new google.maps.Marker({
								    	position: latLng,
								   		map: map,
								  		title: namePlayArt,
								  		icon: 'img/house_ico.png'
								  	});
						markers.push(n);
						markers.pop().addListener('click', function() {
							
                            //windows[i].setContent("blabla");
    						windows.pop().open(map, n);
  						});
					}
				}
				else{
					latLng = JSON.parse('{ "lat":'+ json.data[i][19] +', "lng":'+ json.data[i][20] +' }');
		            namePlayArt = json.data[i][11];
			        var n = new google.maps.Marker({
				    	position: latLng,
				   		map: map,
				  		title: namePlayArt,
				  		icon: 'img/house_ico.png'
				  	});
				  	markers.push(n);
						n.addListener('click', function() {
							
                            infowindow.setContent("blabla");
    						infowindow.open(map, n);
  						});
					
				}	
	        }
		}
	}	
	
}
/*function SeeCrimes(){
	var LatU=41.8708;
	var LonU=-87.6505
	var VerIndx=document.getElementById("SelcSecu").selectedIndex;
	var Ver = document.getElementById("SelcSecu").options[VerIndx].value; //yes or not
	var xmlhttp = new XMLHttpRequest(); 
	var url = "https://data.cityofchicago.org/api/views/z8bn-74gv/rows.json?accessType=DOWNLOAD";
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
	var myArr;
	var text;
	var json;
	var numberOfPA;
	
	xmlhttp.onreadystatechange = function() {
	    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	        myArr = xmlhttp.responseText;
	        text = myArr;
	        json = JSON.parse(text);
	        numberOfPA = json.data.length;
	        for(var i=0; i<numberOfPA; i++){
	        	var latLng = "";
            	if (Ver=="Yes"){	            	
		        	latLng = JSON.parse('{ "lat":'+ json.data[i][20] +', "lng":'+ json.data[i][21] +' }');
		        	var n = new google.maps.Marker({
							    	position: latLng,
							   		map: map,
							  		icon: 'img/crimes_ico.png'
							  	});
					
				}
			
	        }
		}
	}	
	
}*/
