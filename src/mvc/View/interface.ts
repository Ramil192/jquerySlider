import { ISettings, IState } from '../Model/interface';
import { IObserver } from '../Observer/interface';

export interface IView extends IObserver<ActionTypeView> {
  target: JQuery<HTMLElement>
  inputLeft: JQuery<HTMLElement>
  inputRight: JQuery<HTMLElement>
  scale: IScale
  slider: ISlider

  synchronizationLeft?: JQuery<HTMLElement>;
  synchronizationRight?: JQuery<HTMLElement>;
  body?: JQuery<HTMLElement>;

  doubleSlider(isDouble: boolean): void;
  render(obj: { settings: ISettings, state: IState }): void;
  renderThumbLeft(isDouble: boolean, min: number, valueLeft: number, percentageLeft: number): void;
  renderThumbRight(isVertical: boolean, valueRight: number, percentageRight: number): void;
  renderVertical(isVertical: boolean): void
  setSynchronizationLeft(left: JQuery<HTMLElement>): void;
  setSynchronizationRight(right: JQuery<HTMLElement>): void;
}

export interface IScale {
  scale: JQuery<HTMLElement>

  renderScale(min: number, max: number, isScale: boolean): void;
  verticalScale(isVertical: boolean): void;
}

export enum ViewActionTypes {
  LEFT = 'leftThumb',
  RIGHT = 'rightThumb',
  SCALE = 'scale',
  TRACK = 'track',
}

export interface IObserverLeftArgument {
  type: ViewActionTypes.LEFT;
  value: {
    valueLeft: number;
  }
}

export interface IObserverRightArgument {
  type: ViewActionTypes.RIGHT;
  value: {
    valueRight: number;
  }
}

export interface IObserverScaleArgument {
  type: ViewActionTypes.SCALE;
  value: {
    valueTarget: number
  }
}

export interface IObserverTrackArgument {
  type: ViewActionTypes.TRACK;
  value: {
    percent: number
  }
}

export type ActionTypeView = IObserverLeftArgument | IObserverRightArgument | IObserverScaleArgument | IObserverTrackArgument;

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
