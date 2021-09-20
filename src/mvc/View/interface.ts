import { ISettings, IState } from '../Model/interface';
import {
  IObserver,
  IObserverLeftArgument,
  IObserverRightArgument,
  IObserverScaleArgument,
  IObserverTrackArgument,
} from '../Observer/interface';

export interface IView {
  target: JQuery<HTMLElement>
  inputLeft: JQuery<HTMLElement>
  inputRight: JQuery<HTMLElement>
  scale: IScale
  slider: ISlider
  synchronizationLeft?: JQuery<HTMLElement>;
  synchronizationRight?: JQuery<HTMLElement>;

  observerControllerModelLeft?: IObserver<IObserverLeftArgument>;
  observerControllerModelRight?: IObserver<IObserverRightArgument>;
  observerControllerModelScale?: IObserver<IObserverScaleArgument>;
  observerControllerModelTrack?: IObserver<IObserverTrackArgument>;

  doubleSlider(isDouble: boolean): void;
  setObserverLeft(observer: IObserver<IObserverLeftArgument>): void;
  setObserverRight(observer: IObserver<IObserverRightArgument>): void;
  setObserverScale(observerScale: IObserver<IObserverScaleArgument>): void;
  setObserverTrack(observerTrack: IObserver<IObserverTrackArgument>): void;
  render(obj: { settings: ISettings, state: IState }): void;
  renderThumbLeft(isDouble: boolean, min: number, valueLeft: number, percentageLeft: number): void;
  renderThumbRight(isVertical: boolean, valueRight: number, percentageRight: number): void;
  renderVertical(isVertical: boolean, centerLeft: number, centerRight: number): void
  setSynchronizationLeft(left: JQuery<HTMLElement>): void;
  setSynchronizationRight(right: JQuery<HTMLElement>): void;
}

export interface IScale {
  scale: JQuery<HTMLElement>

  renderScale(min: number, max: number, isScale: boolean): void;
  verticalScale(isVertical: boolean): void;
}

export interface ISlider {
  slider: JQuery<HTMLElement>;
  track: JQuery<HTMLElement>;
  trackClick: JQuery<HTMLElement>;
  range: JQuery<HTMLElement>;
  thumbLeft: JQuery<HTMLElement>;
  thumbRight: JQuery<HTMLElement>;
  textLeft: JQuery<HTMLElement>;
  textRight: JQuery<HTMLElement>;

  renderText(isLabel: boolean, isDouble: boolean): void;
  doubleSlider(isDouble: boolean): void;
  renderThumbLeft(valueLeft: number, percentageLeft: number): void;
  renderThumbRight(isVertical: boolean, valueRight: number, percentageRight: number): void;
  verticalSlider(isVertical: boolean, centerLeft: number, centerRight: number): void;
}
