var dataset = 'https://raw.githubusercontent.com/vioa96/datasets/master/geojson/HousingCounselingAgencies.geojson';
/* =====================
Leaflet Configuration
===================== */

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

$(document).ready(function() {
    $.ajax(dataset).done(function(data) {
      var parsedData = JSON.parse(data);

      var myFeatureGroup = L.geoJson(parsedData).bindPopup(parsedData.features.NAME).addTo(map);
    });

  });

//page 1
//page 1
var page1 = function(){
  $(document).ready(function() {
    $.ajax(dataset).done(function(data) {
      var parsedData = JSON.parse(data);
      var myFeatureGroup = L.geoJson(parsedData).addTo(map);
    });

  });
};
var obj1 = {
  'title':'Housing Counseling Agencies Map',
  'subtitle':'The map shows the housing couseling services location in Philadelphia in 2015.',
  'body':'The information is provided by the Office of Housing and CommunityDepartment.OHCD has long supported neighborhood-based and citywideorganizations offering housing counseling services to low- andmoderate-income people. OHCD-funded services provided by theseagencies include mortgage counseling, default and delinquency counseling, tenant support and housing consumer education.',


};





//page2
var myStyle2 = function(feature) {
  if (19100<=feature.properties.ZIP<=19110){
    return{color:'red'};
  }
  if (19111<=feature.properties.ZIP<=19120){
    return{color:'green'};
  }
  if (19121<=feature.properties.ZIP<=19130){
    return{color:'blue'};
  }
  if (19131<=feature.properties.ZIP<=19140){
    return{color:'yellow'};
  }
  if (feature.properties.ZIP>=19141){
    return{color:'#5d4c52'};
  }

};

var eachFeature2 = function(feature, layer) {
  layer.on('click', function (e) {
    $('.zipcode').text(feature.properties.ZIP);
    map.fitBounds(this.getBounds());
    console.log(feature);
  });
};



var myFilter = function(feature) {
  if (feature.properties.OTHER ===" "){
    return true;
  }

};

var page2 = function(){
  $(document).ready(function() {
    $.ajax(dataset).done(function(data) {
      var parsedData = JSON.parse(data);
      var myFeatureGroup = L.geoJson(parsedData, {
        onEachFeature: eachFeature2,
        style: myStyle2,
        filter: myFilter
      }).addTo(map);
    });

  });
};


//page3
var myStyle3 = function(feature) {
  if (feature.properties.PREVENTION=='Y'){
    return{color:'red'};
  }
  if (feature.properties.PREVENTION=='N'){
    return{color:'green'};
  }

};

var eachFeature3 = function(feature, layer) {
  if (feature.properties.PREVENTION=='Y'){
    feature.properties.PREVENTION='YES';
  }
  if (feature.properties.PREVENTION=='N'){
    feature.properties.PREVENTION='NO';
  }
  layer.on('click', function (e) {
    $('.prevent').text(feature.properties.PREVENTION);
    map.fitBounds(this.getBounds());
    console.log(feature);
  });
};

var page3 = function(){
  $(document).ready(function() {
    $.ajax(dataset).done(function(data) {
      var parsedData = JSON.parse(data);
      var myFeatureGroup = L.geoJson(parsedData, {
        onEachFeature: eachFeature3,
        style: myStyle3,
        filter: myFilter
      }).addTo(map);
    });

  });
};

//page4
var myStyle4 = function(feature) {
  if (feature.properties.SENIORS=='Y'){
    return{color:'red'};
  }
  if (feature.properties.SENIORS=='N'){
    return{color:'green'};
  }

};

var eachFeature4 = function(feature, layer) {
  if (feature.properties.SENIORS=='Y'){
    feature.properties.SENIORS='YES';
  }
  if (feature.properties.SENIORS=='N'){
    feature.properties.SENIORS='NO';
  }
  layer.on('click', function (e) {
    $('.prevent').text(feature.properties.SENIORS);
    map.fitBounds(this.getBounds());
    console.log(feature);
  });
};

var page4 = function(){
  $(document).ready(function() {
    $.ajax(dataset).done(function(data) {
      var parsedData = JSON.parse(data);
      var myFeatureGroup = L.geoJson(parsedData, {
        onEachFeature: eachFeature4,
        style: myStyle4,
        filter: myFilter
      }).addTo(map);
    });

  });
};


//page5
var myStyle5 = function(feature) {
  if (feature.properties.PRE_PURCHA=='Y'){
    return{color:'red'};
  }
  if (feature.properties.PRE_PURCHA=='N'){
    return{color:'green'};
  }

};

var eachFeature5 = function(feature, layer) {
  if (feature.properties.PRE_PURCHA=='Y'){
    feature.properties.PRE_PURCHA='YES';
  }
  if (feature.properties.PRE_PURCHA=='N'){
    feature.properties.PRE_PURCHA='NO';
  }
  layer.on('click', function (e) {
    $('.prevent').text(feature.properties.PRE_PURCHA);
    map.fitBounds(this.getBounds());
    console.log(feature);
  });
};

var page5 = function(){
  $(document).ready(function() {
    $.ajax(dataset).done(function(data) {
      var parsedData = JSON.parse(data);
      var myFeatureGroup = L.geoJson(parsedData, {
        onEachFeature: eachFeature5,
        style: myStyle5,
        filter: myFilter
      }).addTo(map);
    });

  });
};


var showIntro = function() {
  page1();
  $('#intro').show();
  $('#results').show();
};

var showResults1 = function() {
  page2();
  $('#intro').hide();
  $('#results1').show();
};

var showResult2=function(){
  map.setView([40.000, -75.1090],11);
  page3();
  $('#results1').hide();
  $('#results2').show();

};

var showResult3=function(){
  map.setView([40.000, -75.1090],11);
  page4();
  $('#results2').hide();
  $('#results3').show();
};

var showResult4=function(){
  map.setView([40.000, -75.1090],11);
  page5();
  $('#results3').hide();
  $('#results4').show();
};


showIntro();

$('#next1').click(function(){
    showResults1();
});

$('#next2').click(function(){
    showResults2();
});

$('#next3').click(function(){
    showResults3();
});

$('#next4').click(function(){
    showResults4();
});

$('#prev2').click(function(){
    showIntro();
});

$('#prev3').click(function(){
    showResults1();
});

$('#prev4').click(function(){
    showResults2();
});

$('#prev5').click(function(){
    showResults3();
});
