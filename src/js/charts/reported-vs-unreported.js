/*
 * Reported vs. unreported deaths over the years; line chart
 */
var Highcharts = require('../lib/highcharts');

$(function() {

  $('#reported-vs-unreported').highcharts({
    title: {
      text: ''
    },
    xAxis: {
      categories: ['2010', '2011', '2012', '2013', '2014']
    },
    tooltip: {
      crosshairs: true,
      shared: true
    },
    plotOptions: {
      area: {
        stacking: 'normal'
      }
    },
    series: [{
      data: [280, 231, 212, 156, 145],
      name: 'Reported publicly'
    }, {
      data: [120, 140, 120, 150, 125],
      name: 'Not reported publicly'
    }]
  });

});
