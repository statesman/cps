(function($) {

  // Show the chapters when they're expanded on mobile
  $('.navbar-expand').on('click', function(e) {
    e.preventDefault();
    var elId = $(this).data('target');
    $(elId).toggleClass('hidden-navbar-collapsed');
  });

}(jQuery));
