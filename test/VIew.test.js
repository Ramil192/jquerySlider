import $ from 'jquery';
import View from '../src/mvc/View/View';

window.$ = $;

describe('View', () => {
  const element = $('<div class = "test"></div>');
  const elementForTest = $('<input>').attr('type', 'number');
  const view = new View(element);

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
    });
  });

  describe('renderVertical() isVertical=true', () => {
    view.renderVertical(true);

    expect(view.target.css('transform')).toEqual('rotate(-90deg)');
    expect(view.target.css('margin')).toEqual('32px 52px 0px');

    view.renderVertical(false);

    expect(view.target.css('transform')).toEqual('rotate(0deg)');
    expect(view.target.css('margin')).toEqual('32px 0px');
  });

  describe('setSynchronizationLeft() ', () => {
    view.setSynchronizationLeft(elementForTest);
    expect(view.synchronizationLeft).toEqual(elementForTest);
  });

  describe('setSynchronizationRight() ', () => {
    view.setSynchronizationRight(elementForTest);
    expect(view.synchronizationRight).toEqual(elementForTest);
  });

  describe('renderThumbLeft() ', () => {
    test('renderThumbLeft() isDouble = false', () => {
      const isDouble = false;
      const min = 0;
      const valueLeft = 0;
      const percentageLeft = 0;

      view.renderThumbLeft(isDouble, min, valueLeft, percentageLeft);
      expect(view.inputLeft.val()).toEqual(String(min - 1));
    });
  });

  describe('renderThumbRight() ', () => {
    test('renderThumbRight() isDouble = false', () => {
      view.synchronizationRight = $('<input>').attr({ type: 'number' });

      const isVertical = false;
      const valueRight = 100;
      const percentageRight = 100;

      view.renderThumbRight(isVertical, valueRight, percentageRight);
      expect(view.synchronizationRight.val()).toEqual(String(valueRight));
    });
  });

  describe('doubleSlider', () => {
    test('doubleSlider(false)', () => {
      view.doubleSlider(false);

      expect(view.inputRight.css('pointerEvents')).toBe('all');
      expect(view.inputRight.css('zIndex')).toBe('5');
    });
  });

  describe('inputChange ', () => {
    test('inputLeft', () => {
      const input = $.Event('input');
      view.inputLeft.trigger(input);

      expect(view.inputLeft.val()).toBe('-1');
    });

    test('inputRight', () => {
      const input = $.Event('input');
      view.inputRight.trigger(input);

      expect(view.inputRight.val()).toBe('100');
    });
  });

  describe('scale ', () => {
    test('clickHandler', () => {
      const click = $.Event('click');
      view.scale.scale.trigger(click);

      expect(view.inputLeft.val()).toBe('-1');
      expect(view.inputRight.val()).toBe('100');
    });
  });

  describe('track ', () => {
    test('clickTrack', () => {
      const click = $.Event('click');
      view.slider.trackClick.trigger(click);

      expect(view.inputLeft.val()).toBe('-1');
      expect(view.inputRight.val()).toBe('100');
    });
  });

  describe('mouseenter ', () => {
    test('textLeft', () => {
      const mouseenter = $.Event('mouseenter');
      view.slider.textLeft.trigger(mouseenter);

      expect(view.inputLeft.css('top')).toBe('-24px');
    });

    test('textRight', () => {
      const mouseenter = $.Event('mouseenter');
      view.slider.textRight.trigger(mouseenter);

      expect(view.inputRight.css('top')).toBe('-24px');
    });

    test('textThumb', () => {
      const mouseenter = $.Event('mouseenter');
      view.slider.thumbLeft.trigger(mouseenter);

      expect(view.inputLeft.css('top')).toBe('0px');
    });

    test('textThumb', () => {
      const mouseenter = $.Event('mouseenter');
      view.slider.thumbRight.trigger(mouseenter);

      expect(view.inputRight.css('top')).toBe('0px');
    });
  });
});
