/*
 * A bar chart with a breakdown of causes of death
 */
(function(AAS, Backbone) {

  "use strict";

  new (Backbone.View.extend({

    initialize: function() {
      // Render the chart once the data are loaded
      this.collection.on('reset', this.render, this);
    },

    render: function() {
      this.$el.highcharts({
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
    }
  }))({
    el: '#causes-of-death',
    collection: AAS.children
  });

}(AAS, Backbone));
