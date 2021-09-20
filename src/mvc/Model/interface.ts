import { IObserver, IObserverViewArgument } from '../Observer/interface';

export interface ISettings {
  min: number,
  max: number,
  step: number,
  valueLeft: number,
  valueRight: number,
  isVertical: boolean,
  isLabel: boolean,
  isScale: boolean,
  isDouble: boolean,
  [key: string]: boolean | number
}

export interface INewSettings {
  min?: number,
  max?: number,
  step?: number,
  valueLeft?: number,
  valueRight?: number,
  isVertical?: boolean,
  isLabel?: boolean,
  isScale?: boolean,
  isDouble?: boolean,
}

export interface IState {
  valueLeft: number
  valueRight: number
  percentageLeft: number
  percentageRight: number
  newStepRight: number
  penultimateValue: number
  centerLeft: number
  centerRight: number
  isPenultimate: boolean
  isPenultimateValue: boolean
  isSmooth: boolean
}

export interface IModel {
  settings: ISettings
  state: IState
  observerRender?: IObserver<IObserverViewArgument>;

  setObserver(observer: IObserver<IObserverViewArgument>): void
  setStateLeft(obj: { valueLeft: number, fromLeftEdge?: number, width?: number }): void
  setStateRight(obj: { valueRight: number, fromRightEdge?: number, width?: number }): void
  getNewValueForState(obj: { width: number, coordinatesX: number }): void
  setStateLeftOrRight(obj: { value: number }): void
  checkSettings(prevLeft?: number): void
}
