require('../../../bower_components/bootstrap/js/tooltip');
require('../../../bower_components/bootstrap/js/popover');

var Backbone = require('backbone'),
    JST = require('../../../build/templates');

Backbone.$ = window.jQuery;

var ChildPopup = Backbone.View.extend({

  // Setup an open/close button
  initialize: function() {
    // Enable the close button on child popovers
    this.$el.one('shown.bs.popover', $.proxy(this.closeHandler, this));
  },

  // Manually open/close the Bootstrap popup
  events: {
    'click': function(e) {
      e.preventDefault();
      // Open/close on click, allowing mobile users to easily close the popup
      // if it's open
      this.$el.popover('toggle');
    }
  },

  template: JST.childpopup,

  // Setup routine for the popover's close button
  closeHandler: function() {
    // Get the popover that's attached to our el
    var popover = this.$el.data()['bs.popover'].$tip;
    // Bind a close event to its close button
    popover.on('click', '.popover-close', $.proxy(function(e) {
      e.preventDefault();
      this.$el.popover('hide');
    }, this));
  },

  render: function() {
    // Setup the popup here using Bootstrap
    this.$el.popover({
      title: this.model.get('name') + '<a href="#" class="pull-right popover-close"><i class="fa fa-times-circle"></i></a>',
      content: $.proxy(function() {
        return this.template(this.model.toJSON());
      }, this),
      trigger: 'manual',
      html: true,
      placement: 'auto',
      template: '<div class="popover popover-child" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    });
    return this;
  }

});

module.exports = ChildPopup;
