var Handlebars = require('handlebars');

/*
 * A block helper that wraps a chart in all the necessary elements
 */
module.exports = function(title, source, options) {
  var link = '<div class="chart chart-right">'
    + '<h3 class="chart-title">' + title + '</h3>'
    + options.fn(this)
    + '<p class="source">Source: ' + source + '</p>'
    + '</div>';
  return new Handlebars.SafeString(link);
};
