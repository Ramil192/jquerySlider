import $ from 'jquery';
import Model from '../src/mvc/Model/Model';

window.$ = $;

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
  };

  const model = new Model({ ...settings });

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
    valueLeft,
    valueRight,
    percentageLeft: 25,
    percentageRight: 75,
  };

  describe('checkSettings', () => {
    afterEach(() => {
      model.settings = { ...settings };
    });

    test('check settings', () => {
      expect(model.settings).toEqual(settings);
    });

    test('check state', () => {
      model.checkSettings();
      expect(model.state).toEqual(outerState);
    });

    test('min >= max ', () => {
      model.settings.min = 101;
      model.checkSettings();
      expect(model.settings.min).toEqual(model.settings.max - 1);

      model.settings.min = -5;
      model.settings.max = -10;
      model.checkSettings();
      expect(model.settings.min).toEqual(model.settings.max - 1);
    });

    test('min > valueRight min <=0 ', () => {
      model.settings.min = -5;
      model.settings.valueRight = -6;
      model.checkSettings();
      expect(model.settings.valueRight).toEqual(model.settings.min - 1);
    });

    test('max < valueLeft max >=0 ', () => {
      model.settings.max = 50;
      model.settings.valueLeft = 51;
      model.checkSettings();
      expect(model.settings.valueLeft).toEqual(model.settings.max - 1);
    });

    test('valueLeft >= valueRight ', () => {
      model.settings.valueLeft = 76;
      model.checkSettings();
      expect(model.settings.valueRight).toEqual(model.settings.valueLeft + 1);
    });

    test('isDouble', () => {
      model.settings.isDouble = false;

      model.checkSettings();
      expect(model.settings.valueLeft).toEqual(model.settings.min);
    });
  });

  describe('setState', () => {
    test('setStateLeft', () => {
      const obj = {
        valueLeft: 30,
        fromLeftEdge: 30,
        width: 5,
      };

      model.setStateLeft(obj);
      expect(model.state.valueLeft).toBe(obj.valueLeft);
    });

    test('setStateRight', () => {
      const obj = {
        valueRight: 60,
      };

      model.setStateRight(obj);
      expect(model.state.valueRight).toBe(obj.valueRight);
    });

    test('setStateLeftOrRight', () => {
      const obj = {
        valueTarget: 20,
      };

      model.setStateLeftOrRight(obj);
      expect(model.settings.valueLeft).toBe(obj.valueTarget);

      obj.valueTarget = 80;
      model.setStateLeftOrRight(obj);
      expect(model.settings.valueRight).toBe(obj.valueTarget);
    });
  });

  describe('getNewValueForState', () => {
    beforeAll(() => {
      model.settings = { ...settings };
    });

    test('getNewValueForState(100)', () => {
      const obj = {
        percent: 100,
      };

      model.getNewValueForState(obj);
      expect(model.settings.valueRight).toBe(100);
    });

    test('getNewValueForState(70)', () => {
      const obj = {
        percent: 70,
      };

      model.getNewValueForState(obj);
      expect(model.settings.valueRight).toBe(70);
    });

    test('getNewValueForState(70)', () => {
      const obj = {
        percent: 5,
      };

      model.getNewValueForState(obj);
      expect(model.settings.valueLeft).toBe(5);
    });
  });

  describe('setStateRight', () => {
    afterAll(() => {
      model.settings = { ...settings };
    });

    const obj = {
      valueRight: 96,
    };

    test('setStateRight isPenultimate', () => {
      model.settings.step = 6;
      model.setStateRight(obj);
      expect(model.state.newStepRight).toBe(0);
    });

    test('setStateRight isPenultimate next max and prev step', () => {
      obj.valueRight = 97;
      model.setStateRight(obj);
      expect(model.state.valueRight).toBe(model.settings.max);
      expect(model.settings.valueRight).toBe(model.settings.max);

      obj.valueRight = 99;
      model.setStateRight(obj);
      expect(model.state.valueRight).toBe(model.state.penultimateValue);
      expect(model.settings.valueRight).toBe(model.state.penultimateValue);

      obj.valueRight = 95;
      model.setStateRight(obj);
      expect(model.state.valueRight).toBe(model.state.penultimateValue - model.settings.step);
      expect(model.settings.valueRight).toBe(model.state.penultimateValue - model.settings.step);
    });
  });
});
