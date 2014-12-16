var Handlebars = require('handlebars'),
    _ = require('underscore');

/*
 * Generate <li> nav links, intelligently adding the active class, URLs, etc.
 *
 * @type: optional string
 */
module.exports = function(type) {
  var err = this.options.grunt.log.error || console.error;

  // Make sure nav is an array
  if(!_.isArray(this.options.nav)) {
    err('generator.TASK.options.nav in the Gruntfile must be an array to use the subNavLinks helper.');
    return null;
  }

  var activeSubnav = null;
  var links = '';

  // Figure out which subnav (if any) to use. Start by checking to-level els
  _.each(this.options.nav, function(el) {

    // If this the current pages is a top-level element with a subnav, expand
    // its subnav
    if(el.file === this.name) {
      if(_.has(el, 'children')) {
        activeSubnav = el.children;
      }
    }

  }, this);

  // If that didn't work, check child els for a match
  if(activeSubnav === null) {
    _.each(this.options.nav, function(el) {

      // If this nav tree has child navs, check to see if one matches our
      // current page
      if(_.has(el, 'children')) {
        _.each(el.children, function(child) {
          if(child.file === this.name) {
            activeSubnav = el.children;
          }
        }, this);
      }

    }, this);
  }

  // Then, if we found a match, create the subnav
  if(activeSubnav !== null) {
    _.each(activeSubnav, function(child) {
      // Make sure the page exists
      if(!_.has(this.pages, child.file)) {
        err('The subNavLinks helper can\'t find a matching page for %s', child.file);
        return;
      }

      // Make sure all required fields are present
      if(!_.has(child, 'title')) {
        err('The subNavLinks helper requires title for each object in the children array.');
        return
      }

      links += '<li' + (child.file === this.name ? ' class="active"' : '') + '><a href="' + child.file + '.html">' + child.title + '</a></li>';
    }, this);
  }

  return new Handlebars.SafeString(links);
};
