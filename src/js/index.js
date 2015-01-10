require('./bundles/story');

var _ = require('underscore');

$(function() {

  // Fade in headers
  $('#missed-signs').addClass('animated fadeInDown');
  window.setTimeout(function() {
    $('#fatal-consequences').addClass('animated fadeInUp');
  }, 650);
  window.setTimeout(function() {
    $('#how').addClass('animated fadeIn');
  }, 1300);

});
