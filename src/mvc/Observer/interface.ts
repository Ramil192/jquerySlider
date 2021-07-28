import { ISettings, IState } from '../Model/interface';

export interface IObserver {
  observers: Array<(settings?: ISettings, state?: IState) => void>

  addObserver(observer: (settings?: ISettings, state?: IState) => void): void
  removeObserver(observer: (settings: ISettings, state: IState) => void): void
  callAllObserver(): void
}



export interface IObserverTrack {
  observers: Array<(obj: IObserverTrackArgument) => void>

  addObserver(observer: (obj: IObserverTrackArgument) => void): void
  removeObserver(observer: (obj: IObserverTrackArgument) => void): void
  callAllObserver(obj: IObserverTrackArgument): void
}

export interface IObserverScale {
  observers: Array<(obj: IObserverScaleArgument) => void>

  addObserver(observer: (obj: IObserverScaleArgument) => void): void
  removeObserver(observer: (obj: IObserverScaleArgument) => void): void
  callAllObserver(obj: IObserverScaleArgument): void
}

export interface IObserverLeft {
  observers: Array<(obj: IObserverLeftArgument) => void>

  addObserver(observer: (obj: IObserverLeftArgument) => void): void
  removeObserver(observer: (obj: IObserverLeftArgument) => void): void
  callAllObserver(obj: IObserverLeftArgument): void
}
export interface IObserverRight {
  observers: Array<(obj: IObserverRightArgument) => void>

  addObserver(observer: (obj: IObserverRightArgument) => void): void
  removeObserver(observer: (obj: IObserverRightArgument) => void): void
  callAllObserver(obj: IObserverRightArgument): void
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
}

export interface IObserverRightArgument {
  valueRight: number;

}
