var $ = require('jquery'),
    finch = require('../../bower_components/finchjs/finch').Finch,
    chartSetup = require('./explorer/charts'),
    Spinner = require('spin.js');

var opts = {
  lines: 13,
  length: 20,
  width: 10,
  radius: 30,
  corners: 1,
  direction: 1,
  color: '#333',
  speed: 1,
  trail: 60,
  shadow: false,
  hwaccel: false,
  className: 'spinner',
  zIndex: 2e9,
  top: '50%',
  left: '50%'
};
var target = document.getElementById('spinner');
var spinner = new Spinner(opts).spin(target);

function filterClasses(activeFilter) {
  $('body').addClass('explorer-active explorer-filtered explorer-sliced');
  $('.explorer-slices').find('.active-filter').removeClass('active-filter');
  $('.explorer-slices .' + activeFilter).addClass('active-filter');
}

chartSetup(function(charts) {
  spinner.stop();
  $('body').removeClass('loading');

  // Because there's no easy way to filter through the filter events
  // to determine which we trigger and which the user triggers, we
  // set the ignoreFilter boolean before each event to act as a filter
  // we can check to distinguish
  var ignoreFilter = false;

  function onFilter(chart, filter) {
    if(ignoreFilter === false) {
      if(filter !== null) {
        finch.navigate("/custom-view");
      }
    }
    else {
      ignoreFilter = false;
    }
  }

  // Bind to all chart filter events
  charts.prevRem.on("filtered", onFilter);
  charts.cod.on("filtered", onFilter);
  charts.prevInv.on("filtered", onFilter);
  charts.age.on("filtered", onFilter);
  charts.dod.on("filtered", onFilter);

  finch.route("/", function() {
    $('body').removeClass('explorer-filtered explorer-sliced');

    charts.dc.filterAll();
    charts.dc.redrawAll();
  });

  finch.route("/custom-view", function() {
    // A route for users who are just playing with the data
    $('body').addClass('explorer-filtered');
    $('body').removeClass('explorer-sliced');
    $('.explorer-slices').find('.active-filter').removeClass('active-filter');
  });

  finch.route("/previous-investigations-any", function() {
    filterClasses('filter-prev-inv-any');

    ignoreFilter = true;
    charts.dc.filterAll();
    ignoreFilter = true;
    charts.prevInv.filter(charts.dc.filters.RangedFilter(1, Infinity));
    charts.dc.redrawAll();
  });

  finch.route("/previous-investigations", function() {
    filterClasses('filter-prev-inv');

    ignoreFilter = true;
    charts.dc.filterAll();
    ignoreFilter = true;
    charts.prevInv.filter(charts.dc.filters.RangedFilter(3, Infinity));
    charts.dc.redrawAll();
  });

  finch.route("/no-weapons", function() {
    filterClasses('filter-no-weapons');

    ignoreFilter = true;
    charts.dc.filterAll();
    ignoreFilter = true;
    charts.cod.filter('Blunt force trauma');
    ignoreFilter = true;
    charts.cod.filter('Suffocation');
    charts.dc.redrawAll();
  });

  finch.route("/paramours", function() {
    filterClasses('filter-paramours');

    ignoreFilter = true;
    charts.dc.filterAll();
    ignoreFilter = true;
    charts.prevRem.filter('Yes');
    charts.dc.redrawAll();
  });

  finch.listen();

});
