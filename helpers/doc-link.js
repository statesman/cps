var Handlebars = require('handlebars');

/*
* Create a link that will be turned into a link to a note in a DocumentCloud document
*
* @doc: the document ID, with any URL extras #p18, #p18/ad8731, etc.
*/
module.exports = function(doc, options) {
  var link = '<a class="doc-link" target="_blank" href="docs.html?doc=' + doc + '">' + options.fn(this) + '</a>';
  return new Handlebars.SafeString(link);
};
