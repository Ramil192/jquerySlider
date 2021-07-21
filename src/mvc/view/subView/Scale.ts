import { IScale } from '../interface';

class Scale implements IScale {
  public scale: JQuery;

  constructor() {
    this.scale = $('<div class="scale"></div>');
    this.insulation();
  }

  public renderScale(min: number, max: number, isScale: boolean): void {
    const scaleNumber = Math.abs((min - max) / 4);

    this.scale.children('span').each((index, e) => {
      if (isScale) {
        if (index === 0) {
          e.innerHTML = (min).toString();
        } else if (index === 4) {
          e.innerHTML = (max).toString();
        } else {
          e.innerHTML = (+min + scaleNumber * index).toString();
        }
      } else {
        e.innerHTML = '';
      }
    });
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
    this.scale.append('<span></span>');
    this.scale.append('<span></span>');
    this.scale.append('<span></span>');
    this.scale.append('<span></span>');
    this.scale.append('<span></span>');
  }
}

export default Scale;
