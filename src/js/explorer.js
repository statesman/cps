var $ = require('jquery');

    window.finch = require('../../bower_components/finchjs/finch').Finch;
    window.charts = require('./explorer/charts')(setup);

function setup() {

  finch.route("/", function() {
    var intro = $('.intro');
    intro.find('a').on('click', function(e) {
      e.preventDefault();
      $('.explorer-header').show();
      intro.slideUp();
      $(".fade-in").animate({
        opacity: 1
      });
    });

    charts.dc.filterAll();
    charts.dc.redrawAll();
  });

  finch.route("/previous-removals", function() {
    $('body').addClass('explorer-active');

    charts.prevInv.filter(charts.dc.filters.RangedFilter(3, 10));
    charts.dc.redrawAll();
  });

  finch.listen();

}
