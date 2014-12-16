var Handlebars = require('handlebars'),
    _ = require('underscore');

/*
 * Generate a link to a social network's share window, with the corresponding
 * FontAwesome icon. If no URL is passed, the current page is used.
 *
 * @network: string
 * @url: optional string
 */
module.exports = function(network) {
  var err = this.options.grunt.log.error || console.error;

  if(_.isUndefined(network)) {
    err('network is required for the socialShareUrl helper');
    return;
  }

  // Make sure baseUrl is set so we can actually calculate the URL
  if(!_.has(this.options, 'base')) {
    err('The share helper requires grunt.generator.TASK.options.base to be set');
    return;
  }

  // Generate a URL to the current page
  var url = this.options.base;
  if(this.name !== 'index') {
    url += this.name + '.html';
  }

  var networks = {
    facebook: {
      url: function() {
        return 'https://www.facebook.com/sharer.php?u=' + encodeURIComponent(url);
      },
      icon: '<i class="fa fa-facebook-square"></i>'
    },
    twitter: {
      url: function() {
        return 'https://twitter.com/intent/tweet?url=' + encodeURIComponent(url) + '&related=@statesman';
      },
      icon: '<i class="fa fa-twitter"></i>'
    },
    gplus: {
      url: function() {
        return 'https://plus.google.com/share?url=' + encodeURIComponent(url);
      },
      icon: '<i class="fa fa-google-plus"></i>'
    }
  };

  if(!_.has(networks, network)) {
    err('Unrecognized social network in socialShareUrl helper: %s', network);
    return null;
  }

  return new Handlebars.SafeString(
    '<a target="_blank" href="' + networks[network].url() + '">' + networks[network].icon + '</a>'
  );
};
