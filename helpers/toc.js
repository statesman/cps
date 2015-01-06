var Handlebars = require('handlebars'),
    _ = require('underscore'),
    fs = require('fs');

/*
* Print the hero for whichever helper is specified in the page's hero setting
* in the frontmatter.
*/
module.exports = function(part, image, context) {

  // Get the context (the navs for the passed part)
  var selected = _.findWhere(context.data.root.options.nav, {title: part});

  // Figure out if it's the active subnav
  var activeSubnav = false;
  _.each(selected.children, function(el) {
    if(el.file === context.data.root.name && !activeSubnav) {
      activeSubnav = true;
    }
  }, this);

  // Hydrate the nav items with frontmatter data
  _.each(selected.children, function(navItem, i) {
    selected.children[i].pageData = context.data.root.pages[navItem.file];
    var url = navItem.file + '.html';
    if(activeSubnav) {
      url += '#skip-hero';
    }
    selected.children[i].url = url;
  });

  // Get the template
  var src = fs.readFileSync(__dirname + '/../partials/toc-section.hbs', 'utf8');

  // Render the markup
  var html = (new Handlebars.compile(src))(selected);
  return new Handlebars.SafeString(html);
};
