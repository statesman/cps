var Handlebars = require('handlebars'),
    fs = require('fs');

/*
* Print the hero for whichever helper is specified in the page's hero setting
* in the frontmatter.
*/
module.exports = function(context) {
  if(typeof context.data.root.page.hero === "undefined") {
    return;
  }

  var src = fs.readFileSync(__dirname + '/../partials/hero-' + context.data.root.page.hero + '.hbs', 'utf8');
  var html = (new Handlebars.compile(src))(context.data.root);
  return new Handlebars.SafeString(html);
};
