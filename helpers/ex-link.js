var Handlebars = require('handlebars');

/*
* Create a link that will be turned into a link to slice from the data explorer
*
* @doc: the slice to link to
*/
module.exports = function(slice, options) {
  var link = '<a class="explorer-link" target="_blank" href="explorer.html#/' + slice + '">' + options.fn(this) + '</a>';
  return new Handlebars.SafeString(link);
};
