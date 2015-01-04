/*
 * A line chart showing the change in caseloads mashed up with the change in
 * staff
 */
var Highcharts = require('../lib/highcharts');

$(function() {
  $('#cps-caseloads').highcharts({
    title: {
      text: ''
    },
    xAxis: {
      categories: ['2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013']
    },
    yAxis: [{
      title: {
        text: 'Cases per day'
      }
    }, {
      title: {
        text: 'Total CPS staff'
      },
      opposite: true
    }],
    tooltip: {
      crosshairs: true,
      shared: true
    },
    series: [{
      data: [43.2, 34.7, 25.3, 21.9, 20.7, 29.1, 27.4, 24.7, 19.9],
      name: 'Investigations',
      yAxis: 0
    }, {
      data: [40.4, 44.5, 43.3, 37.3, 28.2, 29.5, 32, 33.7, 31.8],
      name: 'Conservatorship',
      yAxis: 0
    }, {
      data: [5114, 5894, 7046, 8037, 8632.6, 8343.5, 8362, 8064.5, 8234],
      name: 'Total staff',
      yAxis: 1,
      zIndex: -1
    }]
  });
});
