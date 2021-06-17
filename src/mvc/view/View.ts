import {
  IView, IRender, IScale, ISlider,
} from './interface';
import Scale from './subView/Scale';
import Slider from './subView/Slider';

export default class View implements IView {
  target: JQuery;
  inputLeft: JQuery;
  inputRight: JQuery;
  scale: IScale;
  slider: ISlider;
  synchronizationLeft?: JQuery;
  synchronizationRight?: JQuery;

  constructor(target: JQuery) {
    this.target = target;
    this.inputLeft = $('<input type="range" id="input-left">');
    this.inputRight = $('<input type="range" id="input-right">');
    this.scale = new Scale();
    this.slider = new Slider();
  }

  init(): void {
    this.target.append('<div class="multi-range-slider"></div>');
    this.target.find('.multi-range-slider').append(this.inputLeft);
    this.target.find('.multi-range-slider').append(this.inputRight);
    this.target.find('.multi-range-slider').append(this.slider.slider);
    this.slider.slider.append(this.scale.scale);

    this.target.css({
      transformOrigin: 'bottom left',
      margin: '32px 0px',
      width: '100%',
    });
  }

  render(modelDate: IRender): void {
    const {
      isVertical,
      min,
      max,
      step,
      isScale,
      isLabel,
      isDouble,
      valueLeft,
      percentageLeft,
      valueRight,
      percentageRight,
    } = modelDate;

    this.renderVertical(isVertical);
    this.changeAttrInput(min, max, step);

    this.scale.renderScale(min, max, isScale);

    this.slider.doubleSlider(isDouble);
    this.slider.renderText(isLabel, isDouble);

    this.renderThumbLeft(isDouble, min, valueLeft, percentageLeft);
    this.renderThumbRight(isVertical, valueRight, percentageRight);
  }

  renderVertical(isVertical: boolean): void {
    this.slider.verticalSlider(isVertical);
    this.scale.verticalScale(isVertical);

    if (isVertical) {
      this.target.css({
        transform: 'rotate(-90deg)',
        margin: '32px 30px 0px',
      });
    } else {
      this.target.css({
        transform: 'rotate(0deg)',
        margin: '32px  0px',
      });
    }
  }

  changeAttrInput(min: number, max: number, step: number): void {
    this.inputLeft.attr('min', min);
    this.inputLeft.attr('max', max);
    this.inputLeft.attr('step', step);

    this.inputRight.attr('min', min);
    this.inputRight.attr('max', max);
    this.inputRight.attr('step', step);
  }

  setSynchronizationLeft(left: JQuery) {
    this.synchronizationLeft = left;
  }
  setSynchronizationRight(right: JQuery) {
    this.synchronizationRight = right;
  }

  renderThumbLeft(isDouble: boolean, min: number, valueLeft: number, percentageLeft: number): void {
    this.slider.renderThumbLeft(valueLeft, percentageLeft);

    if (isDouble) {
      this.inputLeft.attr('value', valueLeft);
    } else {
      this.inputLeft.attr('value', min);
    }

    if (this.synchronizationLeft) {
      this.synchronizationLeft.val(valueLeft);
    }
  }

  renderThumbRight(isVertical: boolean, valueRight: number, percentageRight: number): void {
    this.slider.renderThumbRight(isVertical, valueRight, percentageRight);
    this.inputRight.attr('value', valueRight);

    if (this.synchronizationRight) {
      this.synchronizationRight.val(valueRight);
    }
  }
}
