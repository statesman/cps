var CallTime = (function($) {

  var CallTime = function(el) {
    this.$el = $(el);
    this.$time = this.$el.find('.time').find('span');
    this.$progress = this.$el.find('.progress-bar');
    this.$el.on('click', '.btn', $.proxy(this.start, this));

    this.max = 60 * 5.7;
  };

  CallTime.prototype.update = function() {
    var now = new Date(),
        diff = Math.round((now - this.startTime) / 1000);

    if(diff > this.max) {
      this.finish();
    }
    else {
      var seconds = (diff % 60).toString();
      if(seconds.length == 1) {
        seconds = "0" + seconds;
      }
      var minutes = (Math.floor(diff / 60)).toString();

      this.$time.text(minutes + ':' + seconds);
      this.$progress.width((diff / this.max * 100).toString() + '%');
    }
  };

  CallTime.prototype.startTimer = function() {
    this.startTime = new Date().valueOf();
    var self = this;
    this.timer = setInterval(function() {self.update();}, 1000);
  };

  CallTime.prototype.start = function(e) {
    e.preventDefault();
    this.$el.find('.counter').css('opacity', '1');
    this.startTimer();
  };

  CallTime.prototype.finish = function() {
    clearInterval(this.timer);
    alert('Done!');
  };

  return CallTime;

}(jQuery));
