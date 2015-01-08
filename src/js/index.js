require('./bundles/story');

var _ = require('underscore');

$(function() {

  // Fade in headers
  $('#missed-signs').addClass('animated fadeInDown');
  window.setTimeout(function() {
    $('#fatal-consequences').addClass('animated fadeInUp');
  }, 750);

  // Fade in images
  window.setTimeout(function() {
    $('#image-1').addClass('animated fadeInRight');
    $('#image-2').addClass('animated fadeIn');
    $('#image-3').addClass('animated fadeInLeft');
  }, 1150);

  // Fade everything away on scroll
  $(window).one('scroll', function() {
    if($(window).width() > 480) {
      $('.image-pack').addClass('animated fadeOut');
    }
    $('#overview-text').addClass('animated fadeIn');
    $('#scroll-prompt').addClass('animated fadeOutDown');
  });

});
