import Slider from '../../src/mvc/view/subView/Slider/Slider';
import $ from 'jquery';
global.$ = global.jQuery = $;

describe('Slider', () => {
  let slider = '';

  slider = new Slider();
  let isLabel = false;
  let isDouble = false;
  let isVertical = false;

  test('renderText(false,false)', () => {
    slider.renderText(isLabel, isDouble);

    expect(slider.textLeft.css('display')).toBe('none');
    expect(slider.textRight.css('display')).toBe('none');
  })

  test('renderText(true,true)', () => {
    isLabel = true;
    isDouble = true;
    slider.renderText(isLabel, isDouble);

    expect(slider.textLeft.css('display')).toBe('');
    expect(slider.textRight.css('display')).toBe('');
  })

  test('doubleSlider', () => {
    isDouble = false;

    slider.doubleSlider(isDouble);

    expect(slider.range.position().left).toBe(0);
    expect(slider.textLeft.css('display')).toBe('none');
    expect(slider.thumbLeft.css('display')).toBe('none');
  })

  test('verticalSlider', () => {

    slider.verticalSlider(isVertical);

    expect(slider.textLeft.css('transform')).toBe('rotate(0deg) translate(-10px, 0px)');
    expect(slider.textRight.css('transform')).toBe('rotate(0deg) translate(13px, 0px)');
  })


})