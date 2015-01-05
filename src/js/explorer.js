var $ = require('jquery'),
    d3 = require('d3'),
    dc = require('dc'),
    crossfilter = require('crossfilter');

var intro = $('.intro');
intro.find('a').on('click', function(e) {
  e.preventDefault();
  intro.slideUp();
  $("#explorer").animate({
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

var genderChart = dc.pieChart('#gender-chart'),
    dayOfWeekChart = dc.rowChart('#day-of-week-chart'),
    prevInvChart = dc.barChart('#previous-investigations-chart'),
    ageChart = dc.barChart('#age-chart'),
    volumeChart = dc.barChart('#dod-chart'),
    dataGrid = dc.dataGrid('#grid'),
    dataGrid2 = dc.dataGrid('#grid-2');

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
  var gender = ndx.dimension(function (d) {
    return d.gender;
  });
  var genderGroup = gender.group();

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
  dataGrid2
    .dimension(dateDimension)
    .group(function (d) {
      return d.dod.getFullYear();
    })
    .htmlGroup(function(d) {
      return null;
    })
    .html(function(d) {
      return '<i class="fa fa-child overview-item gender-' + d.gender + '"></i>';
    });
  dataGrid2._doRedraw = function () {};


  /********************/
  /* Gender pie chart */
  /********************/
  genderChart
    .width(180) // (optional) define chart width, :default = 200
    .height(180) // (optional) define chart height, :default = 200
    .radius(80) // define pie radius
    .dimension(gender) // set dimension
    .group(genderGroup) // set group
    .colors(function(d, i) {
      var colors = {
        M: '#6595EC',
        F: '#FFABF1'
      };
      return colors[d];
    })
    .innerRadius(30)
    .renderLabel(true)
    .transitionDuration(500);


  /*********************/
  /* Day of week chart */
  /*********************/
  dayOfWeekChart
    .width(180)
    .height(180)
    .margins({top: 20, left: 10, right: 10, bottom: 20})
    .group(dayOfWeekGroup)
    .dimension(dayOfWeek)
    .colors(function() {
      return '#395271';
    })
    .label(function (d) {
      return d.key.split('.')[1];
    })
    .title(function (d) {
      return d.value;
    })
    .elasticX(true)
    .xAxis().ticks(4);


  /***************************/
  /* Previous investigations */
  /***************************/
  prevInvChart
    .width(420)
    .height(180)
    .margins({top: 10, right: 50, bottom: 30, left: 40})
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
    .width(420)
    .height(180)
    .margins({top: 10, right: 50, bottom: 30, left: 40})
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
    .width(990)
    .height(60)
    .margins({top: 0, right: 50, bottom: 20, left: 40})
    .dimension(dateDimension)
    .group(monthsGroup)
    .centerBar(true)
    .gap(1)
    .x(d3.time.scale().domain(d3.extent(data, function(d) {
      return d.dod;
    })))
    .round(d3.time.month.round)
    .alwaysUseRounding(true)
    .xUnits(d3.time.weeks);


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
