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
    valueLeft: 25,
    valueRight: 75,
    isVertical: false,
    isLabel: true,
    isScale: true,
    isDouble: true,
  });

  model.checkSettings();
  
  const element = $('<div class = "test"></div>')
  const view = new View(element);
  
  const controller = new Controller(model, view);

  describe('init():', () => {

    controller.init();

    test('inputLeft', () => {
      const input = $.Event('input');
      view.inputLeft.trigger(input);
      console.log(view.inputLeft.val());
      expect(model.settings.valueLeft).toBe(25);
    })
    
    test('inputRight', () => {
      const input = $.Event('input');
      view.inputRight.trigger(input);
      console.log(view.inputRight.val());
      expect(model.settings.valueRight).toBe(75);
    })
    
    test('scaleClick', () => {
      const click = $.Event('click');
      view.scale.scale.trigger(click);
      expect(model.settings.valueLeft).toBe(25);
      expect(model.settings.valueRight).toBe(75);
    })

  })
})