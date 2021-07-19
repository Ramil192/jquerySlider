export interface IRender {
  isVertical: boolean,
  min: number,
  max: number,
  step: number,
  isScale: boolean,
  isLabel: boolean,
  isDouble: boolean,
  valueLeft: number,
  percentageLeft: number,
  valueRight: number,
  percentageRight: number,
}

export interface IView {
  target: JQuery
  inputLeft: JQuery
  inputRight: JQuery
  scale: IScale
  slider: ISlider
  synchronizationLeft?: JQuery;
  synchronizationRight?: JQuery;

  init(): void
  render(modelDate: IRender): void
  renderThumbLeft(isDouble: boolean, min: number, valueLeft: number, percentageLeft: number): void
  renderThumbRight(isVertical: boolean, valueRight: number, percentageRight: number): void
  setSynchronizationLeft(left: JQuery):void
  setSynchronizationRight(right: JQuery):void
}

export interface IScale {
  scale: JQuery

  renderScale(min: number, max: number, isScale: boolean): void
  verticalScale(isVertical: boolean): void
}

export interface ISlider {
  slider: JQuery;
  track: JQuery;
  range: JQuery;
  thumbLeft: JQuery;
  thumbRight: JQuery;
  textLeft: JQuery;
  textRight: JQuery;

  renderText(isLabel: boolean, isDouble: boolean): void
  doubleSlider(isDouble: boolean):void
  renderThumbLeft(valueLeft: number, percentageLeft: number): void
  renderThumbRight(isVertical: boolean, valueRight: number, percentageRight: number): void
  verticalSlider(isVertical: boolean): void
}
