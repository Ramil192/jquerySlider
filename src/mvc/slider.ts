import View from './view/View'
import Model from './model/Model'
import Controller from './controller/Controller'
import {IObj} from './model/interfaceForModel'

(function ($) {

  $.fn.pluginRange = function (options) {

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

    const model = new Model(settings)

    model.checkSettings();
    const view = new View($(this), model)
    const controller = new Controller(model, view)

    function main() {
      controller.init();
    }

    $(this).data().setSettings = function (obj:IObj) {

      const prevLeft = model.settings.valueLeft;
      const prevRight = model.settings.valueRight;

      model.settings = { ...model.settings, ...obj }
      model.checkSettings(prevLeft,prevRight);
      view.render();
    }


    return this.each(main);
  };
})(jQuery)



