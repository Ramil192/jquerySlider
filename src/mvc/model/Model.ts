import { ISettings, IState, IModel } from './interfacel';

export default class Model implements IModel {
  settings: ISettings;
  state: IState;
  constructor(settings: ISettings) {
    this.settings = settings;
    this.state = {
      valueLeft: 0,
      valueRight: 0,
      percentageLeft: 0,
      percentageRight: 0,
    };
  }

  checkSettings(prevLeft = 25, prevRight = 75) {
    const {
      min, max, valueLeft, valueRight, isDouble,
    } = this.settings;

    if (min >= max) {
      if (min >= 0) {
        this.settings.min = max - 1;
      } else {
        this.settings.min = max + 1;
      }
    }

    if (this.settings.valueLeft >= valueRight) {
      if (prevLeft !== valueLeft) {
        this.settings.valueRight = this.settings.valueLeft;
      } else {
        this.settings.valueLeft = this.settings.valueRight;
      }
    }

    if (this.settings.min > valueLeft) {
      this.settings.valueLeft = this.settings.min;
    }

    if (this.settings.min > valueRight) {
      this.settings.valueRight = this.settings.min;
    }

    if (this.settings.max < valueLeft) {
      this.settings.valueLeft = this.settings.max;
    }

    if (this.settings.max < valueRight) {
      this.settings.valueRight = this.settings.max;
    }

    if (!isDouble) {
      this.settings.valueLeft = this.settings.min;
    }

    this.state.valueLeft = this.settings.valueLeft;
    this.state.valueRight = this.settings.valueRight;
    this.state.percentageLeft = this.getPercentage(this.settings.valueLeft);
    this.state.percentageRight = this.getPercentage(this.settings.valueRight);
  }

  getPercentage(val: number): number {
    const { min, max } = this.settings;
    return Math.abs(((val - min) / (max - min)) * 100);
  }

  setStateForLeftInput(valueLeft: number): void {
    const newValue = Math.min(valueLeft, this.state.valueRight - 1);

    this.state.percentageLeft = this.getPercentage(newValue);
    this.state.valueLeft = newValue;
    this.settings.valueLeft = newValue;
  }

  setStateForRightInput(valueRight: number): void {
    const newValue = Math.max(valueRight, this.state.valueLeft + 1);

    this.state.percentageRight = this.getPercentage(newValue);
    this.state.valueRight = newValue;
    this.settings.valueRight = newValue;
  }

  setStateForInput(value: number): void {
    const scaleValue = value;

    if (this.settings.isDouble) {
      if (this.state.valueLeft > scaleValue) {
        this.setStateForLeftInput(scaleValue);
      }
      if (this.state.valueRight < scaleValue) {
        this.setStateForRightInput(scaleValue);
      }
    } else {
      this.setStateForRightInput(scaleValue);
    }
  }
}
