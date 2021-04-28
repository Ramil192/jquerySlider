import InputLeft from "./InputLeft"
import InputRight from "./InputRight"
import Track from "./Track"
import Range from "./Range"
import ThumbLeft from "./ThumbLeft"
import ThumbRight from "./ThumbRight"
import TextLeft from "./TextLeft"
import TextRight from "./TextRight"
import Scale from "./Scale"

export default class View {

  constructor(target, model) {
    this.model = model;
    this.target = target;
    this.inputLeft = new InputLeft();
    this.inputRight = new InputRight();
    this.track = new Track();
    this.range = new Range();
    this.thumbLeft = new ThumbLeft();
    this.thumbRight = new ThumbRight();
    this.textLeft = new TextLeft();
    this.textRight = new TextRight();
    this.scale = new Scale();
  }

  init() {
    this.target.append('<div class="multi-range-slider"></div>');
    $('.multi-range-slider').append(this.inputLeft.input);
    $('.multi-range-slider').append(this.inputRight.input);
    $('.multi-range-slider').append('<div class="slider"></div>');
    $('.slider').append(this.track.init());
    $('.slider').append(this.range.rangeDiv);
    $('.slider').append(this.thumbLeft.thumbDiv);
    $('.slider').append(this.thumbRight.thumbDiv);
    $('.slider').append(this.textLeft.textSpan);
    $('.slider').append(this.textRight.textSpan);
    $('.slider').append(this.scale.divScale);
    this.model.changeInputLeft
  }

  render() {
    const { isVertical, isLabel, isScale, min, max, } = this.model.settings
    this.target.css({
      'position': 'relative',
      'transform-origin': 'bottom left',
    });

    if (!isLabel) {
      this.textLeft.textSpan.css({ 'opacity': '0' });
      this.textRight.textSpan.css({ 'opacity': '0' });
    }

    if (isScale) {
      let scaleNumber = Math.abs((min - max) / 4);
      this.scale.divScale.append(`<span>${min}</span>`);
      this.scale.divScale.append(`<span>${min > 0 ? min - scaleNumber : min + scaleNumber}</span>`);
      this.scale.divScale.append(`<span>${min > 0 ? min - scaleNumber * 2 : min + scaleNumber * 2}</span>`);
      this.scale.divScale.append(`<span>${min > 0 ? min - scaleNumber * 3 : min + scaleNumber * 3}</span>`);
      this.scale.divScale.append(`<span>${max}</span>`);
    }

    if (isVertical) {

      this.target.css({
        'transform': 'rotate(-90deg)',
      });

      this.textLeft.textSpan.css({
        'transform': 'rotate(90deg) translate(-5px,24px)',
      });
      this.textRight.textSpan.textSpan.css({
        'transform': 'rotate(90deg) translate(-5px, -15px)',
      });

      $('.scale span').css({
        'transform': 'rotate(90deg) translate(0px,3px)',
      });
    }

    this.renderThumbLeft();
    this.renderThumbRight();

  }

  renderThumbLeft() {
    const { isDouble } = this.model.settings;
    const { valueLeft ,percentageLeft } = this.model.state;
    
    if (isDouble) {
      this.thumbLeft.thumbDiv.css({ 'left': percentageLeft + '%' });
      this.range.rangeDiv.css({ 'left': percentageLeft + '%' });
      this.textLeft.textSpan.css({ 'right': (85 - percentageLeft) + '%' });
      this.textLeft.textSpan.html(valueLeft);
    } else {
      this.range.rangeDiv.css({ 'left': 0 + '%' });
      this.textLeft.textSpan.hide();
      this.thumbLeft.thumbDiv.hide();
    }
  }
  renderThumbRight(){
    const { valueRight,percentageRight } = this.model.state;
    this.thumbRight.thumbDiv.css({ 'right': (100 - percentageRight) + '%' });
    this.range.rangeDiv.css({ 'right': (100 - percentageRight) + '%' })
    this.textRight.textSpan.css({ 'right': (101 - percentageRight) + '%' })
    this.textRight.textSpan.html(valueRight);
  }

}
