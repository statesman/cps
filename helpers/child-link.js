var Handlebars = require('handlebars');

/*
 * Create a link that will be turned into a trigger for a Bootstrap popover
 * with info from the db about a child
 *
 * @param id: the ID of the child's model within the Backbone collection
 */
module.exports = function(id, options) {
  var link = '<a class="child-link" href="#" data-id="' + id + '">' + options.fn(this) + '</a>';
  return new Handlebars.SafeString(link);
};
