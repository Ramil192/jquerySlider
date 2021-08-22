import { IScale } from '../../interface';

class Scale implements IScale {
  public scale: JQuery<HTMLElement>;

  constructor() {
    this.scale = $('<div class="range-slider__scale"></div>');
    this.insulation();
  }

  public renderScale(min: number, max: number, isScaleShow: boolean): void {
    const scaleNumber = Math.abs((min - max) / 4);

    this.scale.children('span').each((index, e) => {
      if (isScaleShow) {
        e.textContent = (min + scaleNumber * index).toString();
      } else {
        e.textContent = '';
      }
    });

    const lastElement = this.scale.children('span').length - 1;
    const firstElement = 0;

    this.scale.children('span')[firstElement].textContent = (min).toString();
    this.scale.children('span')[lastElement].textContent = (max).toString();
  }

  public verticalScale(isVertical: boolean): void {
    if (isVertical) {
      this.scale.children('span').css({
        transform: 'rotate(90deg)',
      });
    } else {
      this.scale.children('span').css({
        transform: 'rotate(0deg)',
      });
    }
  }

  private insulation(): void {
    this.scale.append('<span class="range-slider__scale-item"></span>');
    this.scale.append('<span class="range-slider__scale-item"></span>');
    this.scale.append('<span class="range-slider__scale-item"></span>');
    this.scale.append('<span class="range-slider__scale-item"></span>');
    this.scale.append('<span class="range-slider__scale-item"></span>');
  }
}

export default Scale;
