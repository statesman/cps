require('./bundles/story');

var _ = require('underscore');

$(function() {

  // Fade in headers
  $('#missed-signs').addClass('animated fadeInDown');
  window.setTimeout(function() {
    $('#fatal-consequences').addClass('animated fadeInUp');
  }, 750);

  // Slowly bring in children
  /*
  $('.children-step-1').addClass('animated fadeIn');
  window.setTimeout(function() {
    $('.children-step-2').addClass('animated fadeIn');
  }, 400);
  window.setTimeout(function() {
    $('.children-step-3').addClass('animated fadeIn');
  }, 800);
  window.setTimeout(function() {
    $('.children-step-4').addClass('animated fadeIn');
  }, 1200);
  */

  // Fade everything away on scroll
  $(window).one('scroll', function() {
    $('#overview-text').addClass('animated fadeIn');
    $('#child-wrapper').addClass('animated fadeOut');
    $('#scroll-prompt').addClass('animated fadeOutDown');
  });

  var childrenEl = $('#child-wrapper');

  function rand() {
    return (Math.random() * 100).toString() + '%';
  }

  function placeChild() {
    $('<i class="fa fa-child"></i>')
      .css('left', rand())
      .css('top', rand())
      .addClass(function() {
        return 'children-depth-' + _.random(1, 5).toString();
      })
      .addClass(function() {
        return 'children-step-' + _.random(1, 4).toString();
      })
      .addClass(function() {
        if(Math.random() >= 0.5) {
          return 'girl';
        }
        return 'boy';
      })
      .appendTo(childrenEl);
  }

  //_.times(400, placeChild);

});
