var Handlebars = require('handlebars'),
    fs = require('fs');

/*
* Insert a link to a script, but only if it exists
*
* @filename: the filename in the public/dist/ folder
*/
module.exports = function(filename) {
  var scriptPath = __dirname + '/../public/dist/' + filename + '.js';

  var exists = fs.existsSync(scriptPath);

  if(exists) {
    return new Handlebars.SafeString('<script src="dist/' + filename + '.js"></script>');
  }
  else {
    return new Handlebars.SafeString('<script src="dist/story-plain.js"></script>');
  }
};
