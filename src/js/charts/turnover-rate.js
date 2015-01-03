/*
 * A line chart showing CPS turnover rate over the years
 */
 var $ = require('jquery'),
     Highcharts = require('../lib/highcharts');

$(function() {
  $('#cps-turnover-rate').highcharts({
    title: {
      text: ''
    },
    xAxis: {
      categories: ['2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013']
    },
    yAxis: {
      min: 0,
      max: 100,
      labels: {
        formatter: function() {
          return this.value + '%';
        }
      }
    },
    legend: {
      enabled: false
    },
    tooltip: {
      valueSuffix: '%'
    },
    series: [{
      data: [29.3, 29.8, 34.1, 30.5, 23.6, 25.4, 25, 26.1, 25.5],
      name: 'Turnover rate'
    }]
  });
});
