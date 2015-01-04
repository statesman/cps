/*
 * A bar chart with a breakdown of causes of death, pulled from the children
 * Backbone collection
 */
 var AAS = require('../lib/aas'),
     Backbone = require('backbone'),
     _ = require('underscore');

require('../lib/highcharts');

new (Backbone.View.extend({

  initialize: function() {
    // Render the chart once the data are loaded
    this.collection.on('reset', this.render, this);
  },

  render: function() {
    // Total up the causes of death
    var totals = this.collection.chain()
    .countBy(function(model) {
      return model.get('cod');
    })
    .pairs()
    .sortBy(function(count) {
      return -count[1];
    })
    .value();

    // How many of the top causes to show
    var showTop = 10;

    // Separate the top from the other and format them for HC
    var cats = _.map(totals.slice(0, showTop), function(el) {
      return el[0];
    });
    cats.push('Other');

    var counts = _.map(totals.slice(0, showTop), function(el) {
      return el[1];
    });
    var otherCount = _.reduce(totals.slice(showTop), function(memo, key, val) {
      return memo + key[1];
    }, 0);
    counts.push(otherCount);

    this.$el.highcharts({
      chart: {
        type: 'bar'
      },
      title: {
        text: ''
      },
      legend: {
        enabled: false
      },
      xAxis: {
        categories: cats
      },
      series: [{
        data: counts,
        name: 'Number of deaths'
      }]
    });
  }
}))({
  el: '#causes-of-death',
  collection: AAS.children
});
