import { ISettings, IState, IModel } from './interface';
import { IObserver } from '../Observer/interface';

export default class Model implements IModel {
  public settings: ISettings;
  public state: IState;
  public observerRender?: IObserver;

  constructor(settings: ISettings) {
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

  public setObserver(observer: IObserver): void {
    this.observerRender = observer;
  }

  public checkSettings(): void {
    const {
      min, max, isDouble,
    } = this.settings;

    const isMinMoreThanMaxAndMinMoreThanZero = (min >= max && min >= 0);
    const isMinMoreThanMaxAndMinLessThanZero = (min >= max && min <= 0);

    if (isMinMoreThanMaxAndMinMoreThanZero) {
      this.settings.min = max - 1;
    }

    if (isMinMoreThanMaxAndMinLessThanZero && !isMinMoreThanMaxAndMinMoreThanZero) {
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

    if (this.isMinMoreThanRightAndMinLessThanZero()) {
      this.settings.valueRight = this.settings.min - 1;
    }

    if (this.isMaxLessThanLeftAndMaxMoreThanZero()) {
      this.settings.valueLeft = this.settings.max - 1;
    }

    if (this.isMaxLessThanLeftAndMaxLessThanZero()) {
      this.settings.valueLeft = this.settings.max + 1;
    }

    if (this.isLeftMoreThanRightAndRightLessThanZero()) {
      this.settings.valueLeft = this.settings.valueRight - 1;
    }

    if (this.isLeftMoreThanRightAndRightMoreThanZero()) {
      this.settings.valueLeft = this.settings.valueRight - 1;
    }

    if (!isDouble) {
      this.settings.valueLeft = this.settings.min;
    }

    this.state.valueLeft = this.settings.valueLeft;
    this.state.valueRight = this.settings.valueRight;
    this.state.newStepRight = this.settings.step;
    this.state.percentageLeft = this.getPercentage(this.settings.valueLeft);
    this.state.percentageRight = this.getPercentage(this.settings.valueRight);

    this.setStateRight({ valueRight: this.state.valueRight });
    this.setIsSmooth(this.state.valueLeft, this.state.valueRight);
    this.observerRender!.callAllObserver({ settings: this.settings, state: this.state });
  }

  public setStateLeft(obj: { valueLeft: number }): void {
    const { valueLeft } = obj;

    const newValue = Math.min(valueLeft, this.state.valueRight - this.isFractional());

    this.state.percentageLeft = this.getPercentage(newValue);
    this.state.valueLeft = newValue;
    this.settings.valueLeft = newValue;

    this.setIsSmooth(this.state.valueLeft, this.state.valueRight);
    this.observerRender!.callAllObserver({ settings: this.settings, state: this.state });
  }

  public setStateRight(obj: { valueLeft?: number, valueRight: number }): void {
    let { valueRight } = obj;

    if (this.state.isPenultimateValue) {
      valueRight = this.state.penultimateValue;
      this.state.isPenultimateValue = false;
    }

    if (this.state.isPenultimate) {
      valueRight = this.newValueRight(valueRight);
      this.state.isPenultimate = false;
    }

    if (this.isPenultimateAndIsNotMaxValue(valueRight)) {
      this.state.newStepRight = Number.isInteger(this.settings.step) ? 0 : 0.1;
      this.state.penultimateValue = valueRight;
      this.state.isPenultimate = true;
    }

    const newValue = Math.max(valueRight, this.state.valueLeft + this.isFractional());
    this.state.percentageRight = this.getPercentage(newValue);
    this.state.valueRight = newValue;
    this.settings.valueRight = newValue;

    this.setIsSmooth(this.state.valueLeft, this.state.valueRight);
    this.observerRender!.callAllObserver({ settings: this.settings, state: this.state });
  }

  public getNewValueForState(obj: { width: number, coordinatesX: number }): void {
    const { width, coordinatesX } = obj;
    const percent: number = parseFloat(((100 / width) * coordinatesX).toFixed(1));
    const newValueForState: number = ((percent * (this.settings.max - this.settings.min)) / 100) + this.settings.min;

    this.setStateLeftOrRight({ value: Math.ceil(newValueForState) });
  }

  public setStateLeftOrRight(obj: { value: number }): void {
    const { value } = obj;
    let isRightNearer = Math.abs(this.state.valueRight - value) < Math.abs(this.state.valueLeft - value);

    if (!this.settings.isDouble) {
      isRightNearer = true;
    }

    if (isRightNearer) {
      this.setStateRight({ valueRight: value });
    } else {
      this.setStateLeft({ valueLeft: value });
    }

    this.setIsSmooth(this.state.valueLeft, this.state.valueRight);
    this.observerRender!.callAllObserver({ settings: this.settings, state: this.state });
  }

  private getPercentage(val: number): number {
    const { min, max } = this.settings;

    return Math.abs(((val - min) / (max - min)) * 100);
  }

  private setIsSmooth(valueLeft: number, valueRight: number): void {
    const difference = this.isFractional();

    if (Math.abs(valueRight - valueLeft) <= difference) {
      this.state.isSmooth = true;
    } else {
      this.state.isSmooth = false;
    }
  }

  private isFractional(): number {
    return Number.isInteger(this.settings.step) ? 1 : 0.1;
  }

  private newValueRight(valueRight: number): number {
    if (this.state.penultimateValue > valueRight) {
      this.state.newStepRight = this.settings.step;
      return parseFloat(Math.abs(this.state.penultimateValue - this.settings.step).toFixed(1));
    }

    this.state.isPenultimateValue = true;
    return this.settings.max;
  }

  private isPenultimateAndIsNotMaxValue(valueRight: number):boolean {
    return ((this.settings.max - this.settings.step) < valueRight) && (valueRight !== this.settings.max);
  }

  private isMinMoreThanRightAndMinMoreThanZero():boolean {
    return (this.settings.min > this.settings.valueRight && this.settings.min >= 0);
  }

  private isMinMoreThanRightAndMinLessThanZero():boolean {
    return (this.settings.min > this.settings.valueRight && this.settings.min <= 0);
  }

  private isMaxLessThanLeftAndMaxMoreThanZero():boolean {
    return (this.settings.max < this.settings.valueLeft && this.settings.max >= 0);
  }

  private isMaxLessThanLeftAndMaxLessThanZero():boolean {
    return (this.settings.max < this.settings.valueLeft && this.settings.max <= 0);
  }

  private isLeftMoreThanRightAndRightLessThanZero():boolean {
    return (this.settings.valueLeft >= this.settings.valueRight && this.settings.valueRight >= 0);
  }

  private isLeftMoreThanRightAndRightMoreThanZero():boolean {
    return (this.settings.valueLeft >= this.settings.valueRight && this.settings.valueRight <= 0);
  }
}
