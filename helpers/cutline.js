var Handlebars = require('handlebars');

/*
 * Create a caption with credit
 *
 * @caption: optional string
 * @credit: optional string
 *
 * @return: HTML for the caption or an empty string if @caption and @credit are falsy
 */
module.exports = function(caption, credit) {
  var wrapCredit = function(credit) {
    return '<em class="pull-right">' + credit + '</em>';
  };

  if(caption && credit) {
    caption += ' ' + wrapCredit(credit);
  }
  else if(!caption && credit) {
    caption = wrapCredit(credit);
  }
  else if(!caption && !credit) {
    return null;
  }

  return new Handlebars.SafeString('<p class="caption clearfix">' + caption + '</p>');
};
