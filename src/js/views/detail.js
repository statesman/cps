var Backbone = require('backbone'),
    JST = require('../../../build/templates');

Backbone.$ = window.jQuery;

var Detail = Backbone.View.extend({

  template: JST['explorer-detail'],

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }

});

module.exports = Detail;
