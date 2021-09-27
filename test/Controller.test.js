import $ from 'jquery';
import Model from '../src/mvc/Model/Model';
import View from '../src/mvc/View/View';
import Controller from '../src/mvc/Controller/Controller';

window.$ = $;

describe('controller', () => {
  const model = new Model({
    min: 0,
    max: 100,
    step: 1,
    valueLeft: 25,
    valueRight: 75,
    isVertical: false,
    isLabel: true,
    isScale: true,
    isDouble: true,
  });

  const element = $('<div class = "test"></div>');
  const view = new View(element);

  const controller = new Controller(model, view);

  describe('Controller', () => {
    test('init Controller', () => {
      controller.init();

      expect(model.observers.length).toBe(1);
      expect(view.observers.length).toBe(1);
    });

    test('ViewActionTypes.LEFT', () => {
      view.handlerInputLeft();
      expect(model.settings.valueLeft).toBe(25);
    });

    test('ViewActionTypes.RIGHT', () => {
      view.handlerInputRight();
      expect(model.settings.valueRight).toBe(75);
    });

    test('ViewActionTypes.SCALE', () => {
      const click = $.Event('click');
      view.scale.scale.trigger(click);
      expect(model.settings.valueLeft).toBe(25);
    });
  });
});
