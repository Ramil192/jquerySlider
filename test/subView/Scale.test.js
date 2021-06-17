import Scale from '../../src/mvc/view/subView/Scale';
import $ from 'jquery';
global.$ = global.jQuery = $;

describe('Scale', () => {
  const scale = new Scale();

  test('renderScale()', () => {
    const min = 0;
    const max = 100;
    const isScale = false;

    scale.renderScale(min, max, isScale)

    expect(scale.scale[0].innerHTML).toBe('<span></span><span></span><span></span><span></span><span></span>');

  })
})