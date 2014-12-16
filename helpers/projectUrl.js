var _ = require('underscore');

/*
 * When passed a filename, generate a link to an asset within the project's
 * public directory. Prints a URL to the current page if a filename isn't passed.
 *
 * @filename: optional string
 */
module.exports = function(filename) {
  var err = this.options.grunt.log.error || console.error;

  // Make sure baseUrl is set so we can actually calculate the URL
  if(!_.has(this.options, 'base')) {
    err('The url helper requires grunt.generator.TASK.options.base to be set');
    return;
  }

  // If a filename wasn't passed, generate a URL to the current page
  if(_.isObject(filename)) {
    if(this.name === 'index') {
      filename = '';
    }
    else {
      filename = this.name + '.html';
    }
  }

  return this.options.base + filename;
};
