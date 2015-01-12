var Handlebars = require('handlebars');

/*
 * When passed the string of a story highlight, prints a Tweet icon that writes
 * a tweet with that text
 *
 * @text: string
 */
module.exports = function(text, context) {
  function intentUrl(t, u) {
    return 'https://twitter.com/intent/tweet' +
      '?text=' + encodeURIComponent(t) +
      '&url=' + encodeURIComponent(u) +
      '&hashtags=cpsmissedsigns' +
      '&via=aas_investigates' +
      '&related=statesman';
  }

  var pageUrl = context.data.root.options.base + context.data.root.name + '.html';

  return new Handlebars.SafeString(
    '<a target="_blank" href="' + intentUrl(text, pageUrl) + '"><i class="fa fa-twitter"></i></a>'
  );
};
