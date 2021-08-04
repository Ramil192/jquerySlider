import View from '../src/mvc/view/View';
import Model from '../src/mvc/model/Model';
import Observer from '../src/mvc/Observer/Observer';

import $ from 'jquery';
global.$ = global.jQuery = $;

describe('View', () => {
  const settings = {
    min: 0,
    max: 100,
    step: 1,
    valueLeft: 10,
    valueRight: 75,
    isVertical: true,
    isLabel: false,
    isScale: true,
    isDouble: true,
  }
  const model = new Model({ ...settings })
  const observerRender = new Observer();
  const observerModel = new Observer();

  const element = $('<div class = "test"></div>');
  const view = new View(element);

  observerRender.addObserver(view.render.bind(view));
  model.setObserver(observerRender);
  model.checkSettings();

  describe('init() :', () => {

    test('get elements', () => {
      expect(element.find('.range-slider')).toHaveLength(1);
      expect(element.find('.range-slider__input-left')).toHaveLength(1);
      expect(element.find('.range-slider__input-right')).toHaveLength(1);
      expect(element.find('.range-slider__body')).toHaveLength(1);
      expect(element.find('.range-slider__body-track')).toHaveLength(1);
      expect(element.find('.range-slider__body-range')).toHaveLength(1);
      expect(element.find('.range-slider__body-thumb-left')).toHaveLength(1);
      expect(element.find('.range-slider__body-thumb-right')).toHaveLength(1);
      expect(element.find('.range-slider__body-text-left')).toHaveLength(1);
      expect(element.find('.range-slider__body-text-right')).toHaveLength(1);
      expect(element.find('.range-slider__scale')).toHaveLength(1);
    })

  })

  describe('renderVertical() isVertical=true', () => {
    view.renderVertical(true);

    expect(view.target.css('transform')).toEqual('rotate(-90deg)');
    expect(view.target.css('margin')).toEqual('32px 52px 0px');

    view.renderVertical(false);

    expect(view.target.css('transform')).toEqual('rotate(0deg)');
    expect(view.target.css('margin')).toEqual('32px 0px');
  })

  describe('setSynchronizationLeft() ', () => {
    const element = $('<input>').attr('type', 'number');

    view.setSynchronizationLeft(element);
    expect(view.synchronizationLeft).toEqual(element);

  })

  describe('setSynchronizationRight() ', () => {
    const element = $('<input>').attr('type', 'number');

    view.setSynchronizationRight(element);
    expect(view.synchronizationRight).toEqual(element);

  })

  describe('renderThumbLeft() ', () => {

    test('renderThumbLeft() isDouble = false', () => {
      model.settings.isDouble = false;

      const { isDouble, min, valueLeft } = model.settings
      const { percentageLeft } = model.state

      view.renderThumbLeft(isDouble, min, valueLeft, percentageLeft);
      expect(view.inputLeft.attr('value')).toEqual(valueLeft + '');
    })

  })

  describe('renderThumbRight() ', () => {

    test('renderThumbRight() isDouble = false', () => {
      view.synchronizationRight = $('<input>').attr({ type: 'number' });

      const { isVertical, valueRight } = model.settings
      const { percentageRight } = model.state

      view.renderThumbRight(isVertical, valueRight, percentageRight);
      expect(view.synchronizationRight.val()).toEqual(valueRight + '');
    })

  })

  describe('setObserver() ', () => {

    test('Left', () => {
      view.setObserverLeft(observerModel);

      expect(view.observerControllerModelLeft).toEqual(observerModel);
    })

    test('Right', () => {
      view.setObserverRight(observerModel);

      expect(view.observerControllerModelRight).toEqual(observerModel);
    })

    test('Scale', () => {
      view.setObserverScale(observerModel);

      expect(view.observerControllerModelScale).toEqual(observerModel);
    })

    test('Track', () => {
      view.setObserverTrack(observerModel);

      expect(view.observerControllerModelTrack).toEqual(observerModel);
    })

  })

  describe('doubleSlider', () => {
    test('doubleSlider(false)', () => {
      view.doubleSlider(false);

      expect(view.inputRight.css('pointerEvents')).toBe('all');
      expect(view.inputRight.css('zIndex')).toBe('5');
    })
  })

  describe('inputChange ', () => {
    test('inputLeft', () => {
      const input = $.Event('input');
      view.inputLeft.trigger(input);

      expect(model.settings.valueLeft).toBe(model.settings.valueLeft);
    })

    test('inputRight', () => {
      const input = $.Event('input');
      view.inputRight.trigger(input);

      expect(model.settings.valueRight).toBe(model.settings.valueRight);
    })

  })

  describe('scale ', () => {
    test('clickHandler', () => {
      const click = $.Event('click');
      view.scale.scale.trigger(click);

      expect(model.settings.valueLeft).toBe(model.settings.valueLeft);
      expect(model.settings.valueRight).toBe(model.settings.valueRight);
    })
  })
  
  describe('track ', () => {
    test('clickTrack', () => {
      const click = $.Event('click');
      view.slider.trackClick.trigger(click);

      expect(model.settings.valueLeft).toBe(model.settings.valueLeft);
      expect(model.settings.valueRight).toBe(model.settings.valueRight);
    })
  })

  describe('mouseenter ', () => {
    test('textLeft', () => {
      const mouseenter = $.Event('mouseenter');
      view.slider.textLeft.trigger(mouseenter);

      expect(view.inputLeft.css('top')).toBe('-24px');
    })

    test('textRight', () => {
      const mouseenter = $.Event('mouseenter');
      view.slider.textRight.trigger(mouseenter);

      expect(view.inputRight.css('top')).toBe('-24px');
    })
    
    test('textThumb', () => {
      const mouseenter = $.Event('mouseenter');
      view.slider.thumbLeft.trigger(mouseenter);

      expect(view.inputLeft.css('top')).toBe('0px');
    })
    test('textThumb', () => {
      const mouseenter = $.Event('mouseenter');
      view.slider.thumbRight.trigger(mouseenter);

      expect(view.inputRight.css('top')).toBe('0px');
    })
    
  })

})