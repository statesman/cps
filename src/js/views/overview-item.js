var Backbone = require('backbone'),
    Detail = require('./detail'),
    JST = require('../../../build/templates');

Backbone.$ = window.jQuery;

var OverviewItem = Backbone.View.extend({

  initialize: function() {
    this.model.on('change:selected', this.render, this);
  },

  events: {
    'mouseenter': 'showDetails'
  },

  tagName: 'span',

  template: JST['explorer-marker'],

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },

  showDetails: function() {
    var detail = new Detail({
      el: '#details',
      model: this.model
    });
    detail.render();
  }

});

module.exports = OverviewItem;
