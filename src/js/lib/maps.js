/*
 * Maps showing deaths by county, in real numbers and per capita
 */
var ChloroMap = require('./chloromap');

$.getJSON('data/deathsByCounty.json', function(data) {
  var countyMap = new ChloroMap('county-by-county', data, {
    property: 'perCapita',
    child: true
  });
  var countyMap2 = new ChloroMap('county-by-county-count', data, {
    property: 'count',
    colors: ['#deebf7', '#9ecae1', '#3182bd']
  });

  countyMap.on('countymouseover', function(e) {
    countyMap2.fire('countyselect', e);
  });
  countyMap.on('countymouseout', function(e) {
    countyMap2.fire('countydeselect', e);
  });

  countyMap2.on('countymouseover', function(e) {
    countyMap.fire('countyselect', e);
  });
  countyMap2.on('countymouseout', function(e) {
    countyMap.fire('countydeselect', e);
  });

  countyMap.sync(countyMap2);
  countyMap2.sync(countyMap);
});
