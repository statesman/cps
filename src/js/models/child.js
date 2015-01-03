var Backbone = require('../lib/backbone'),
    moment = require('moment');

var Child = Backbone.Model.extend({

  initialize: function(attributes) {
    this.set('dod', moment(attributes.dod));
  },

  defaults: {
    'selected': true
  }

});

module.exports = Child;
