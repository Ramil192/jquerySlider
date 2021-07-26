import { ISettings, IState } from '../Model/interface';
import { IObserver } from '../Observer/interface';

export interface IView {
  target: JQuery
  inputLeft: JQuery
  inputRight: JQuery
  scale: IScale
  slider: ISlider
  synchronizationLeft?: JQuery;
  synchronizationRight?: JQuery;
  observerControllerModel?: IObserver;
  observerControllerModelTrack?: IObserver;

  doubleSlider(isDouble:boolean):void;
  setObserver(observer:IObserver):void;
  setObserverScale(observerScale:IObserver):void;
  setObserverTrack(observerTrack:IObserver):void;
  render(settings: ISettings, state: IState): void;
  renderThumbLeft(isDouble: boolean, min: number, valueLeft: number, percentageLeft: number): void;
  renderThumbRight(isVertical: boolean, valueRight: number, percentageRight: number): void;
  setSynchronizationLeft(left: JQuery): void;
  setSynchronizationRight(right: JQuery): void;
}

export interface IScale {
  scale: JQuery

  renderScale(min: number, max: number, isScale: boolean): void;
  verticalScale(isVertical: boolean): void;
}

export interface ISlider {
  slider: JQuery;
  track: JQuery;
  trackClick: JQuery;
  range: JQuery;
  thumbLeft: JQuery;
  thumbRight: JQuery;
  textLeft: JQuery;
  textRight: JQuery;

  renderText(isLabel: boolean, isDouble: boolean): void;
  doubleSlider(isDouble: boolean): void;
  renderThumbLeft(valueLeft: number, percentageLeft: number): void;
  renderThumbRight(isVertical: boolean, valueRight: number, percentageRight: number): void;
  verticalSlider(isVertical: boolean): void;
}
