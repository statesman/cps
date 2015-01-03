/*
 * Total staff over the years
 */
 var $ = require('jquery'),
     Highcharts = require('../lib/highcharts');

$(function() {
  $('#cps-staff-counts').highcharts({
    title: {
      text: ''
    },
    xAxis: {
      categories: ['2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013']
    },
    yAxis: {
      min: 0
    },
    series: [{
      data: [5114, 5894, 7046, 8037, 8632.6, 8343.5, 8362, 8064.5, 8234],
      name: 'Total staff'
    }]
  });

});
