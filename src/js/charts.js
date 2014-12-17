(function($, Highcharts, ChloroMap, numeral) {

  $.getJSON('data/deathsByCounty.json', function(data) {
    var countyMap = new ChloroMap('county-by-county', data, {
      property: 'perCapita'
    });
    var countyMap2 = new ChloroMap('county-by-county-count', data, {
      property: 'count',
      colors: ['#deebf7', '#9ecae1', '#3182bd']
    });
  });

  var primaryColor = '#395271';

  Highcharts.setOptions({
    chart: {
      style: {
        fontFamily: '"Merriweather Sans", sans-serif'
      }
    },
    colors: [primaryColor, '#ca3a29', '#74BA0D'],
    tooltip: {
      backgroundColor: '#fff',
      borderColor: '#f7f7f7',
      borderRadius: 0
    },
    yAxis: {
      title: {
        text: null
      }
    },
    credits: {
      enabled: false
    }
  });

  $('#causes-of-death').highcharts({
    chart: {
      type: 'bar'
    },
    title: {
      text: ''
    },
    xAxis: {
      categories: [
        'blunt force trauma',
        'drowning',
        'gunshot',
        'co-sleeping',
        'suffocation',
        'left in car',
        'hit by car',
        'vehicle accident',
        'medical',
        'overdose',
        'other'
      ]
    },
    series: [{
      data: [255, 148, 59, 57, 30, 27, 27, 24, 21, 14, 116],
      name: 'Number of deaths'
    }]
  });

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
    tooltip: {
      valueSuffix: '%'
    },
    series: [{
      data: [29.3, 29.8, 34.1, 30.5, 23.6, 25.4, 25, 26.1, 25.5],
      name: 'Turnover rate'
    }]
  });

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

}(jQuery, Highcharts, ChloroMap, numeral));
