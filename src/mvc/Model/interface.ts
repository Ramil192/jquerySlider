import { IObserver } from '../Observer/interface';

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
  isPenultimate: boolean
  isPenultimateValue: boolean
  isSmooth: boolean
}

export enum ModelActionTypes {
  RENDER = 'valueUpdate',
}

export interface IObserverViewArgument {
  type: ModelActionTypes.RENDER,
  value: {
    settings: ISettings
    state: IState
  }
}

export interface IModel extends IObserver<IObserverViewArgument> {
  settings: ISettings
  state: IState

  setStateLeft(obj: { valueLeft: number }): void
  setStateRight(obj: { valueRight: number }): void
  getNewValueForState(obj: { width: number, coordinatesX: number }): void
  setStateLeftOrRight(obj: { valueTarget: number }): void
  checkSettings(prevLeft?: number): void
}
