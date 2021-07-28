export interface MyType {
  [key: string]: number | boolean;
}

export interface IDemoPage {
  outerContainerElement: JQuery<HTMLElement>;
  leftValue: string[];
  rightValue: boolean[];
  columnNumber: JQuery<HTMLElement>;
  columnCheckbox: JQuery<HTMLElement>;
  valueLeft: JQuery<HTMLElement>;
  valueRight: JQuery<HTMLElement>;
  plugin: JQuery<HTMLElement>;

  render(): void
  settingsObjInit(): INewSettings
  settingsObjInit(): INewSettings
  synchronizationLeft(): void
  synchronizationRight():void
  bindEventListeners(): void
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
