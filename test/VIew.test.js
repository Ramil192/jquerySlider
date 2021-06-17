import View from '../src/mvc/view/View';
import Model from '../src/mvc/model/Model';
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

  model.checkSettings();

  const element = $('<div class = "test"></div>')
  const view = new View(element);

  describe('init() :', () => {

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

  describe('renderVertical() isVertical=true', () => {
    view.renderVertical(true);
    expect(view.target.css('transform')).toEqual('rotate(-90deg)');
    expect(view.target.css('margin')).toEqual('32px 30px 0px');
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
      const {isDouble,min,valueLeft}=model.settings
      const {percentageLeft}=model.state
      view.renderThumbLeft(isDouble,min,valueLeft,percentageLeft);
      expect(view.inputLeft.attr('value')).toEqual(min+'');
    })
    
  })
  describe('renderThumbRight() ', () => {
    
    test('renderThumbRight() isDouble = false', () => {
      view.synchronizationRight = $('<input>').attr({type: 'number'});
      const {isVertical,valueRight}=model.settings
      const {percentageRight}=model.state
      view.renderThumbRight(isVertical,valueRight,percentageRight);
      expect(view.synchronizationRight.val()).toEqual(valueRight+'');
    })

  })
  
})