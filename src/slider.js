import View from './mvc/view'

(function ($) {
  $.fn.inputRange = function (options) {

    let settings = $.extend({
      min: -100,
      max: 500,
      step: 1,
      valueLeft: 25,
      valueRight: 75,
      isVertical: false,
      isLabel: true,
      isScale: true,
      isDouble: true,
    }, options);

    function main (){
      const view = new View(this)
      view.init();
    }
    return this.each(main);
  };
})(jQuery)

$(function(){
  $('.test').inputRange();
})
