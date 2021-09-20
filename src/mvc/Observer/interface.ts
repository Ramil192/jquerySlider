import { ISettings, IState } from '../Model/interface';

export interface IObserver<T> {
  observers: Array<(obj: T) => void>

  addObserver(observer: (obj: T) => void): void
  callAllObserver(obj: T): void
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
