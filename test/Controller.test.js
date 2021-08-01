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

  const element = $('<div class = "test"></div>')
  const view = new View(element);

  const controller = new Controller(model, view);

  describe('init:', () => {

    controller.init();
    test('init Observer model', () => {
      expect(model.observerRender).toBeDefined();
    })

    test('init Observer view', () => {
      expect(view.observerControllerModelLeft).toBeDefined();
    })

    test('init Observer view', () => {
      expect(view.observerControllerModelRight).toBeDefined();
    })

    test('init Observer view', () => {
      expect(view.observerControllerModelScale).toBeDefined();
    })

    test('init Observer view', () => {
      expect(view.observerControllerModelTrack).toBeDefined();
    })

  })
})