import Model from '../src/mvc/model/Model';
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

  const { min,
    max,
    step,
    valueLeft,
    valueRight,
    isVertical,
    isLabel,
    isScale,
    isDouble } = settings;

  const outerState = {
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
      expect(model.settings.min).toEqual(model.settings.max + 1)
    });

    test('valueLeft >= valueRight ', () => {

      model.settings.valueLeft = 76;
      model.checkSettings(75);
      expect(model.settings.valueRight).toEqual(model.settings.valueLeft)

      model.settings.valueLeft = 76;
      model.checkSettings(76);
      expect(model.settings.valueLeft).toEqual(model.settings.valueRight)
    });

    test('isDouble', () => {

      model.settings.isDouble = false;
      model.checkSettings();
      expect(model.settings.valueLeft).toEqual(model.settings.min)

    });

  });

  describe('setState', () => {

    test('setStateForLeftInput', () => {
      const value = 30
      model.setStateForLeftInput(value);
      expect(model.state.valueLeft).toBe(value)
    })

    test('setStateForRightInput', () => {
      const value = 60
      model.setStateForRightInput(value);
      expect(model.state.valueRight).toBe(value)
    })

    test('setStateForInput', () => {
      let valueScale = 20
      model.setStateForInput(valueScale);
      expect(model.settings.valueLeft).toBe(valueScale)

      valueScale = 80
      model.setStateForInput(valueScale);
      expect(model.settings.valueRight).toBe(valueScale);
    })

    test('setStateForInput isDouble = false', () => {
      model.settings.isDouble = false
      const valueScale = 50
      model.setStateForInput(valueScale);
      expect(model.settings.valueRight).toBe(valueScale)
    })
  })
})

