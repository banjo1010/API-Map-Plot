function loadMap(){
Plotly.setPlotConfig({
        mapboxAccessToken: 'pk.eyJ1IjoiYmVuamkxMjMiLCJhIjoiY2pvNmI2NHN3MGo4YjN2cGFnaXZnc201MSJ9.-GKCDSrQRbiHs1VKfGoNxA'
    });

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState === 4 && this.status === 200){
            var mapParams = getMapParams(this.response);
            Plotly.plot('map', mapParams.data, mapParams.layout);
        }
    };
    xhttp.open("GET", "/tickets");
    xhttp.send(); 
}

function setupMapData(d){
var lat = [];
var lon = [];
var text = [];
for(var i in d){
	lat.push(d[i][0]);
    lon.push(d[i][1]);
	text.push(d[i][2]);
}
var data = [{
	type: 'scattermapbox',
	mode: 'markers',
	marker: {size: 5, color: 'rgb(255,0,0)'},
	lat: lat,
	lon: lon,
	text: text,
}];
return data;

}
function findCenter(d){
var lat = [];
var lon = [];
for(var i in d){
	lat.push(d[i][0]);
    lon.push(d[i][1]);
}
var x = Math.min(...lat);
var y = Math.max(...lat);
var xx = Math.min(...lon);
var yy = Math.max(...lon);
var latitude = (x + y) / 2;	
var longitude = (xx + yy) / 2;
var array = [
	latitude, longitude
];
return array;
}
function setupMapLayout(d){
var x = findCenter(d);
for(var i in x){
latitude = x[0];
longitude = x[1];
}
var layout = {
  mapbox: {
    style: 'satellite-streets',
    zoom: 11,
	center: {
      lat: latitude,
      lon: longitude,
    }
  }
}
return layout;
}
function getMapParams(d){
var x = JSON.parse(d);
var data1 = setupMapData(x);
var layout1 = setupMapLayout(x);
var map = {
	data: data1,
	layout: layout1,
};
return map;
}
