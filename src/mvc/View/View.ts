import { IView, IScale, ISlider } from './interface';
import { IObserver, IObserverLeft, IObserverRight, IObserverTrack, IObserverScale } from '../Observer/interface';
import { ISettings, IState } from '../Model/interface';

import Scale from './subView/Scale/Scale';
import Slider from './subView/Slider/Slider';

export default class View implements IView {
  public target: JQuery<HTMLElement>;
  public inputLeft: JQuery<HTMLElement>;
  public inputRight: JQuery<HTMLElement>;
  public scale: IScale;
  public slider: ISlider;

  public synchronizationLeft?: JQuery<HTMLElement>;
  public synchronizationRight?: JQuery<HTMLElement>;
  public observerControllerModel?: IObserver;
  public observerControllerModelLeft?: IObserverLeft;
  public observerControllerModelRight?: IObserverRight;
  public observerControllerModelScale?: IObserverScale;
  public observerControllerModelTrack?: IObserverTrack;

  constructor(target: JQuery<HTMLElement>) {
    this.target = target;
    this.inputLeft = $('<input class="range-slider__input-left" type="range">');
    this.inputRight = $('<input class="range-slider__input-right" type="range">');
    this.scale = new Scale();
    this.slider = new Slider();

    this.init();
    this.setEventHandlers();
  }



  public setObserverLeft(observer: IObserverLeft) {
    this.observerControllerModelLeft = observer;
  }

  public setObserverRight(observer: IObserverRight) {
    this.observerControllerModelRight = observer;
  }

  public setObserverScale(observer: IObserverScale) {
    this.observerControllerModelScale = observer;
  }

  public setObserverTrack(observer: IObserverTrack) {
    this.observerControllerModelTrack = observer;
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
      isSmooth
    } = obj.state;

    this.renderVertical(isVertical);
    this.changeAttrInput(min, max, step, newStepRight, valueLeft, valueRight);

    this.scale.renderScale(min, max, isScale);

    this.doubleSlider(isDouble);

    this.slider.renderText(isLabel, isDouble);

    this.renderThumbLeft(isDouble, min, valueLeft, percentageLeft);
    this.renderThumbRight(isVertical, valueRight, percentageRight);
    this.leftValueSmoothRightValue(isSmooth)
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
    this.handlerInputRight()
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


  private callObserverLeft(obj: { valueLeft: number }) {
    if (typeof this.observerControllerModelLeft !== 'undefined') {
      this.observerControllerModelLeft.callAllObserver(obj);
    }
  }
  private callObserverRight(obj: { valueRight: number }) {
    if (typeof this.observerControllerModelRight !== 'undefined') {
      this.observerControllerModelRight.callAllObserver(obj);
    }
  }

  private callObserverScale(obj: { value: number }) {
    if (typeof this.observerControllerModelScale !== 'undefined') {
      this.observerControllerModelScale.callAllObserver(obj);
    }
  }

  private callObserverTrack(obj: { width: number, coordinatesX: number }) {
    if (typeof this.observerControllerModelTrack !== 'undefined') {
      this.observerControllerModelTrack.callAllObserver(obj);
    }
  }


  private leftValueSmoothRightValue(isSmooth: boolean) {

    if (isSmooth) {
      this.inputRight.css({ zIndex: -1 });
    } else {
      this.inputRight.css({ zIndex: 5 });
    }
  }

  private handlerInputLeft = () => {
    const valueLeft: number = parseFloat(this.inputLeft.val()!.toString());
    this.callObserverLeft({ valueLeft });
  };

  private handlerInputRight = () => {
    const valueRight: number = parseFloat(this.inputRight.val()!.toString());
    this.callObserverRight({ valueRight });
  };


  private handlerScaleClick = (e: JQuery.ClickEvent<HTMLElement, undefined, HTMLElement, HTMLElement>) => {
    this.callObserverScale({ value: parseInt(e.target.innerHTML, 10) });
  };

  private handlerTrackClick = (e: JQuery.ClickEvent<HTMLElement, undefined, HTMLElement, HTMLElement>) => {
    this.callObserverTrack({ width: this.slider.trackClick.width()!, coordinatesX: e.offsetX });
  };

  private handlerTextLeftMouseenter = () => {
    this.inputLeft.css({ top: '-24px' });
  }

  private handlerThumbLeftMouseenter = () => {
    this.inputLeft.css({ top: '0px' });
  }
  private handlerTextRightMouseenter = () => {
    this.inputRight.css({ top: '-24px' });
  }

  private handlerThumbRightMouseenter = () => {
    this.inputRight.css({ top: '0px' });
  }

  private setEventHandlers() {
    this.inputLeft.on('input', this.handlerInputLeft);
    this.inputRight.on('input', this.handlerInputRight);
    this.scale.scale.on('click', this.handlerScaleClick);
    this.slider.trackClick.on('click', this.handlerTrackClick);
    this.slider.textLeft.on('mouseenter', this.handlerTextLeftMouseenter);
    this.slider.thumbLeft.on('mouseenter', this.handlerThumbLeftMouseenter);
    this.slider.textRight.on('mouseenter', this.handlerTextRightMouseenter);
    this.slider.thumbRight.on('mouseenter', this.handlerThumbRightMouseenter);
  }
}
