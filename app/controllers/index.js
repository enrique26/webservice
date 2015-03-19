var Map = require('ti.map');

var data = [];
var latitude1;
var longitud1;
// var url='http://www.azteca.com/historico/index/more/format/json?program=272&string=&category=0&type=2&page=-2&numItems=50&imgW=65&imgH=65';
var url = 'http://www.luebbert.mx/myplace24/htcdocs/libs/nearPlaces.php';

var params = {  
                    latitud: 52.515623,
                    longitud: 13.398428,
                    rango:1000000
             };
             
             Ti.API.info('param '+JSON.stringify(params));
var cliente = Ti.Network.createHTTPClient({
	onload : function() {
		Ti.API.info(this.responseData);

		var result = JSON.parse(this.responseData);
		var resultados = result.places24;
		Alloy.Globals.Lwebservice = resultados;
		// alert(result.places24[0].namePlace);

		alert(resultados);

		// alert(resultados[0].resultado.nombre);
		Ti.API.info(resultados.length);
		// Ti.API.info(Alloy.Globals.Lwebservice[2].namePlace);
		// latitude1=resultados[9].latitude;
		// longitud1=resultados[9].longitude;
		// alert(longitud1);
		
		for(var i=0;i<resultados.length;i++){
		var filasT=Ti.UI.createTableViewRow({
		top:0,
		height:50,
		left:0,
		rigth:0,
		borderColor:'green',
		borderWidth:1,
		id:resultados[i].id_places
		});
		
		// var titulos=Ti.UI.createLabel({
		// // text:resultados[i].title,
		// text:resultados[i].namePlace,
		// color:'red',
		// top:0,
		// left:25
		//
		// });
		var titulos2=Ti.UI.createLabel({
		// text:resultados[i].title,
		text:resultados[i].addressPlace,
		color:'red',
		top:0,
		textAlign:'left'
		
		
		});
		
		var imagenes=Ti.UI.createImageView({
		image:resultados[i].photoFront,
		height:20,
		width:15,
		left:0
		
		});
		
		filasT.add(imagenes),
		// filasT.add(titulos);
		// filasT.add(titulos2);
		data.push(filasT);
		
		}
		$.tablaWeb.data=data;
		

	},
	onerror : function(e) {
		alert(e.error);
	},

	timeout : 5000,
});
cliente.ondatastream = function(e) {
	Ti.API.info("e.progress : " + e.progress);
	ind.value = e.progress;
};
cliente.open('POST', url);

cliente.send(params);

//progress bar visible solo en android
var ind = Titanium.UI.createProgressBar({
	width : 200,
	height : 150,
	min : 0,
	max : 1,
	value : 0,
	top : 60,
	message : 'Descargando Actualizacion....',
	font : {
		fontSize : 18,
		fontWeight : 'bold'
	},
	color : 'green'
});


$.tablaWeb.addEventListener('click', function(e) {

	alert(e.rowData.id);

});
var mountainView = Map.createAnnotation({
	latitude : parseFloat(latitude1),
	longitude : parseFloat(longitud1),
	title : "ALGO",
	subtitle : latitude1 + ' ' + longitud1,
	pincolor : Map.ANNOTATION_RED,
	myid : 1 // Custom property to uniquely identify this annotation.
});
var mapview = Map.createView({
	mapType : Map.NORMAL_TYPE,
	region : {
		latitude : latitude1,
		longitude : longitud1,
		latitudeDelta : 0.01,
		longitudeDelta : 0.01
	},
	animate : true,
	regionFit : true,
	annotations : [mountainView]
});

// $.index.add(mapview);
$.index.add(ind);
$.index.open();
