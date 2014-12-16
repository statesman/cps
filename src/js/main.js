(function($, Slider, CallTime) {

  "use strict";

  $(function() {

    // Open Twitter links in a new window
    $('.sider-twitter').on('click', 'a', function(e) {
      e.preventDefault();
      var url = $(this).attr('href');
      window.open(url, "_blank", "width=555, height=520");
    });

    // Show the chapters when they're expanded on mobile
    $('.navbar-expand').on('click', function(e) {
      e.preventDefault();
      var elId = $(this).data('target');
      $(elId).toggleClass('hidden-navbar-collapsed');
    });

    // Setup sliders
    $('.slider').each(function(i, el) {
      $(el).imagesLoaded()
        .always(function() {
          new Slider(el);
        });
    });

    var calltime = new CallTime('#call-time');

  });

}(jQuery, Slider, CallTime));
