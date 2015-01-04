window.jQuery = window.$ = require('jquery');

require('../lib/navbar');

var imagesLoaded = require('imagesloaded'),
    Slider = require('../lib/slider'),
    ChildPopup = require('../views/child-popup'),
    AAS = require('../lib/aas');

AAS.children.on('reset', function() {
  $('.child-link').each(function(i, el) {
    var id = $(el).data('id');
    var popup = new ChildPopup({
      model: AAS.children.get(id),
      el: el
    });
    popup.render();
  });
});

$(function() {

  // Open Twitter links in a new window
  $('.sider-twitter').on('click', 'a', function(e) {
    e.preventDefault();
    var url = $(this).attr('href');
    window.open(url, "_blank", "width=555, height=520");
  });

  // Setup sliders
  $('.slider').each(function(i, el) {
    imagesLoaded(el, function() {
      new Slider(el);
    });
  });

});
