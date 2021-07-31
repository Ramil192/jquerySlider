import { ISlider } from '../../interface';

class Slider implements ISlider {
  public slider: JQuery<HTMLElement>;
  public track: JQuery<HTMLElement>;
  public trackClick: JQuery<HTMLElement>;
  public range: JQuery<HTMLElement>;
  public thumbLeft: JQuery<HTMLElement>;
  public thumbRight: JQuery<HTMLElement>;
  public textLeft: JQuery<HTMLElement>;
  public textRight: JQuery<HTMLElement>;

  constructor() {
    this.slider = $('<div class="range-slider__body"></div>');
    this.track = $('<div class="range-slider__body-track"></div>');
    this.trackClick = $('<div class="range-slider__body-track-click"></div>');
    this.range = $('<div class="range-slider__body-range"></div>');
    this.thumbLeft = $('<div class="range-slider__body-thumb-left"></div>');
    this.thumbRight = $('<div class="range-slider__body-thumb-right"></div>');
    this.textLeft = $('<span class="range-slider__body-text-left"></span>');
    this.textRight = $('<span class="range-slider__body-text-right"></span>');

    this.insulation();
  }

  public renderText(isLabel: boolean, isDouble: boolean): void {
    if (isLabel) {
      this.textRight.show();
    } else {
      this.textLeft.hide();
      this.textRight.hide();
    }

    if (isDouble && isLabel) {
      this.textLeft.show();
    }
  }

  public verticalSlider(isVertical: boolean): void {
    if (isVertical) {
      this.textLeft.css({
        transform: 'rotate(90deg) translate(0px, 7px)',
      });

      this.textRight.css({
        transform: 'rotate(90deg) translate(0px, -4px)',
      });
    } else {
      this.textLeft.css({
        transform: 'rotate(0deg) translate(-10px, 0px)',
      });

      this.textRight.css({
        transform: 'rotate(0deg) translate(13px, 0px)',
      });
    }
  }

  public doubleSlider(isDouble: boolean): void {
    if (isDouble) {
      this.thumbLeft.show();
      this.textLeft.show();
    } else {
      this.range.css({ left: `${0}%` });
      this.thumbLeft.hide();
      this.textLeft.hide();
    }
  }

  public renderThumbLeft(valueLeft: number, percentageLeft: number): void {
    this.thumbLeft.css({ left: `${percentageLeft}%` });
    this.range.css({ left: `${percentageLeft}%` });
    this.textLeft.css({ left: `${percentageLeft}%` });
    this.textLeft.html(`${valueLeft}`);
  }

  public renderThumbRight(isVertical: boolean, valueRight: number, percentageRight: number): void {
    this.thumbRight.css({ right: `${100 - percentageRight}%` });
    this.range.css({ right: `${100 - percentageRight}%` });

    if (isVertical) {
      this.textRight.css({ right: `${97 - percentageRight}%` });
    } else {
      this.textRight.css({ right: `${101 - percentageRight}%` });
    }

    this.textRight.html(`${valueRight}`);
  }

  private insulation(): void {
    this.slider.append(this.track);
    this.slider.append(this.trackClick);
    this.slider.append(this.range);
    this.slider.append(this.thumbLeft);
    this.slider.append(this.thumbRight);
    this.slider.append(this.textLeft);
    this.slider.append(this.textRight);
  }
}

export default Slider;
