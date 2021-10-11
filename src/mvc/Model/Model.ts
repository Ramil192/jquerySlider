import {
  ISettings,
  IState,
  IModel,
  IObserverViewArgument,
  ModelActionTypes,
}
  from './interface';
import Observer from '../Observer/Observer';

export default class Model extends Observer<IObserverViewArgument> implements IModel {
  public settings: ISettings;
  public state: IState;

  constructor(settings: ISettings) {
    super();
    this.settings = settings;
    this.state = {
      valueLeft: 0,
      valueRight: 0,
      percentageLeft: 0,
      percentageRight: 0,
      newStepRight: 0,
      penultimateValue: 0,
      isPenultimate: false,
      isPenultimateValue: false,
      isSmooth: false,
    };
  }

  public checkSettings(): void {
    const {
      min, max, isDouble,
    } = this.settings;

    const isMinMoreThanMaxAndMinMoreThanZero = (min >= max && min >= 0);

    if (isMinMoreThanMaxAndMinMoreThanZero) {
      this.settings.min = max - 1;
    }

    if (this.settings.min > this.settings.valueLeft) {
      this.settings.valueLeft = this.settings.min;
    }

    if (this.settings.max < this.settings.valueRight) {
      this.settings.valueRight = this.settings.max;
    }

    if (this.isMinMoreThanRightAndMinMoreThanZero()) {
      this.settings.valueRight = this.settings.min + 1;
    }

    if (this.isLeftMoreThanRightAndRightLessThanZero()) {
      this.settings.valueLeft = this.settings.valueRight - 1;
    }

    if (!isDouble) {
      this.settings.valueLeft = this.settings.min - 1;
    }

    if (isDouble && this.settings.valueLeft < this.settings.min) {
      this.settings.valueLeft = this.settings.min;
    }

    this.state.valueLeft = this.settings.valueLeft;
    this.state.valueRight = this.settings.valueRight;
    this.state.newStepRight = this.settings.step;
    this.state.percentageLeft = this.getPercentage(this.settings.valueLeft);
    this.state.percentageRight = this.getPercentage(this.settings.valueRight);

    this.setIsSmooth(this.state.valueLeft, this.state.valueRight);

    this.callObserver({
      type: ModelActionTypes.RENDER,
      value: {
        settings: this.settings,
        state: this.state,
      },
    });
  }

  public setStateLeft(obj: { valueLeft: number }): void {
    const { valueLeft } = obj;
    const newValue = Math.min(valueLeft, this.state.valueRight - this.getStep());

    this.state.percentageLeft = this.getPercentage(newValue);
    this.state.valueLeft = newValue;
    this.settings.valueLeft = newValue;

    this.setIsSmooth(this.state.valueLeft, this.state.valueRight);

    this.callObserver({
      type: ModelActionTypes.RENDER,
      value: {
        settings: this.settings,
        state: this.state,
      },
    });
  }

  public setStateRight(obj: { valueRight: number }): void {
    const { valueRight } = obj;

    const newValue = Math.max(valueRight, this.state.valueLeft + this.getStep());
    this.state.percentageRight = this.getPercentage(newValue);
    this.state.valueRight = newValue;
    this.settings.valueRight = newValue;

    this.setIsSmooth(this.state.valueLeft, this.state.valueRight);

    this.callObserver({
      type: ModelActionTypes.RENDER,
      value: {
        settings: this.settings,
        state: this.state,
      },
    });
  }

  public setStateLeftOrRight(obj: { valueTarget: number }): void {
    const { valueTarget } = obj;
    let isRightNearer = Math.abs(this.state.valueRight - valueTarget) < Math.abs(this.state.valueLeft - valueTarget);

    if (!this.settings.isDouble) {
      isRightNearer = true;
    }

    if (isRightNearer) {
      this.setStateRight({ valueRight: valueTarget });
    } else {
      this.setStateLeft({ valueLeft: valueTarget });
    }

    this.setIsSmooth(this.state.valueLeft, this.state.valueRight);
  }

  private setIsSmooth(valueLeft: number, valueRight: number): void {
    const difference = this.getStep();

    if (Math.abs(valueRight - valueLeft) <= difference) {
      this.state.isSmooth = true;
    } else {
      this.state.isSmooth = false;
    }
  }

  private getStep(): number {
    return Number.isInteger(this.settings.step) ? 1 : 0.1;
  }

  public getNewValueForState(obj: { percent: number }): void {
    const { percent } = obj;
    const newValueForState: number = ((percent * (this.settings.max - this.settings.min)) / 100) + this.settings.min;

    this.setStateLeftOrRight({ valueTarget: Math.ceil(newValueForState) });
  }

  private getPercentage(val: number): number {
    const { min, max } = this.settings;

    return Math.abs(((val - min) / (max - min)) * 100);
  }

  private isMinMoreThanRightAndMinMoreThanZero(): boolean {
    return (this.settings.min > this.settings.valueRight);
  }

  private isLeftMoreThanRightAndRightLessThanZero(): boolean {
    return (this.settings.valueLeft >= this.settings.valueRight);
  }
}
