window.jQuery = window.$ = $ = require('jquery');
require('imagesloaded');

var Slider = require('./lib/slider'),
    ChildPopup = require('./views/child-popup'),
    AAS = require('./lib/aas');

$(function() {

  // Open Twitter links in a new window
  $('.sider-twitter').on('click', 'a', function(e) {
    e.preventDefault();
    var url = $(this).attr('href');
    window.open(url, "_blank", "width=555, height=520");
  });

  // Setup sliders
  $('.slider').each(function(i, el) {
    $(el).imagesLoaded()
      .always(function() {
        new Slider(el);
      });
  });

  // Populate the collection and setup the child popups
  $.getJSON('data/cps-reports.json', function(data) {
    AAS.children.reset(data);

    $('.child-link').each(function(i, el) {
      var id = $(el).data('id');
      var popup = new ChildPopup({
        model: AAS.children.get(id),
        el: el
      });
      popup.render();
    });
  });

});
