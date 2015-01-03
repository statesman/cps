var $ = require('jquery'),
    Highcharts = require('../lib/highcharts'),
    AAS = require('../lib/aas'),
    Backbone = require('../lib/backbone');

new (Backbone.View.extend({

  initialize: function() {
    // Render the chart once the data are loaded
    this.collection.on('reset', this.render, this);
  },

  render: function() {
    // Format data for
    var counts = this.collection.chain()
      .countBy(function(model) {
        var justice = model.get('justice');
        return justice.substr(0,1).toUpperCase() + justice.substr(1);
      })
      .omit("")
      .pairs()
      .sortBy(function(el) {
        return -el[1];
      })
      .value();

    this.$el.highcharts({
      title: {
        text: null
      },
      tooltip: {
        headerFormat: '<b>{point.key}</b><br/>',
        pointFormat: '{point.y} ({point.percentage:.1f}%)'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false,
          },
          showInLegend: true
        }
      },
      series: [{
        type: 'pie',
        name: 'Number of cases',
        data: counts
      }]
    });
  }

}))({
  collection: AAS.children,
  el: '#no-justice-chart'
});
