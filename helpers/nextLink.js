var Handlebars = require('handlebars'),
    _ = require('underscore');

module.exports = function(nextPage, skipHero) {
  var pageMeta = _.findWhere(this.pages, {name: nextPage});

  var link = '<a href="' + nextPage + '.html' + (skipHero ? '#skip-hero' : '') + '">' + pageMeta.title + '</a>';

  return new Handlebars.SafeString('<div class="well well-sm next-story"><strong>Next:</strong> ' + link + '</div>');
}
