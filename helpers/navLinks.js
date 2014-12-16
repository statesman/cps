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
    err('generator.TASK.options.nav in the Gruntfile must be an array to use the navLinks helper.');
    return null;
  }

  var links = '';

  // Loop through all of the nav objects ...
  _.each(this.options.nav, function(el) {

    // Make sure the page exists
    if(!_.has(this.pages, el.file)) {
      err('The navLinks helper can\'t find a matching page for ' + el.file);
      return;
    }

    // Make sure all required fields are present
    if(!_.has(el, 'title')) {
      err('The navLinks helper requires name for each object in the nav array.');
      return
    }

    var linktext = '';
    if(type === 'super') {
      linktext = '<strong>' + el.title + '</strong><br />';
      if(_.has(el, 'subtitle')) {
        linktext += el.subtitle
      }
    }
    else {
      linktext = el.title;
    }

    links += '<li' + (el.file === this.name ? ' class="active"' : '') + '><a href="' + el.file + '.html">' + linktext + '</a></li>';

  }, this);

  return new Handlebars.SafeString(links);
};
