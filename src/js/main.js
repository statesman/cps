(function($, Slider, Children, ChildPopup) {

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

    // Setup the collection and make it available globally
    $.getJSON('data.json', function(data) {
      var children = new Children(data);

      $('.child-link').each(function(i, el) {
        var id = $(el).data('id');
        var popup = new ChildPopup({
          model: children.get(id),
          el: el
        });
        popup.render();
      });
    });

  });

}(jQuery, Slider, Children, ChildPopup));
