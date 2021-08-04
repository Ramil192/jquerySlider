import { ISettings, IState } from '../Model/interface';

export interface IObserver {
  observers: Array<(obj: IObserverViewArgument) => void>

  addObserver(observer: (obj: IObserverViewArgument) => void): void
  callAllObserver(obj: IObserverViewArgument): void
}

export interface IObserverTrack {
  observers: Array<(obj: IObserverTrackArgument) => void>

  addObserver(observer: (obj: IObserverTrackArgument) => void): void
  callAllObserver(obj: IObserverTrackArgument): void
}

export interface IObserverScale {
  observers: Array<(obj: IObserverScaleArgument) => void>

  addObserver(observer: (obj: IObserverScaleArgument) => void): void
  callAllObserver(obj: IObserverScaleArgument): void
}

export interface IObserverLeft {
  observers: Array<(obj: IObserverLeftArgument) => void>

  addObserver(observer: (obj: IObserverLeftArgument) => void): void
  callAllObserver(obj: IObserverLeftArgument): void
}

export interface IObserverRight {
  observers: Array<(obj: IObserverRightArgument) => void>

  addObserver(observer: (obj: IObserverRightArgument) => void): void
  callAllObserver(obj: IObserverRightArgument): void
}

export interface IObserverViewArgument {
  settings: ISettings
  state: IState
}

export interface IObserverTrackArgument {
  width: number
  coordinatesX: number
}

export interface IObserverScaleArgument {
  value: number
}

export interface IObserverLeftArgument {
  valueLeft: number;
  fromLeftEdge?: number;
  width?: number;

}

export interface IObserverRightArgument {
  valueRight: number;
  fromRightEdge?: number,
  width?: number
}
