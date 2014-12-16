var Slider = (function($, _) {

  var Slider = function(el) {
    // Save the $ version of the slider element
    this.$el = $(el);

    // And save $ versions of the actual slider and the controls div
    this.$slider = this.$el.find('.slider-content');
    this.$controls = this.$el.find('.slider-controls');

    // Store $ versions of the SlidesJS's prev/next controls, so we can simulate
    // clicks on them to trigger prev/next
    this.$prev = this.$slider.find('.slidesjs-previous');
    this.$next = this.$slider.find('.slidesjs-next');

    // The <span> with the current slide number, which we'll update on changes
    this.$pos = this.$controls.find('.slider-pos');

    // Calculate the slider height
    var dimensions = this._getSlideSize(this.$slider.children());

    // Init the slider
    var self = this;
    this.$slider.slidesjs({
      width: dimensions.width,
      height: dimensions.height,
      navigation: {
        active: false,
        effect: "fade"
      },
      pagination: {
        active: false
      },
      callback: {
        complete: function(number) {
          self.$pos.text(number);
        }
      }
    });

    // When our prev/next buttons are clicked, trigger a click on SlidesJS's
    // buttons
    this.$controls
      .on('click', '.next', $.proxy(this.next, this))
      .on('click', '.previous', $.proxy(this.previous, this));

    // On (debounced) window resize, check the max content dimensions again and
    // resize the SlidesJS containers accordingly
    $(window).resize(_.debounce(function() {
      var dimensions = self._getSlideSize(self.$slider.find('.slidesjs-slide'));
      self.$slider.find('.slidesjs-container').outerHeight(dimensions.height);
    }, 150));
  };

  // Go to the previous slide
  Slider.prototype.previous = function(e) {
    e.preventDefault();
    this.$prev.trigger('click');
  };

  // Go to the next slide
  Slider.prototype.next = function(e) {
    e.preventDefault();
    this.$next.trigger('click');
  };

  // An internal function to get the maximum dimensions of the passed set of
  // elements
  Slider.prototype._getSlideSize = function(els) {
    var maxes = [];
    els.each(function(i, el) {
      maxes.push($(el).outerHeight());
    });
    var maxHeight = _.max(maxes);

    var maxWidth = this.$el.outerWidth();

    return {
      width: maxWidth,
      height: maxHeight
    };
  };

  return Slider;

}(jQuery, _));
