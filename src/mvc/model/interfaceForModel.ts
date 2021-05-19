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

export interface IObj {
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
  changeInputLeft(target: JQuery, val: number): void
  changeInputRight(target: JQuery, val: number): void
  scaleClick(innerHTML: number, inputLeft: JQuery, inputRight: JQuery): void
  checkSettings(prevLeft?:number,prevRight?:number):void
}