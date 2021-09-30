import {
  IView, IScale, ISlider, ActionTypeView, ViewActionTypes,
} from './interface';
import { ISettings, IState } from '../Model/interface';

import Scale from './subView/Scale/Scale';
import Slider from './subView/Slider/Slider';
import Observer from '../Observer/Observer';

export default class View extends Observer<ActionTypeView> implements IView {
  public target: JQuery<HTMLElement>;
  public inputLeft: JQuery<HTMLElement>;
  public inputRight: JQuery<HTMLElement>;
  public scale: IScale;
  public slider: ISlider;

  public synchronizationLeft?: JQuery<HTMLElement>;
  public synchronizationRight?: JQuery<HTMLElement>;
  public body?: JQuery<HTMLElement>;

  constructor(target: JQuery<HTMLElement>) {
    super();
    this.target = target;
    this.inputLeft = $('<input class="range-slider__input-left" type="range">');
    this.inputRight = $('<input class="range-slider__input-right" type="range">');
    this.scale = new Scale();
    this.slider = new Slider();

    this.init();
    this.setEventHandlers();
  }

  public render(obj: { settings: ISettings, state: IState }): void {
    const {
      isVertical,
      min,
      max,
      step,
      isScale,
      isLabel,
      isDouble,
    } = obj.settings;
    const {
      newStepRight,
      valueLeft,
      percentageLeft,
      valueRight,
      percentageRight,
      isSmooth,
    } = obj.state;

    this.renderVertical(isVertical);
    this.changeAttrInput(min, max, step, newStepRight, valueLeft, valueRight);

    this.scale.renderScale(min, max, isScale);

    this.doubleSlider(isDouble);

    this.slider.renderText(isLabel, isDouble);

    this.renderThumbLeft(isDouble, min, valueLeft, percentageLeft);
    this.renderThumbRight(isVertical, valueRight, percentageRight);
    this.leftValueSmoothRightValue(isSmooth);
  }

  public renderVertical(isVertical: boolean): void {
    const centerLeft = this.setCenterLeft();
    const centerRight = this.setCenterRight();

    this.slider.verticalSlider(isVertical, centerLeft, centerRight);
    this.scale.verticalScale(isVertical);

    if (isVertical) {
      this.target.css({
        transform: 'rotate(-90deg)',
        margin: '32px 52px 0px',
      });
    } else {
      this.target.css({
        transform: 'rotate(0deg)',
        margin: '32px  0px',
      });
    }
  }

  public doubleSlider(isDouble: boolean): void {
    if (isDouble) {
      this.inputRight.css({ pointerEvents: 'none', zIndex: 2 });
    } else {
      this.inputRight.css({ pointerEvents: 'all', zIndex: 5 });
    }
    this.slider.doubleSlider(isDouble);
  }

  public setSynchronizationLeft(left: JQuery<HTMLElement>): void {
    this.synchronizationLeft = left;
  }

  public setSynchronizationRight(right: JQuery<HTMLElement>): void {
    this.synchronizationRight = right;
  }

  public renderThumbLeft(isDouble: boolean, min: number, valueLeft: number, percentageLeft: number): void {
    this.slider.renderThumbLeft(valueLeft, percentageLeft);

    if (isDouble) {
      this.inputLeft.val(valueLeft);
    } else {
      this.inputLeft.val(min - 1);
    }

    if (this.synchronizationLeft) {
      this.synchronizationLeft.val(valueLeft);
    }
  }

  public renderThumbRight(isVertical: boolean, valueRight: number, percentageRight: number): void {
    this.slider.renderThumbRight(isVertical, valueRight, percentageRight);
    this.inputRight.val(valueRight);

    if (this.synchronizationRight) {
      this.synchronizationRight.val(valueRight);
    }
  }

  private init(): void {
    this.target.append('<div class="range-slider"></div>');
    this.target.find('.range-slider').append(this.inputLeft);
    this.target.find('.range-slider').append(this.inputRight);
    this.target.find('.range-slider').append(this.slider.slider);
    this.slider.slider.append(this.scale.scale);
    this.target.css({
      transformOrigin: 'bottom left',
      margin: '32px 0px',
      width: '100%',
    });

    this.body = $('body');
  }

  private changeAttrInput(min: number, max: number, step: number, newStepRight: number, valueLeft: number, valueRight: number): void {
    this.inputLeft.attr('min', min);
    this.inputLeft.attr('max', max);
    this.inputLeft.attr('step', step);
    this.inputLeft.attr('value', valueLeft);
    this.inputLeft.val(valueLeft);

    this.inputRight.attr('min', min);
    this.inputRight.attr('max', max);
    this.inputRight.attr('step', newStepRight);
    this.inputRight.attr('value', valueRight);
    this.inputRight.val(valueRight);
  }

  private leftValueSmoothRightValue(isSmooth: boolean): void {
    if (isSmooth) {
      this.inputRight.css({ zIndex: -1 });
    } else {
      this.inputRight.css({ zIndex: 5 });
    }
  }

  private setCenterLeft(): number {
    const fromLeftEdge: number = Math.floor(this.slider.range.position().left);
    const width: number = this.slider.textLeft.width()!;
    let result = 0;

    if (Math.floor(fromLeftEdge) >= (width / 2)) {
      result = -50;
    } else {
      result = -30;
    }

    return result;
  }

  private setCenterRight(): number {
    const fromRightEdge = Math.abs((this.slider.range.position().left + this.slider.range.width()!) - 300);
    const width: number = this.slider.textRight.width()!;
    let result = 0;

    if (Math.floor(fromRightEdge) >= (width / 2)) {
      result = 60;
    } else {
      result = 30;
    }
    return result;
  }

  private handlerInputLeft = (): void => {
    const valueLeft = Number(this.inputLeft.val());
    this.callObserver({ type: ViewActionTypes.LEFT, value: { valueLeft } });
  };

  private handlerInputRight = (): void => {
    const valueRight = Number(this.inputRight.val());
    this.callObserver({ type: ViewActionTypes.RIGHT, value: { valueRight } });
  };

  private handlerScaleClick = (event: JQuery.ClickEvent<HTMLElement, undefined, HTMLElement, HTMLElement>): void => {
    this.callObserver({ type: ViewActionTypes.SCALE, value: { valueTarget: Number(event.target.textContent) } });
  };

  private handlerTrackClick = (event: JQuery.ClickEvent<HTMLElement, undefined, HTMLElement, HTMLElement>): void => {
    const width = this.slider.trackClick.width()!;
    const coordinatesX = event.offsetX;
    const percent = Number(((100 / width) * coordinatesX).toFixed(1));

    this.callObserver({ type: ViewActionTypes.TRACK, value: { percent } });
  };

  private handlerTextLeftMouseenter = (): void => {
    this.inputLeft.css({ top: '-24px' });
  };

  private handlerThumbLeftMouseenter = (): void => {
    this.inputLeft.css({ top: '0px' });
  };

  private handlerTextRightMouseenter = (): void => {
    this.inputRight.css({ top: '-24px' });
  };

  private handlerThumbRightMouseenter = (): void => {
    this.inputRight.css({ top: '0px' });
  };

  preventDefault = (event: JQuery.Event):boolean => {
    event.preventDefault();
    return false;
  };

  private setEventHandlers(): void {
    this.inputLeft.on('input', this.handlerInputLeft);
    this.inputRight.on('input', this.handlerInputRight);
    this.scale.scale.on('click', this.handlerScaleClick);
    this.slider.trackClick.on('click', this.handlerTrackClick);
    this.slider.textLeft.on('mouseenter', this.handlerTextLeftMouseenter);
    this.slider.thumbLeft.on('mouseenter', this.handlerThumbLeftMouseenter);
    this.slider.textRight.on('mouseenter', this.handlerTextRightMouseenter);
    this.slider.thumbRight.on('mouseenter', this.handlerThumbRightMouseenter);

    this.slider.textLeft.on('dragstart drop', this.preventDefault);
    this.slider.textRight.on('dragstart drop', this.preventDefault);
    this.slider.thumbLeft.on('dragstart drop', this.preventDefault);
    this.slider.thumbRight.on('dragstart drop', this.preventDefault);
    this.slider.trackClick.on('dragstart drop', this.preventDefault);
    this.scale.scale.on('dragstart drop', this.preventDefault);

    this.inputLeft.on('dragstart drop ', this.preventDefault);
    this.inputRight.on('dragstart drop ', this.preventDefault);
  }
}
