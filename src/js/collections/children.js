var Backbone = require('backbone'),
    Child = require('../models/child'),
    _ = require('underscore');

Backbone.$ = window.jQuery;

var Children = Backbone.Collection.extend({

  model: Child,

  filterClear: function() {
    _.each(this.models, function(model) {
      model.set('selected', true);
    });
    this.trigger('filtered');
  },

  filterBy: function(field, value) {
    _.each(this.models, function(model) {
      if(model.get(field) === value) {
        model.set('selected', true);
      }
      else {
        model.set('selected', false);
      }
    });
    this.trigger('filtered');
  },

  filterByRange: function(field, minVal, maxVal) {
    _.each(this.models, function(model) {
      var val = model.get(field);
      if(val >= minVal && val <= maxVal) {
        model.set('selected', true);
      }
      else {
        model.set('selected', false);
      }
    });
    this.trigger('filtered');
  }

});

module.exports = Children;
