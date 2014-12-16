var Handlebars = require('handlebars'),
    marked = require('marked'),
    _ = require('underscore');

/*
 * Render a passed string from markdown to HTML
 */
module.exports = function(options) {
  // Loop over each line and get rid of the white space
  var cleaned = _.map(options.fn(this).split('\n'), function(line) {
    return line.trim();
  });
  text = marked(cleaned.join('\n'));
  return new Handlebars.SafeString(text);
};
