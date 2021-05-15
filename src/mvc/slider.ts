import View from './view/View'
import Model from './model/Model'
import Controller from './controller/Controller'


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
    const view = new View($(this), model)

    function main() {

      const controller = new Controller(model, view)
      controller.init();
    }

    $(this).data().setMin = function (min) {
      model.setMin(min);
      view.renderScale();
      view.renderThumbRight();
      view.renderThumbLeft();
    }
    
    $(this).data().setMax = function (max) {
      model.setMax(max);
      view.renderScale();
      view.renderThumbRight();
      view.renderThumbLeft();
    }
    
    $(this).data().setValueLeft = function (value) {
      model.setValueLeft(value);
      view.renderThumbLeft();
    }

    $(this).data().setValueRight = function (value) {
      model.setValueRight(value);
      view.renderThumbRight();
    }


    $(this).data().setStep = function (value) {
      model.setStep(value);
      view.inputRight.input.attr('step',value);
      view.inputLeft.input.attr('step',value);
    }

    $(this).data().setIsLabel = function (flag) {
      model.setIsLabel(flag);
      view.renderText();
    }

    $(this).data().setIsScale = function (flag) {
      model.setIsScale(flag);
      view.renderScale();
    }

    $(this).data().setIsDouble = function (flag) {
      model.setIsDouble(flag);
      view.renderThumbLeft();
    }

    $(this).data().setIsVertical = function (flag) {
      model.setIsVertical(flag);
      view.renderVertical();
    }

    return this.each(main);
  };
})(jQuery)



