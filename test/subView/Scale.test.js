import Scale from '../../src/mvc/View/subView/Scale/Scale';
import $ from 'jquery';
global.$ = global.jQuery = $;

describe('Scale', () => {
  const scale = new Scale();

  test('renderScale()', () => {
    const min = 0;
    const max = 100;
    const isScale = false;

    scale.renderScale(min, max, isScale);

    expect(scale.scale[0].innerHTML).toBe(`<span class="range-slider__scale-item">${min}</span>
    <span class="range-slider__scale-item">
    </span><span class="range-slider__scale-item">
    </span><span class="range-slider__scale-item">
    </span><span class="range-slider__scale-item">${max}</span>`);
  });

  test('renderScale()', () => {
    scale.verticalScale(false);
    expect(scale.scale.children('span').css('transform')).toEqual('rotate(0deg)');
  })
})