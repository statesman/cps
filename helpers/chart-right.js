var Handlebars = require('handlebars');

/*
 * A block helper that wraps a chart in all the necessary elements
 */
module.exports = function(title, source, options) {
  var link = '<div class="chart chart-right clearfix">'
    + '<h3 class="chart-title">' + title + '</h3>'
    + '<p class="source">Source: ' + source + '</p>'
    + options.fn(this)
    + '</div>';
  return new Handlebars.SafeString(link);
};
