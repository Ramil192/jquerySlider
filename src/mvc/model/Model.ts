import { ISettings, IState, IModel } from './interface';
import { IObserver } from '../Observer/interface';

export default class Model implements IModel {
  public settings: ISettings;
  public state: IState;
  public observerControllerView?: IObserver;

  constructor(settings: ISettings) {
    this.settings = settings;
    this.state = {
      valueLeft: 0,
      valueRight: 0,
      percentageLeft: 0,
      percentageRight: 0,
      newMax: 0,
    };

  }

  public setObserver(observer: IObserver) {
    this.observerControllerView = observer;
  }

  public checkSettings(prevLeft = 25): void {
    const {
      min, max, valueLeft, valueRight, isDouble,
    } = this.settings;
    this.checkStep();

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

    if (this.state.newMax < valueLeft) {
      this.settings.valueLeft = this.state.newMax;
    }

    if (this.state.newMax < valueRight) {
      this.settings.valueRight = this.state.newMax;
    }

    if (!isDouble) {
      this.settings.valueLeft = this.settings.min;
    }

    this.state.valueLeft = this.settings.valueLeft;
    this.state.valueRight = this.settings.valueRight;
    this.state.percentageLeft = this.getPercentage(this.settings.valueLeft);
    this.state.percentageRight = this.getPercentage(this.settings.valueRight);

    this.callObserver();
  }

  public setStateForLeftInput(valueLeft: number): void {
    const newValue = Math.min(valueLeft, this.state.valueRight - 1);

    this.state.percentageLeft = this.getPercentage(newValue);
    this.state.valueLeft = newValue;
    this.settings.valueLeft = newValue;

    this.callObserver();
  }

  public setStateForRightInput(valueRight: number): void {
    const newValue = Math.max(valueRight, this.state.valueLeft + 1);

    this.state.percentageRight = this.getPercentage(newValue);
    this.state.valueRight = newValue;
    this.settings.valueRight = newValue;
  }

  public setStateForInput(value: number): void {
    
    const scaleValue = value;
    const isRightLess = this.state.valueRight < scaleValue;
    const isRightNearer = Math.abs(scaleValue - this.state.valueRight) < Math.abs(scaleValue - this.state.valueLeft);
    const isNewRightValue = isRightLess || isRightNearer;

    if (this.settings.isDouble) {
      if (isNewRightValue) {
        this.setStateForRightInput(scaleValue);
      } else {
        this.setStateForLeftInput(scaleValue);
      }

    } else {
      this.setStateForRightInput(scaleValue);
    }

    this.callObserver()
  }

  private getPercentage(val: number): number {
    const { min } = this.settings;
    const { newMax } = this.state;
    return Math.abs(((val - min) / (newMax - min)) * 100);
  }

  private checkStep() {
    this.state.newMax = this.settings.max;
    for (; (this.state.newMax % this.settings.step);) {
      this.state.newMax -= 1;
    }
  }

  private callObserver() {
    if (typeof this.observerControllerView !== "undefined") {
      this.observerControllerView.callAllObserver();
    }
  }
}
