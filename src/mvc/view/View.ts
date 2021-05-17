import InputLeft from "./InputLeft";
import InputRight from "./InputRight";
import Track from "./Track";
import Range from "./Range";
import ThumbLeft from "./ThumbLeft";
import ThumbRight from "./ThumbRight";
import TextLeft from "./TextLeft";
import TextRight from "./TextRight";
import Scale from "./Scale";

import {
  IInputLeft,
  IInputRight,
  IRange,
  IScale,
  ITextLeft,
  ITextRight,
  IThumbLeft,
  IThumbRight,
  ITrack,
  IView
} from './interfaceForView'

import { IModel } from '../model/interfaceForModel'


export default class View implements IView {

  model: IModel
  target: any
  inputLeft: IInputLeft
  inputRight: IInputRight
  track: ITrack
  range: IRange
  thumbLeft: IThumbLeft
  thumbRight: IThumbRight
  textLeft: ITextLeft
  textRight: ITextRight
  scale: IScale

  constructor(target: any, model: IModel) {
    this.model = model;
    this.target = target;
    this.inputRight = new InputRight(this.model.settings.min, this.model.settings.max, this.model.settings.step, this.model.settings.valueRight);
    this.inputLeft = new InputLeft(this.model.settings.min, this.model.settings.max, this.model.settings.step, this.model.settings.valueLeft);
    this.track = new Track();
    this.range = new Range();
    this.thumbLeft = new ThumbLeft();
    this.thumbRight = new ThumbRight();
    this.textLeft = new TextLeft();
    this.textRight = new TextRight();
    this.scale = new Scale();
  }

  init(): void {
    this.target.append('<div class="multi-range-slider"></div>');
    this.target.find('.multi-range-slider').append(this.inputLeft.input);
    this.target.find('.multi-range-slider').append(this.inputRight.input);
    this.target.find('.multi-range-slider').append('<div class="slider"></div>');
    this.target.find('.slider').append(this.track.div);
    this.target.find('.slider').append(this.range.rangeDiv);
    this.target.find('.slider').append(this.thumbLeft.thumbDiv);
    this.target.find('.slider').append(this.thumbRight.thumbDiv);
    this.target.find('.slider').append(this.textLeft.textSpan);
    this.target.find('.slider').append(this.textRight.textSpan);
    this.target.find('.slider').append(this.scale.divScale);


    this.scale.divScale.append(`<span></span>`);
    this.scale.divScale.append(`<span></span>`);
    this.scale.divScale.append(`<span></span>`);
    this.scale.divScale.append(`<span></span>`);
    this.scale.divScale.append(`<span></span>`);

    this.target.css({
      'position': 'relative',
      'transform-origin': 'bottom left',
      'margin': '32px 0px',
    });

  }

  render(): void {
    this.renderScale();
    this.renderVertical();
    this.renderText();
    this.renderThumbLeft();
    this.renderThumbRight();
  }

  renderVertical() {
    const { isVertical } = this.model.settings

    if (isVertical) {
      this.target.css({
        'transform': 'rotate(-90deg)',
      });

      this.textLeft.textSpan.css({
        'transform': 'rotate(90deg) translate(-5px,24px)',
      });
      this.textRight.textSpan.css({
        'transform': 'rotate(90deg) translate(-5px, -25px)',
      });
      this.scale.divScale.children('span').css({
        'transform': 'rotate(90deg) translate(0px,3px)',
      });
    } else {
      this.target.css({
        'transform': 'rotate(0deg)',
      });

      this.textLeft.textSpan.css({
        'transform': 'rotate(0deg) translate(-50px,0px)',
      });
      this.textRight.textSpan.css({
        'transform': 'rotate(0deg) translate(0px, 0px)',
      });
      this.scale.divScale.children('span').css({
        'transform': 'rotate(0deg) translate(0px,0px)',
      });
    }

  }

 

  renderScale() {
    const { min, max, isScale } = this.model.settings
    let scaleNumber = Math.abs((min - max) / 4);

    this.scale.divScale.children('span').each((i, e) => {
      if (isScale) {
        if (i === 0) {
          e.innerHTML = (min).toString();
        } else if (i === 4) {
          e.innerHTML = (max).toString();
        } else {
          e.innerHTML = (min > 0 ? min - scaleNumber * i : min + scaleNumber * i).toString();
        }
      } else {
        e.innerHTML = '';
      }
    });
  }

  renderText() {
    const { isLabel, isDouble } = this.model.settings

    if (isLabel) {
      this.textRight.textSpan.show();
    } else {
      this.textLeft.textSpan.hide();
      this.textRight.textSpan.hide();
    }

    if (isDouble && isLabel) {
      this.textLeft.textSpan.show();
    }
  }

  renderThumbLeft(): void {
    const { isDouble,min,isLabel } = this.model.settings;
    const { valueLeft, percentageLeft } = this.model.state;
    if (isDouble) {
      this.thumbLeft.thumbDiv.css({ 'left': percentageLeft + '%' });
      this.range.rangeDiv.css({ 'left': percentageLeft + '%' });
      this.textLeft.textSpan.css({ 'right': (85 - percentageLeft) + '%' });
      this.textLeft.textSpan.html(valueLeft.toString());
      this.thumbLeft.thumbDiv.show();
      this.inputLeft.input.attr('value',valueLeft);
    } else {
      this.range.rangeDiv.css({ 'left': 0 + '%' });
      this.thumbLeft.thumbDiv.hide();
      this.textLeft.textSpan.hide();
      this.inputLeft.input.attr('value',min);
    }
  }
  
  renderThumbRight(): void {
    const { isVertical } = this.model.settings;
    const { valueRight, percentageRight } = this.model.state;
    this.thumbRight.thumbDiv.css({ 'right': (100 - percentageRight) + '%' });
    this.range.rangeDiv.css({ 'right': (100 - percentageRight) + '%' });

    if (isVertical) {
      this.textRight.textSpan.css({ 'right': (97 - percentageRight) + '%' });
    } else {
      this.textRight.textSpan.css({ 'right': (101 - percentageRight) + '%' });
    }

    this.textRight.textSpan.html(valueRight.toString());
  }
}