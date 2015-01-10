var Handlebars = require('handlebars'),
    _ = require('underscore');

/*
* A helper to print a next story link
*/
module.exports = function(context) {
  var children = [];
  _.each(context.data.root.options.nav, function(nav) {
    if(typeof nav.children !== "undefined") {
      children = children.concat(nav.children);
    }
  });

  var storyLink;
  var match = false;
  var current = context.data.root.name;
  _.each(children, function(child, i) {
    if(match === true) {
      storyLink = '<a href="' + child.file + '.html">' + child.pageData.title + '</a>';
      match = false;
    }
    if(child.file === current) {
      match = true;
    }
  });

  return new Handlebars.SafeString('<p class="next-story"><strong>Next story:</strong> ' + storyLink + '</p>');
};
