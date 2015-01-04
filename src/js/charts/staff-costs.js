/*
 * A chart showing CPS staff costs over the years
 */
var Highcharts = require('../lib/highcharts'),
    numeral = require('numeral');

$(function() {
  $('#cps-staff-costs').highcharts({
    title: {
      text: ''
    },
    xAxis: {
      categories: ['2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013']
    },
    yAxis: {
      labels: {
        formatter: function() {
          return numeral(this.value).format('$0a');
        }
      }
    },
    tooltip: {
      valuePrefix: '$'
    },
    series: [{
      data: [241927936, 303837559, 376531782, 422939948, 490511804.05, 462545961.88, 453054389, 451810639, 468990287],
      name: 'Staff costs'
    }]
  });
});
