var Child = (function(Backbone, moment) {

  var Child = Backbone.Model.extend({

    initialize: function(attributes) {
      this.set('dod', moment(attributes.dod));
    },

    defaults: {
      'selected': true
    }

  });

  return Child;

}(Backbone, moment));
