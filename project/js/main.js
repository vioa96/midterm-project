var dataset = 'https://raw.githubusercontent.com/vioa96/datasets/master/geojson/HousingCounselingAgencies.geojson';
var map = L.map('map', {
  center: [40.000, -75.1090],
  zoom: 11
});
var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

var layer1=[];
var layer2=[];
var layer3=[];
var layer4=[];
var layer5=[];


//page1
var setSlideOne = function(){
    $('#heading').text('Housing Counseling Agencies Map');
    $('#text').text('The map shows the housing couseling services location in Philadelphia in 2015.The information is provided by the Office of Housing and Community Department.OHCD has long supported neighborhood-based and citywide organizations offering housing counseling services to low- and moderate-income people. OHCD-funded services provided by theseagencies include mortgage counseling, default and delinquency counseling, tenant support and housing consumer education.');
    var geojsonMarkerOptions={
      radius:8,
      color:"#000",
      weight: 1,
      opacity: 1,
      fillOpacity:0.8,
    };
    $(document).ready(function() {
        $.ajax(dataset).done(function(data) {
          var parsedData = JSON.parse(data);
          layer1=L.geoJson(parsedData,{
            pointToLayer:function(feature, latlng){
              return L.circleMarker(latlng, geojsonMarkerOptions).bindPopup(feature.properties.NAME+':'+feature.properties.ADDRESS);
            }
          }).addTo(map);
        });

      });
      $('#button_next').off();
      $('#button_next').click(function(){setSlideTwo();});
      $('#button_previous').hide();
      $('#legend1').hide();
      $('#legend2').hide();
      $('#image2').hide();
  };
setSlideOne();

//page2
  var setSlideTwo = function(){
    $('#heading').text('Housing Counseling Agencies Map');
    $('#text').text('The location of housing counseling angencies can be searched by the zip code you entered. You can find your nearset location. The name and address of the angency will be shown. The region is separated by five categories.');
    $(document).ready(function(){
      $.ajax(dataset).done(function(data){
        var parsedData = JSON.parse(data);
          map.removeLayer(layer1);
          map.removeLayer(layer3);
          map.removeLayer(layer4);
          map.removeLayer(layer5);
      });
    });

    var myStyle = function(feature) {
      if (19100<=feature.properties.ZIP && feature.properties.ZIP <=19110){
        return{fillColor:'red'};
      }
      if (19111<=feature.properties.ZIP && feature.properties.ZIP <=19120){
        return{fillColor:'green'};
      }
      if (19121<=feature.properties.ZIP && feature.properties.ZIP<=19130){
        return{fillColor:'blue'};
      }
      if (19131<=feature.properties.ZIP && feature.properties.ZIP<=19140){
        return{fillColor:'yellow'};
      }
      if (feature.properties.ZIP>=19141){
        return{fillColor:'#5d4c52'};
      }

    };

    var geojsonMarkerOptions={
      radius:8,
      color:"#000",
      weight: 1,
      opacity: 1,
      fillOpacity:0.8,
    };

    var eachFeature = function(feature, layer) {
      layer.on('click', function (e) {
        $('#results').text('Your Zip Code is:'+' '+feature.properties.ZIP);
        $("#results").show();
      });
    };



    var myFilter = function(feature) {
      if (feature.properties.ZIP !==" "){
        return true;
      }

    };

    $(document).ready(function(){
      $.ajax(dataset).done(function(data){
        var parsedData = JSON.parse(data);
        L.geoJson(parsedData,{
          onEachFeature: eachFeature,
          style: myStyle,
          filter: myFilter,
          pointToLayer:function(feature, latlng){
            return L.circleMarker(latlng, geojsonMarkerOptions).bindPopup(feature.properties.NAME+':'+feature.properties.ADDRESS);
          }
        }).addTo(map);
      });
    });
    $('#button_previous').show();
    $('#button_next').show();
    $('#button_previous').off();
    $('#button_previous').click(function(){
      $("#results").hide();
      setSlideOne();
    });
    $('#button_next').off();
    $('#button_next').click(function(){
      $("#results").hide();
      setSlideThree();
    });
    $('#legend1').show();
    $('#legend2').hide();
    $('#legend3').hide();
    $('#legend4').hide();

    $('#image2').show();

  };


//page3
  var setSlideThree= function(){
    $('#heading').text('Search By Prevention');
    $('#text').text('OHCD provides homeless prevention services as well, such as the tiny house program that provide homeless a live place by using vacant industrial buildings. There are many housing counseling agencies provide the prevention services in Philadelphia shown in the map.And the name and address will be shown by clicking your desired location.');
    $(document).ready(function(){
      $.ajax(dataset).done(function(data){
        var parsedData = JSON.parse(data);
          map.removeLayer(layer1);
          map.removeLayer(layer2);
          map.removeLayer(layer4);
          map.removeLayer(layer5);
      });
    });

    var myStyle = function(feature) {
      if (feature.properties.PREVENTION==='Y'){
        return{fillColor:'green'};
      }
      if (feature.properties.PREVENTION==='N'){
        return{fillColor:'red'};
      }

    };

    var geojsonMarkerOptions={
      radius:8,
      color:"#000",
      weight: 1,
      opacity: 1,
      fillOpacity:0.8,
    };

    var eachFeature = function(feature, layer) {
      if (feature.properties.PREVENTION==='Y'){
        feature.properties.PREVENTION='YES';
      }
      if (feature.properties.PREVENTION==='N'){
        feature.properties.PREVENTION='NO';
      }
      layer.on('click', function (e) {
        map.fitBounds(this.getBounds());
        $('#results').text('Does this location have a prevention services?'+' '+feature.properties.PREVENTION);
        $("#results").show();
      });
    };



    var myFilter = function(feature) {
      if (feature.properties.PREVENTION !==" "){
        return true;
      }

    };

    $(document).ready(function(){
      $.ajax(dataset).done(function(data){
        var parsedData = JSON.parse(data);
        L.geoJson(parsedData,{
          onEachFeature: eachFeature,
          style: myStyle,
          filter: myFilter,
          pointToLayer:function(feature, latlng){
            return L.circleMarker(latlng, geojsonMarkerOptions).bindPopup(feature.properties.NAME+':'+feature.properties.ADDRESS);
          }
        }).addTo(map);
      });
    });

    $('#button_next').show();
    $('#button_previous').off();
    $('#button_previous').click(function(){
      map.setView([40.000, -75.1090],11);
      $("#results").hide();
      setSlideTwo();
    });
    $('#button_next').off();
    $('#button_next').click(function(){
      map.setView([40.000, -75.1090],11);
      $("#results").hide();
      setSlideFour();
    });
    $('#legend2').show();
    $('#legend1').hide();
    $('#image2').hide();
  };



//page4
  var setSlideFour= function(){
    $('#heading').text('Search By Seniors');
    $('#text').text('OHCD services offered to seniors or their family members to assist them in locating retirement homes and assisted living in Philadelphia. There are only a few angencies provide the services here. However, you can find the names and addresses of the avaliable ones. ');
    $(document).ready(function(){
      $.ajax(dataset).done(function(data){
        var parsedData = JSON.parse(data);
          map.removeLayer(layer1);
          map.removeLayer(layer2);
          map.removeLayer(layer3);
          map.removeLayer(layer5);
      });
    });

    var myStyle = function(feature) {
      if (feature.properties.SENIORS==='Y'){
        return{fillColor:'green'};
      }
      if (feature.properties.SENIORS==='N'){
        return{fillColor:'red'};
      }

    };

    var geojsonMarkerOptions={
      radius:8,
      color:"#000",
      weight: 1,
      opacity: 1,
      fillOpacity:0.8,
    };

    var eachFeature = function(feature, layer) {
      if (feature.properties.SENIORS==='Y'){
        feature.properties.SENIORS='YES';
      }
      if (feature.properties.SENIORS==='N'){
        feature.properties.SENIORS='NO';
      }
      layer.on('click', function (e) {
        map.fitBounds(this.getBounds());
        $('#results').text('Does this location have senior services?'+' '+feature.properties.SENIORS);
        $("#results").show();
      });
    };



    var myFilter = function(feature) {
      if (feature.properties.SENIORS !==" "){
        return true;
      }

    };

    $(document).ready(function(){
      $.ajax(dataset).done(function(data){
        var parsedData = JSON.parse(data);
        L.geoJson(parsedData,{
          onEachFeature: eachFeature,
          style: myStyle,
          filter: myFilter,
          pointToLayer:function(feature, latlng){
            return L.circleMarker(latlng, geojsonMarkerOptions).bindPopup(feature.properties.NAME+':'+feature.properties.ADDRESS);
          }
        }).addTo(map);
      });
    });

    $('#button_next').show();
    $('#button_previous').off();
    $('#button_previous').click(function(){
      map.setView([40.000, -75.1090],11);
      $("#results").hide();
      setSlideThree();
    });
    $('#button_next').off();
    $('#button_next').click(function(){
      map.setView([40.000, -75.1090],11);
      $("#results").hide();
      setSlideFive();
    });
    $('#legend2').show();
    $('#legend1').hide();

    $('#image2').hide();


  };


//page5
  var setSlideFive= function(){
    $('#heading').text('Search By Pre-Purchase');
    $('#text').text('OHCD provides pre-purchase housing counseling services as well. Angcies help homeless to acquire free living place by regirstration. If people want this kind of services, there are many housing counseling agencies in Philadelphia. You will find the names and locations by clicking you desired place.');
    $(document).ready(function(){
      $.ajax(dataset).done(function(data){
        var parsedData = JSON.parse(data);
          map.removeLayer(layer1);
          map.removeLayer(layer2);
          map.removeLayer(layer3);
          map.removeLayer(layer4);
      });
    });

    var myStyle = function(feature) {
      if (feature.properties.PRE_PURCHA==='Y'){
        return{fillColor:'green'};
      }
      if (feature.properties.PRE_PURCHA==='N'){
        return{fillColor:'red'};
      }

    };

    var geojsonMarkerOptions={
      radius:8,
      color:"#000",
      weight: 1,
      opacity: 1,
      fillOpacity:0.8,
    };

    var eachFeature = function(feature, layer) {
      if (feature.properties.PRE_PURCHA==='Y'){
        feature.properties.PRE_PURCHA='YES';
      }
      if (feature.properties.PRE_PURCHA==='N'){
        feature.properties.PRE_PURCHA='NO';
      }
      layer.on('click', function (e) {
        map.fitBounds(this.getBounds());
        $('#results').text('Does this location have senior services?'+' '+feature.properties.PRE_PURCHA);
        $("#results").show();
      });
    };



    var myFilter = function(feature) {
      if (feature.properties.PRE_PURCHA !==" "){
        return true;
      }

    };

    $(document).ready(function(){
      $.ajax(dataset).done(function(data){
        var parsedData = JSON.parse(data);
        L.geoJson(parsedData,{
          onEachFeature: eachFeature,
          style: myStyle,
          filter: myFilter,
          pointToLayer:function(feature, latlng){
            return L.circleMarker(latlng, geojsonMarkerOptions).bindPopup(feature.properties.NAME+':'+feature.properties.ADDRESS);
          }
        }).addTo(map);
      });
    });


    $('#button_previous').off();
    $('#button_previous').click(function(){
      map.setView([40.000, -75.1090],11);
      $("#results").hide();
      setSlideFour();
    });
    $('#button_next').hide();

    $('#legend2').show();
    $('#legend1').hide();

    $('#image2').hide();

  };
