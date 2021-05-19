import View  from'../src/mvc/view/View';
import Model  from'../src/mvc/model/Model';
import $ from 'jquery';
global.$ = global.jQuery = $;

describe('View', () => {
  const model = new Model({
    min: 0,
    max: 100,
    step: 1,
    valueLeft: 10,
    valueRight: 75,
    isVertical: true,
    isLabel: false,
    isScale: true,
    isDouble: true,
  })

  const element = $('<div class = "test"></div>')
  const view = new View(element, model);
  const { isLabel, isScale, isVertical } = model.settings;

  describe('init() :', () => {

    test('defined', () => {
      expect(view.init).toBeDefined();
    })

    test('get elements', () => {
      view.init();
      expect(element.find('.multi-range-slider')).toHaveLength(1);
      expect(element.find('#input-left')).toHaveLength(1);
      expect(element.find('#input-right')).toHaveLength(1);
      expect(element.find('.slider')).toHaveLength(1);
      expect(element.find('.track')).toHaveLength(1);
      expect(element.find('.range')).toHaveLength(1);
      expect(element.find('.thumb.left')).toHaveLength(1);
      expect(element.find('.thumb.right')).toHaveLength(1);
      expect(element.find('.text.left')).toHaveLength(1);
      expect(element.find('.text.right')).toHaveLength(1);
      expect(element.find('.scale')).toHaveLength(1);
    })

  })

  describe('render () :', () => {
    test('defined', () => {
      expect(view.render).toBeDefined();
    })
    test('start', () => {
      view.render();

      expect(element.css('position')).toBe('relative');
      expect(element.css('transform-origin')).toBe('bottom left');

      if (!isLabel) {
        expect(view.textLeft.textSpan.css('display')).toBe('none');
        expect(view.textRight.textSpan.css('display')).toBe('none');
      }

      if (isScale) {
        expect(view.scale.divScale.find('span').length).toBe(5);
      }

      if (isVertical) {
        expect(element.css('transform')).toBe('rotate(-90deg)');
        expect(view.textLeft.textSpan.css('transform')).toBe('rotate(90deg)');
        expect(view.scale.divScale.children('span').css('transform')).toBe('rotate(90deg) translate(0px,3px)');
      }
      expect(view.renderThumbLeft).toBeDefined();
      expect(view.renderThumbRight).toBeDefined();
    })
  })

  describe('renderThumbLeft () :', () => {

    test('defined', () => {
      expect(view.renderThumbLeft).toBeDefined();
    })

    test('start', () => {

      view.renderThumbLeft();
      expect(view.textLeft.textSpan.text()).toBe(model.state.valueLeft + '');

      model.settings.isDouble = false;

      view.renderThumbLeft();
      expect(view.textLeft.textSpan.css('display')).toBe('none');
      expect(view.thumbLeft.thumbDiv.css('display')).toBe('none');

    })
  })

  describe('renderThumbRight() :', () => {
    test('defined', () => {
      expect(view.renderThumbRight).toBeDefined();
    })

    test('start', () => {
      view.renderThumbRight();
      expect(view.textRight.textSpan.text()).toBe(model.state.valueRight + '');
    })
  })
})