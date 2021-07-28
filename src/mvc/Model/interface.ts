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
  newStepInputValue: number
  penultimateValue: number
  isPenultimate: boolean
  isPenultimateValue: boolean
  isSmooth: boolean  
}

export interface IModel {
  settings: ISettings
  state: IState
  observerControllerView?: IObserver;

  setObserver(observer: IObserver): void
  setStateForLeftInput(obj: { valueLeft: number}): void
  setStateForRightInput(obj: { valueLeft?: number, valueRight: number }): void
  getValueClickTrack(obj: { width: number, trackX: number }): void
  setStateForInput(obj: { value: number }): void
  checkSettings(prevLeft?: number): void
}
