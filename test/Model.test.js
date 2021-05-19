import  Model from '../src/mvc/model/Model';
import $ from 'jquery';
global.$ = global.jQuery = $;

describe('Model', () => {
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

  const { min, max, step, valueLeft, valueRight, isVertical, isLabel, isScale, isDouble } = model.settings;


  const inputL = $(`<input type="range" id="input-left" min=${min} max=${max} value=${valueLeft} step=${step}>`);
  const inputR = $(`<input type="range" id="input-left" min=${min} max=${max} value=${valueRight} step=${step}>`);

  describe('constructor', () => {
    test('check valueLeft', () => {
      expect(valueLeft).toBeGreaterThanOrEqual(min)
      expect(valueLeft).toBeLessThanOrEqual(max)
    });
    test('check valueRight', () => {
      expect(valueRight).toBeGreaterThanOrEqual(min)
      expect(valueRight).toBeLessThanOrEqual(max)
    });
  });

  describe('getPercentage :', () => {
    test('to be defined', () => {
      expect(model.getPercentage).toBeDefined();
    });
    
    test('get valueLeft', () => {
      expect(model.getPercentage(valueLeft)).toBeGreaterThanOrEqual(0);
      expect(model.getPercentage(valueLeft)).toBeLessThanOrEqual(100);
    });
    test('get valueRight', () => {
      expect(model.getPercentage(valueRight)).toBeGreaterThanOrEqual(0);
      expect(model.getPercentage(valueRight)).toBeLessThanOrEqual(100);
    });
    test('getPercentage(value) return value', () => {
      expect(model.getPercentage(50)).not.toBeUndefined();
      expect(model.getPercentage(50)).not.toBeNull();
    });
    
  });
  
  describe('state change:', () => {
    test('input left ', () => {
      model.changeInputLeft(inputL, valueRight);
      expect(model.state.valueLeft).toBe(+inputL.val());
    })
    test('input right ', () => {
      model.changeInputRight(inputR, valueLeft);
      expect(model.state.valueRight).toBe(+inputR.val());
    })
  })
  
  describe('scaleClick :', () => {
    expect(model.scaleClick).toBeDefined();
    // не знаю как получить event как аргумент для функций  scaleClick(event )
  })
})

