var $ = require('jquery'),
    d3 = require('d3'),
    dc = require('dc'),
    crossfilter = require('crossfilter');

var intro = $('.intro');
intro.find('a').on('click', function(e) {
  e.preventDefault();
  $('.explorer-header').show();
  intro.slideUp();
  $(".fade-in").animate({
    opacity: 1
  });
});

/*
var AAS = require('./lib/aas'),
    Overview = require('./views/overview');

var overview = new Overview({
  collection: AAS.children,
  el: '#explorer'
});
*/

var prevRmvChart = dc.pieChart('#previous-removals-chart'),
//    dayOfWeekChart = dc.rowChart('#day-of-week-chart'),
    prevInvChart = dc.barChart('#previous-investigations-chart'),
    ageChart = dc.barChart('#age-chart'),
    volumeChart = dc.barChart('#dod-chart'),
    dataGrid = dc.dataGrid('#grid');

// Handle filter resets
function resetHandler(e, chart) {
  e.preventDefault();
  e.data.filterAll();
  dc.redrawAll();
}

$('#previous-removals-chart .reset').click(prevRmvChart, resetHandler);
//$('#day-of-week-chart .reset').click(dayOfWeekChart, resetHandler);
$('#previous-investigations-chart .reset').click(prevInvChart, resetHandler);
$('#age-chart .reset').click(ageChart, resetHandler);
$('#dod-chart .reset').click(volumeChart, resetHandler);

d3.json('data/cps-reports.json', function (data) {

  /**********************/
  /* Setup crossfilters */
  /**********************/
  var dateFormat = d3.time.format("%Y-%m-%dT%H:%M:%S");
  data.forEach(function (d) {
    d.dod = dateFormat.parse(d.dod);
    d.month = d.dod.getMonth();
    d.age_years = Math.floor(d.age_days / 365);
  });

  var ndx = crossfilter(data);
  var all = ndx.groupAll();

  // Gender filter/groups
  var prevRmv = ndx.dimension(function (d) {
    if(d.prevRmv) {
      return 'Yes';
    }
    else {
      return 'No';
    }
  });
  var prevRmvGroup = prevRmv.group();

  // Day of week filter/groups
  var dayOfWeek = ndx.dimension(function (d) {
    var day = d.dod.getDay();
    var name = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return day + '.' + name[day];
  });
  var dayOfWeekGroup = dayOfWeek.group();

  // Previous removals filter/groups
  var prevInv = ndx.dimension(function (d) {
    return d.prevInv;
  });
  var prevInvGroup = prevInv.group();

  // Age filters/groups
  var age = ndx.dimension(function (d) {
    return d.age_years;
  });
  var ageGroup = age.group();

  // Full-date filter
  var dateDimension = ndx.dimension(function (d) {
    return d.dod;
  });

  // Month group
  var monthsGroup = dateDimension.group();


  /********/
  /* Grid */
  /********/

  dataGrid
    .dimension(dateDimension)
    .group(function (d) {
      return d.dod.getFullYear();
    })
    .htmlGroup(function(d) {
      return null;
    })
    .html(function(d) {
      return '<i class="fa fa-child overview-item active gender-' + d.gender + '"></i>';
    });


  /********************/
  /* Gender pie chart */
  /********************/
  prevRmvChart
    .width(180) // (optional) define chart width, :default = 200
    .height(180) // (optional) define chart height, :default = 200
    .radius(80) // define pie radius
    .dimension(prevRmv) // set dimension
    .group(prevRmvGroup) // set group
    .renderLabel(true)
    .transitionDuration(500);


  /*********************/
  /* Day of week chart */
  /*********************/
  /*
  dayOfWeekChart
    .width(180)
    .height(180)
    .margins({top: 0, left: 5, right: 0, bottom: 20})
    .group(dayOfWeekGroup)
    .dimension(dayOfWeek)
    .gap(1)
    .colors(function() {
      return '#1f77b4';
    })
    .label(function (d) {
      return d.key.split('.')[1];
    })
    .title(function (d) {
      return d.value;
    })
    .elasticX(true)
    .xAxis().ticks(4);
  */


  /***************************/
  /* Previous investigations */
  /***************************/
  prevInvChart
    .width(360)
    .height(180)
    .margins({top: 10, right: 0, bottom: 19, left: 33})
    .dimension(prevInv)
    .group(prevInvGroup)
    .elasticY(true)
    .centerBar(true)
    .round(dc.round.floor)
    .alwaysUseRounding(true)
    .x(d3.scale.linear().domain(d3.extent(data, function(d) {
      return d.prevInv;
    })))
    .renderHorizontalGridLines(true);


  /********/
  /* Ages */
  /********/
  ageChart
    .width(360)
    .height(180)
    .margins({top: 10, right: 0, bottom: 19, left: 33})
    .dimension(age)
    .group(ageGroup)
    .elasticY(true)
    .centerBar(true)
    .round(dc.round.floor)
    .alwaysUseRounding(true)
    .x(d3.scale.linear().domain(d3.extent(data, function(d) {
      return d.age_years;
    })))
    .renderHorizontalGridLines(true);


  /*****************/
  /* Date of death */
  /*****************/

  volumeChart
    .width(910)
    .height(60)
    .margins({top: 0, right: 0, bottom: 20, left: 0})
    .dimension(dateDimension)
    .group(monthsGroup)
    .gap(0)
    .centerBar(true)
    .x(d3.time.scale().domain(d3.extent(data, function(d) {
      return d.dod;
    })))
    .round(d3.time.month.round)
    .alwaysUseRounding(true)
    .xUnits(d3.time.weeks)
    .xAxis().ticks(5);
  volumeChart.yAxis().ticks(0);


  /**************/
  /* Data table */
  /**************/
  dc.dataTable('#data-table')
    .dimension(dateDimension)
    .group(function (d) {
      return d.dod.getFullYear();
    })
    .columns([
      {
        label: 'Date of death',
        format: function(d) {
          var monthDayFormat = d3.time.format("%_m/%e");
          return monthDayFormat(d.dod);
        }
      },
      'name',
      'age',
      {
        label: 'Cause of death',
        format: function(d) {
          return d.cod;
        }
      },
      'county',
      {
        label: 'Report',
        format: function(d) {
          return '<a href="docs.html?doc=' + d.dc_id + '" target="_blank"><i class="fa fa-file-text"></i> Read report</a>';
        }
      }
    ])
    .sortBy(function (d) {
      return +d.dod;
    })
    .order(d3.descending)
    .size(25)
    .renderlet(function (table) {
      table.selectAll('.dc-table-group').classed('active', true);
    });

  /* Render the charts */
  dc.renderAll();
});
