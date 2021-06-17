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
}
export interface MyType {
  [key: string]: number | boolean;
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
}

export interface IModel {
  settings: ISettings
  state: IState
  getPercentage(val: number): number
  setStateForLeftInput(valueLeft: number): void
  setStateForRightInput(valueRight: number): void
  setStateForInput(innerHTML: number): void
  checkSettings(prevLeft?:number, prevRight?:number):void
}
