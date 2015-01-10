require('./bundles/story');

$(function() {

  // Fade in headers
  $('#missed-signs').animate({opacity: 1}, function() {
    $('#fatal-consequences').delay(550).animate({opacity: 1}, function() {
      $('#how').delay(550).animate({opacity: 1});
    });
  });

});
