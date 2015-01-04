var Backbone = require('backbone'),
    OverviewItem = require('./overview-item');

Backbone.$ = window.jQuery;

var Overview = Backbone.View.extend({

  initialize: function() {
    this.collection.on('reset', this.render, this);
  },

  render: function() {
    this.collection.each(function(model) {
      var itemview = new OverviewItem({model: model});
      this.$el.append(itemview.render().el);
    }, this);
  }

});

module.exports = Overview;
