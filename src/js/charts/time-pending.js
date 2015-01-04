var Highcharts = require('../lib/highcharts'),
    AAS = require('../lib/aas'),
    Backbone = require('backbone'),
    moment = require('moment'),
    _ = require('underscore');

new (Backbone.View.extend({

  initialize: function() {
    // Render the chart once the data are loaded
    this.collection.on('reset', this.render, this);
  },

  render: function() {
    var now = moment("10-31-2014", "MM-DD-YYYY");

    var year_diffs = this.collection.chain()
      .filter(function(model) {
        return model.get('justice') === 'pending';
      })
      .countBy(function(model) {
        return now.diff(model.get('dod'), 'years');
      })
      .pairs()
      .map(function(el) {
        var label;
        if (el[0] === "0") {
          label = '< 1 year';
        }
        else {
          label = el[0] + '+ years';
        }
        return [label, el[1]];
      })
      .value();

    var cats = _.map(year_diffs, function(el) {
      return el[0];
    });

    var counts = _.map(year_diffs, function(el) {
      return el[1];
    });

    this.$el.highcharts({
      chart: {
        type: 'column'
      },
      title: {
        text: null
      },
      tooltip: {
        headerFormat: 'Cases pending<br />{point.key}: ',
        pointFormat: '<b>{point.y}</b>'
      },
      legend: {
        enabled: false
      },
      xAxis: {
        categories: cats
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Number of cases'
        }
      },
      series: [{
        name: 'Pending',
        data: counts
      }]
    });
  }

}))({
  collection: AAS.children,
  el: '#time-pending-chart'
});
