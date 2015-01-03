/*
 * Maps showing deaths by county, in real numbers and per capita
 */
var $ = require('jquery'),
    Chloromap = require('./Chloromap');

$.getJSON('data/deathsByCounty.json', function(data) {
  var countyMap = new ChloroMap('county-by-county', data, {
    property: 'perCapita'
  });
  var countyMap2 = new ChloroMap('county-by-county-count', data, {
    property: 'count',
    colors: ['#deebf7', '#9ecae1', '#3182bd']
  });
});
