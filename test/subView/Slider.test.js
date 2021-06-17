import Slider from '../../src/mvc/view/subView/Slider';
import $ from 'jquery';
global.$ = global.jQuery = $;

describe('Slider', () => {
  let slider = '';
  
  beforeEach(() => {
    slider = new Slider();
  })

  test('renderText()', () => {
    const isLabel = false;
    const isDouble = false;
    slider.renderText(isLabel, isDouble);

    expect(slider.textLeft.css('display')).toBe('none');
    expect(slider.textRight.css('display')).toBe('none');
  })

  test('doubleSlider', () => {
    const isDouble = false;

    slider.doubleSlider(isDouble);
    expect(slider.range.position().left).toBe(0);
    expect(slider.textLeft.css('display')).toBe('none');
    expect(slider.thumbLeft.css('display')).toBe('none');
  })
})