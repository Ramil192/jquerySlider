import View from './View/View';
import Model from './Model/Model';
import Controller from './Controller/Controller';
import { INewSettings } from './Model/interface';

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

    const view = new View($(this));

    const controller = new Controller(model, view);

    function main() {
      controller.init();
    }

    $(this).data().setSettings = function (newSettings: INewSettings): void {
      const arr: Array<[string, number | boolean]> = Object.entries(newSettings) as Array<[string, number | boolean]>;

      arr.forEach(([key, value]) => {
        model.settings[key] = value;
      });

      model.checkSettings();
    };

    $(this).data().synchronizationLeft = function (inputLeft: JQuery<HTMLElement>): void {
      view.setSynchronizationLeft(inputLeft);
    };

    $(this).data().synchronizationRight = function (inputRight: JQuery<HTMLElement>): void {
      view.setSynchronizationRight(inputRight);
    };

    return this.each(main);
  };
}(jQuery));
