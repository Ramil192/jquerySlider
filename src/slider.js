import View from './mvc/view/View'
import Model from './mvc/model/Model'
import Controller from './mvc/controller/Controller'


(function ($) {
  $.fn.inputRange = function (options) {

    let settings = $.extend({
      min: 0,
      max: 100,
      step: 1,
      valueLeft: 25,
      valueRight: 75,
      isVertical: false,
      isLabel: true,
      isScale: true,
      isDouble: true,
    }, options);

    function main() {
      const model = new Model(settings)
      const view = new View($(this),model)
      const controller = new Controller(model, view)
      view.init();
      view.render();
      controller.init();
    }
    return this.each(main);
  };
})(jQuery)

$(function () {
  $('.test').inputRange();

})
