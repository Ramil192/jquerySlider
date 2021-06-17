import { ISlider } from '../interface';

class Slider implements ISlider {
  slider: JQuery;
  track: JQuery;
  range: JQuery;
  thumbLeft: JQuery;
  thumbRight: JQuery;
  textLeft: JQuery;
  textRight: JQuery;

  constructor() {
    this.slider = $('<div class="slider"></div>');
    this.track = $('<div class="track"></div>');
    this.range = $('<div class="range"></div>');
    this.thumbLeft = $('<div class="thumb left"></div>');
    this.thumbRight = $('<div class="thumb right"></div>');
    this.textLeft = $('<span class="text left"></span>');
    this.textRight = $('<span class="text right"></span>');

    this.insulation();
  }

  insulation() {
    this.slider.append(this.track);
    this.slider.append(this.range);
    this.slider.append(this.thumbLeft);
    this.slider.append(this.thumbRight);
    this.slider.append(this.textLeft);
    this.slider.append(this.textRight);
  }

  renderText(isLabel: boolean, isDouble: boolean): void {
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

  verticalSlider(isVertical: boolean) {
    if (isVertical) {
      this.textLeft.css({
        transform: 'rotate(90deg) translate(-5px, -25px)',
      });

      this.textRight.css({
        transform: 'rotate(90deg) translate(-5px, -25px)',
      });
    } else {
      this.textLeft.css({
        transform: 'rotate(0deg) translate(-23px, 0px)',
      });

      this.textRight.css({
        transform: 'rotate(0deg) translate(0px, 0px)',
      });
    }
  }

  doubleSlider(isDouble: boolean) {
    if (isDouble) {
      this.thumbLeft.show();
      this.textLeft.show();
    } else {
      this.range.css({ left: `${0}%` });
      this.thumbLeft.hide();
      this.textLeft.hide();
    }
  }

  renderThumbLeft(valueLeft: number, percentageLeft: number): void {
    this.thumbLeft.css({ left: `${percentageLeft}%` });
    this.range.css({ left: `${percentageLeft}%` });
    this.textLeft.css({ right: `${95 - percentageLeft}%` });
    this.textLeft.html(`${valueLeft}`);
  }

  renderThumbRight(isVertical: boolean, valueRight: number, percentageRight: number): void {
    this.thumbRight.css({ right: `${100 - percentageRight}%` });
    this.range.css({ right: `${100 - percentageRight}%` });
    if (isVertical) {
      this.textRight.css({ right: `${97 - percentageRight}%` });
    } else {
      this.textRight.css({ right: `${101 - percentageRight}%` });
    }
    this.textRight.html(`${valueRight}`);
  }
}

export default Slider;
