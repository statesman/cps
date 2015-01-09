var $ = require('jquery'),
    d3 = require('d3'),
    _ = require('underscore');
    crossfilter = require('crossfilter');

function Charts(cb) {

  this.dc = require('dc');

  this.prevRem = this.dc.pieChart('#previous-removals-chart'),
  this.cod = this.dc.rowChart('#cod-chart'),
  this.prevInv = this.dc.barChart('#previous-investigations-chart'),
  this.age = this.dc.barChart('#age-chart'),
  this.dod = this.dc.barChart('#dod-chart'),
  this.grid = this.dc.dataGrid('#grid')

  // Handle filter resets
  var self = this;
  function resetHandler(e, chart) {
    e.preventDefault();
    e.data.filterAll();
    self.dc.redrawAll();
  }

  $('#previous-removals-chart .reset').click(this.prevRem, resetHandler);
  $('#cod-chart .reset').click(this.cod, resetHandler);
  $('#previous-investigations-chart .reset').click(this.prevInv, resetHandler);
  $('#age-chart .reset').click(this.age, resetHandler);
  $('#dod-chart .reset').click(this.dod, resetHandler);

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
      if(d.fault.toLowerCase().indexOf('paramour') !== -1) {
        return 'Yes';
      }
      else {
        return 'No';
      }
    });
    var prevRmvGroup = prevRmv.group();

    // Cause of death filter/groups
    var topCods = [
      'Blunt force trauma',
      'Drowning',
      'Gunshot',
      'Co-sleeping',
      'Suffocation',
      'Left in car',
      'Hit by car',
      'Vehicle accident',
      'Medical',
      'Overdose'
    ];
    var cod = ndx.dimension(function (d) {
      if($.inArray(d.cod, topCods) === -1) {
        return 'Other';
      }
      return d.cod;
    });
    var codGroup = cod.group();

    // Previous removals filter/groups
    var prevInv = ndx.dimension(function (d) {
      if(d.prevInv >= 10) {
        return 10;
      }
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

    this.grid
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
    this.prevRem
      .width(180)
      .height(180)
      .radius(80)
      .dimension(prevRmv)
      .group(prevRmvGroup)
      .renderLabel(true)
      .colors(function(d) {
        if(d === "No") {
          return 'rgba(132, 178, 217, 0.5)';
        }
        return 'rgba(132, 178, 217, 0.7)';
      })
      .transitionDuration(500);


    /*********************/
    /* Day of week chart */
    /*********************/
    this.cod
      .width(190)
      .height(312)
      .margins({top: 0, left: 5, right: 10, bottom: 20})
      .group(codGroup)
      .dimension(cod)
      .gap(3)
      .colors(function() {
        return 'rgba(132, 178, 217, 0.6)';
      })
      .label(function (d) {
        return d.key;
      })
      .title(function (d) {
        return d.value;
      })
      .elasticX(true)
      .xAxis().ticks(3);


    /***************************/
    /* Previous investigations */
    /***************************/
    this.prevInv
      .width(335)
      .height(180)
      .margins({top: 10, right: 10, bottom: 24, left: 33})
      .dimension(prevInv)
      .group(prevInvGroup)
      .elasticY(true)
      .centerBar(true)
      .x(d3.scale.linear()
        .domain([-0.5, 10.5]))
      .gap(3)
      .colors(function(d, l) {
        return 'rgba(132, 178, 217, 0.6)';
      })
      .renderHorizontalGridLines(true);
    this.prevInv.xAxis()
      .tickFormat(function(d) {
        if(d === 10) {
          return '10+';
        }
        return d;
      });
    this.prevInv.yAxis()
      .ticks(4);


    /********/
    /* Ages */
    /********/
    this.age
      .width(335)
      .height(180)
      .margins({top: 10, right: 10, bottom: 24, left: 33})
      .dimension(age)
      .group(ageGroup)
      .centerBar(true)
      .elasticY(true)
      .gap(3)
      .colors(function() {
        //return '#80b1d3';
        return 'rgba(132, 178, 217, 0.6)';
      })
      .x(d3.scale.linear().domain(d3.extent([-0.5, 17.5])))
      .renderHorizontalGridLines(true);
    this.age.yAxis()
      .ticks(4);


    /*****************/
    /* Date of death */
    /*****************/

    this.dod
      .width(890)
      .height(60)
      .margins({top: 0, right: 0, bottom: 20, left: 0})
      .dimension(dateDimension)
      .group(monthsGroup)
      .gap(0)
      .centerBar(true)
      .x(d3.time.scale().domain(d3.extent(data, function(d) {
        return d.dod;
      })))
      .colors(function() {
        //return '#80b1d3';
        return 'rgba(132, 178, 217, 0.6)';
      })
      .round(d3.time.month.round)
      .alwaysUseRounding(true)
      .xUnits(d3.time.weeks)
      .xAxis().ticks(5);
    this.dod.yAxis().ticks(0);


    /**************/
    /* Data table */
    /**************/
    this.dc.dataTable('#data-table')
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

    var countText = '<strong>%filter-count</strong><br /> of %total-count selected';
    var topCount = dc.dataCount('#total')
      .dimension(ndx)
      .group(all)
      .html({
        some: countText,
        all: countText
      });

    /* Render the charts */
    this.dc.renderAll();

    cb(this);

  });

}

module.exports = Charts;
