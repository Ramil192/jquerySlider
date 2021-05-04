const InputLeft = require ("./InputLeft")
const InputRight = require ("./InputRight")
const Track = require ("./Track")
const Range = require ("./Range")
const ThumbLeft = require ("./ThumbLeft")
const ThumbRight = require ("./ThumbRight")
const TextLeft = require ("./TextLeft")
const TextRight = require ("./TextRight")
const Scale = require ("./Scale")

module.exports = class View {

  constructor(target, model) {
    this.model = model;
    this.target = target;
    this.inputLeft = new InputLeft(this.model.settings.min, this.model.settings.max, this.model.settings.step, model.settings.valueLeft);
    this.inputRight = new InputRight(this.model.settings.min, this.model.settings.max, this.model.settings.step, model.settings.valueRight);
    this.track = new Track();
    this.range = new Range();
    this.thumbLeft = new ThumbLeft();
    this.thumbRight = new ThumbRight();
    this.textLeft = new TextLeft();
    this.textRight = new TextRight();
    this.scale = new Scale();
  }

  init() {
    const targetName = this.target.attr('class') ? '.' + this.target.attr('class') : '#' + this.target.attr('id')

    this.target.append('<div class="multi-range-slider"></div>');
    $(targetName).find('.multi-range-slider').append(this.inputLeft.input);
    $(targetName).find('.multi-range-slider').append(this.inputRight.input);
    $(targetName).find('.multi-range-slider').append('<div class="slider"></div>');
    $(targetName).find('.slider').append(this.track.init());
    $(targetName).find('.slider').append(this.range.rangeDiv);
    $(targetName).find('.slider').append(this.thumbLeft.thumbDiv);
    $(targetName).find('.slider').append(this.thumbRight.thumbDiv);
    $(targetName).find('.slider').append(this.textLeft.textSpan);
    $(targetName).find('.slider').append(this.textRight.textSpan);
    $(targetName).find('.slider').append(this.scale.divScale);
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
      this.textRight.textSpan.css({
        'transform': 'rotate(90deg) translate(-5px, -15px)',
      });
      this.scale.divScale.children('span').css({
        'transform': 'rotate(90deg) translate(0px,3px)',
      });
    }


    this.renderThumbLeft();
    this.renderThumbRight();

  }

  renderThumbLeft() {
    const { isDouble } = this.model.settings;
    const { valueLeft, percentageLeft } = this.model.state;

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
  renderThumbRight() {
    const { isVertical } = this.model.settings;
    const { valueRight, percentageRight } = this.model.state;
    this.thumbRight.thumbDiv.css({ 'right': (100 - percentageRight) + '%' });
    this.range.rangeDiv.css({ 'right': (100 - percentageRight) + '%' });

    if (isVertical) {
      this.textRight.textSpan.css({ 'right': (97 - percentageRight) + '%' });
    } else {
      this.textRight.textSpan.css({ 'right': (101 - percentageRight) + '%' });
    }

    this.textRight.textSpan.html(valueRight);
  }

}
