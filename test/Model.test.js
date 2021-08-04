import Model from '../src/mvc/Model/Model';
import View from '../src/mvc/View/View';
import Observer from '../src/mvc/Observer/Observer';
import $ from 'jquery';
global.$ = global.jQuery = $;

describe('Model', () => {

  const settings = {
    min: 0,
    max: 100,
    step: 1,
    valueLeft: 25,
    valueRight: 75,
    isVertical: false,
    isLabel: true,
    isScale: true,
    isDouble: true,
  }

  const model = new Model({ ...settings });
  const observerRender = new Observer();

  const element = $('<div class = "test"></div>');
  const view = new View(element);

  observerRender.addObserver(view.render.bind(view));
  model.setObserver(observerRender);

  const {
    valueLeft,
    valueRight,
  } = settings;

  const outerState = {
    isPenultimate: false,
    isPenultimateValue: false,
    isSmooth: false,
    newStepRight: 1,
    penultimateValue: 0,
    valueLeft: valueLeft,
    valueRight: valueRight,
    percentageLeft: 25,
    percentageRight: 75,
  }

  describe('checkSettings', () => {

    afterEach(() => {
      model.settings = { ...settings };
    });

    test('check settings', () => {
      expect(model.settings).toEqual(settings)
    });

    test('check state', () => {
      model.checkSettings();
      expect(model.state).toEqual(outerState)
    });

    test('min >= max ', () => {
      model.settings.min = 101;
      model.checkSettings();
      expect(model.settings.min).toEqual(model.settings.max - 1)

      model.settings.min = -5;
      model.settings.max = -10;
      model.checkSettings();
      expect(model.settings.min).toEqual(model.settings.max - 1)
    });

    test('valueLeft >= valueRight ', () => {
      model.settings.valueLeft = 76;
      model.checkSettings();
      expect(model.settings.valueRight).toEqual(model.settings.valueLeft+1)

    });

    test('isDouble', () => {
      model.settings.isDouble = false;

      model.checkSettings();
      expect(model.settings.valueLeft).toEqual(model.settings.min)

    });

  });

  describe('setState', () => {
    test('setStateLeft', () => {
      const obj = {
        valueLeft: 30
      }

      model.setStateLeft(obj);
      expect(model.state.valueLeft).toBe(obj.valueLeft)
    })

    test('setStateRight', () => {
      const obj = {
        valueRight: 60
      }

      model.setStateRight(obj);
      expect(model.state.valueRight).toBe(obj.valueRight)
    })

    test('setStateLeftOrRight', () => {
      const obj = {
        value: 20
      }

      model.setStateLeftOrRight(obj);
      expect(model.settings.valueLeft).toBe(obj.value)

      obj.value = 80
      model.setStateLeftOrRight(obj);
      expect(model.settings.valueRight).toBe(obj.value);
    })

  })

  describe('getNewValueForState', () => {
    beforeAll(() => {
      model.settings = { ...settings };
    });

    test('getNewValueForState()', () => {
      const obj = {
        width: 320,
        coordinatesX: 319
      }

      model.getNewValueForState(obj);
      expect(model.settings.valueRight).toBe(100);
    })
  })

  describe('setStateRight', () => {
    afterAll(() => {
      model.settings = { ...settings };
    });

    const obj ={
      valueRight:96
    }
    
    test('setStateRight isPenultimate', () => {
      model.settings.step = 6;
      model.setStateRight(obj);
      expect(model.state.newStepRight ).toBe(0);
    })

    test('setStateRight isPenultimate next max and prev step', () => {
      obj.valueRight=97;
      model.setStateRight(obj);
      expect(model.state.valueRight).toBe(model.settings.max);
      expect(model.settings.valueRight).toBe(model.settings.max);
      
      obj.valueRight=99;
      model.setStateRight(obj);
      expect(model.state.valueRight).toBe(model.state.penultimateValue);
      expect(model.settings.valueRight).toBe(model.state.penultimateValue);
      
      obj.valueRight=95;
      model.setStateRight(obj);
      expect(model.state.valueRight).toBe(model.state.penultimateValue-model.settings.step);
      expect(model.settings.valueRight).toBe(model.state.penultimateValue-model.settings.step);

    })
  })

})

