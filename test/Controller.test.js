import Model from '../src/mvc/model/Model';
import View from '../src/mvc/view/View';
import Controller from '../src/mvc/controller/Controller';
import $ from 'jquery';
global.$ = global.jQuery = $;

describe('controller', () => {
  const model = new Model({
    min: 0,
    max: 100,
    step: 1,
    valueLeft: 0,
    valueRight: 75,
    isVertical: false,
    isLabel: true,
    isScale: true,
    isDouble: true,
  });

  const element = $('<div class = "test"></div>')

  const view = new View(element, model);
  const controller = new Controller(model, view);

  describe('init():', () => {
    test('defined', () => {
      expect(controller.init).toBeDefined();
    })
    test('start', () => {
      controller.init();
      expect(view.init).toBeDefined();
      expect(view.render).toBeDefined();
    })
  })

})