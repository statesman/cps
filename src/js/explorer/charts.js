var $ = require('jquery'),
    d3 = require('d3'),
    _ = require('underscore'),
    Opentip = require('../../../bower_components/opentip/downloads/opentip-native'),
    crossfilter = require('crossfilter');

function Charts(cb) {

  var self = this;
  function renderCharts() {
    var width = $(window).width();

    // Set some defaults
    self.prevRem.width(180);
    self.prevRem.height(180);
    self.cod.width(190);
    self.cod.height(312);
    self.prevInv.width(335);
    self.prevInv.height(180);
    self.age.width(335);
    self.age.height(180);
    self.dod.width(890);
    self.dod.height(60);

    // Then override them, if necessary by breakpoint

    // Medium
    if(width >= 992 && width < 1200) {
      self.cod.width(150);
      self.age.width(255);
      self.prevInv.width(255);
      self.dod.width(730);
    }
    // Small
    if(width >= 768 && width < 992) {
      self.prevInv.width(280);
      self.age.width(475);
      self.cod.height(420);
      self.dod.width(690);
    }
    // Extra small
    if(width < 768) {
      self.prevRem.width(250);
      self.prevRem.height(180);
      self.prevInv.width(250);
      self.cod.width(250);
      self.cod.height(250);
      self.dod.width(250);
      self.age.width(250);
    }

    self.dc.renderAll();
  }

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
    var dateToString = d3.time.format("%b %_d, %Y");

    data.forEach(function (d) {
      d.dod = dateFormat.parse(d.dod);
      d.month = d.dod.getMonth();
      d.age_years = Math.floor(d.age_days / 365);

      // Calculate the tooltip text once here so it doesn't have to be rebuilt
      // each time the datagrid is rendered
      d.popup = "<p><strong>Age: </strong>" + d.age + "</p>" +
        "<p><strong>Date of death: </strong> " + dateToString(d.dod) + "</p>" +
        "<p><strong>Cause of death: </strong> " + d.cod + "</p>" +
        '<p><a href="docs.html?doc=' + d.dc_id + '" target="_blank"><i class="fa fa-file-text"></i> Read report</a></p>';
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
    // Configure tooltips to match Bootstrap popups on story pages
    Opentip.styles.child = {
      stem: true,
      hideDelay: 0,
      fixed: true,
      className: "popover popover-child",
      showOn: "click",
      hideOn: "click",
      removeElementsOnHide: true,
      showEffectDuration: 0,
      hideEffectDuration: 0,
      group: 'children',
      background: "#ffffff",
      borderRadius: 6,
      borderColor: '#cccccc',
      shadow: true,
      shadowBlur: 10,
      shadowOffset: [0, 5],
      shadowColor: 'rgba(0,0,0,0.2)'
    };

    // Setup datagrid
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
      })
      .renderlet(function(chart){
        chart.selectAll('.dc-grid-item').each(function(d) {
          new Opentip(this, d.popup, d.name, {style: 'child'});
        });
      });

    /********************/
    /* Gender pie chart */
    /********************/
    this.prevRem
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


    /* Render the charts and bind to the window resizer */
    var debouncedRender = _.debounce(renderCharts, 500, this);
    debouncedRender();
    $(window).resize(debouncedRender);

    cb(this);

  });

}

module.exports = Charts;
