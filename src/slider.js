import View from './mvc/view/View'
import Model from './mvc/model/Model'
import Controller from './mvc/controller/Controller'


(function ($) {
  $.fn.inputRange = function (options) {

    let settings = $.extend({
      min: -100,
      max: 100,
      step: 10,
      valueLeft: -100,
      valueRight: -10,
      isVertical: false,
      isLabel: true,
      isScale: true,
      isDouble: true,
    }, options);


    function main() {
      const model = new Model(settings)
      const view = new View($(this), model)
      const controller = new Controller(model, view)
      controller.init();
    }

    return this.each(main);

  };
})(jQuery)

$(function () {
  $('.test').inputRange();
  $('.test1').inputRange();
  $('#test2').inputRange();
})
