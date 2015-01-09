var Highcharts = require('../lib/highcharts'),
    AAS = require('../lib/aas'),
    Backbone = require('backbone');

new (Backbone.View.extend({

  initialize: function() {
    // Render the chart once the data are loaded
    this.collection.on('reset', this.render, this);
  },

  render: function() {
    // Format data for
    var counts = this.collection.chain()
      .countBy(function(model) {
        var labels = {
          yes: 'Solved',
          no: 'Unsolved',
          pending: 'Pending',
          'records unavailable': 'Records unavailable'
        };
        return labels[model.get('justice')];
      })
      .omit("undefined")
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
