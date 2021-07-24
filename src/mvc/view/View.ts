import { IView, IScale, ISlider } from './interface';
import { IObserver } from '../Observer/interface';
import { ISettings, IState } from '../Model/interface';

import Scale from './SubView/Scale';
import Slider from './SubView/Slider';

export default class View implements IView {
  public target: JQuery;
  public inputLeft: JQuery;
  public inputRight: JQuery;
  public scale: IScale;
  public slider: ISlider;
  public scaleValue: number;

  public synchronizationLeft?: JQuery;
  public synchronizationRight?: JQuery;
  public observerControllerModel?: IObserver;
  public observerControllerModelScale?: IObserver;

  constructor(target: JQuery) {
    this.target = target;
    this.inputLeft = $('<input class="range-slider__input-left" type="range">');
    this.inputRight = $('<input class="range-slider__input-right" type="range">');
    this.scale = new Scale();
    this.slider = new Slider();
    this.scaleValue = 0;
    this.init();
    this.setEventHandlers();
  }

  public setObserver(observer: IObserver) {
    this.observerControllerModel = observer;
  }

  public setObserverScale(observer: IObserver) {
    this.observerControllerModelScale = observer;
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
  }

  public render(settings: ISettings, state: IState): void {
    const {
      isVertical,
      min,
      step,
      isScale,
      isLabel,
      isDouble,
    } = settings;
    const {
      newMax,
      valueLeft,
      percentageLeft,
      valueRight,
      percentageRight,
    } = state;

    this.renderVertical(isVertical);
    this.changeAttrInput(min, newMax, step, valueLeft, valueRight);

    this.scale.renderScale(min, newMax, isScale);

    this.doubleSlider(isDouble);

    this.slider.renderText(isLabel, isDouble);

    this.renderThumbLeft(isDouble, min, valueLeft, percentageLeft);
    this.renderThumbRight(isVertical, valueRight, percentageRight);
  }

  public renderVertical(isVertical: boolean): void {
    this.slider.verticalSlider(isVertical);
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

  public doubleSlider(isDouble: boolean) {
    if (isDouble) {
      this.inputRight.css({ pointerEvents: 'none' });
    } else {
      this.inputRight.css({ pointerEvents: 'all' });
    }
    this.slider.doubleSlider(isDouble);
  }

  public setSynchronizationLeft(left: JQuery): void {
    this.synchronizationLeft = left;
  }

  public setSynchronizationRight(right: JQuery): void {
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

  private changeAttrInput(min: number, max: number, step: number, valueLeft: number, valueRight: number): void {
    this.inputLeft.attr('min', min);
    this.inputLeft.attr('max', max);
    this.inputLeft.attr('step', step);
    this.inputLeft.val(valueLeft);

    this.inputRight.attr('min', min);
    this.inputRight.attr('max', max);
    this.inputRight.attr('step', step);
    this.inputRight.val(valueRight);
  }

  private callObserver() {
    if (typeof this.observerControllerModel !== 'undefined') {
      this.observerControllerModel.callAllObserver();
    }
  }

  private callObserverScale() {
    if (typeof this.observerControllerModelScale !== 'undefined') {
      this.observerControllerModelScale.callAllObserver();
    }
  }

  private handlerInputLeft = () => {
    this.callObserver();
  };

  private handlerInputRight = () => {
    this.callObserver();
  };

  private handlerScaleClick = (e: JQuery.ClickEvent<HTMLElement, undefined, HTMLElement, HTMLElement>) => {
    this.scaleValue = parseInt(e.target.innerHTML, 10);
    this.callObserverScale();
  };

  private setEventHandlers() {
    this.inputLeft.on('input', this.handlerInputLeft);
    this.inputRight.on('input', this.handlerInputRight);
    this.scale.scale.on('click', this.handlerScaleClick);
  }
}
