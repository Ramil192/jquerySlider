import View from './view/View';
import Model from './model/Model';
import Controller from './controller/Controller';
import { INewSettings } from './model/interfacel';

(function ($) {
  $.fn.pluginRange = function (options) {
    const settings = $.extend({
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

    const model = new Model(settings);
    model.checkSettings();

    const view = new View($(this));
    const controller = new Controller(model, view);

    function main() {
      controller.init();
    }

    $(this).data().setSettings = function (newSettings:INewSettings):void {
      const prevLeft = model.settings.valueLeft;
      const prevRight = model.settings.valueRight;
      model.settings = { ...model.settings, ...newSettings };
      model.checkSettings(prevLeft, prevRight);
      view.render({ ...model.settings, ...model.state });
    };

    $(this).data().synchronizationLeft = function (inputLeft:JQuery):void {
      view.setSynchronizationLeft(inputLeft);
    };
    $(this).data().synchronizationRight = function (inputRight:JQuery):void {
      view.setSynchronizationRight(inputRight);
    };

    return this.each(main);
  };
}(jQuery));
