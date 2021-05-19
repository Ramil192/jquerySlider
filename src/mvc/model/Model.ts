import { ISettings, IState, IModel } from './interfaceForModel'

export default class Model implements IModel {
  settings: ISettings
  state: IState
  constructor(settings: ISettings) {
    this.settings = settings;
    this.state = {
      valueLeft: 0,
      valueRight: 0,
      percentageLeft: 0,
      percentageRight: 0,
    }
  }

  checkSettings(prevLeft = 0, prevRight = 0) {
    const { min, max, valueLeft, valueRight, isDouble } = this.settings;

    if (valueLeft > max) {
      this.settings.valueLeft = max;
    }

    if (valueLeft < min) {
      this.settings.valueLeft = min;
    }

    if (valueRight > max) {
      this.settings.valueRight = max;
    }

    if (valueRight < min) {
      this.settings.valueRight = min;
    }


    if (!isDouble) {
      this.settings.valueLeft = min;
    }
    if (min > max) {
      this.settings.max = +min + 1;
    }

    if (valueLeft > valueRight) {
      this.settings.valueLeft = prevLeft;
    }

    if (valueRight < valueLeft) {
      this.settings.valueRight = prevRight;
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

  changeInputLeft(_this: JQuery, inputRightValue: number): void {
    const { min } = this.settings;
    if (this.settings.isDouble) {
      _this.val(Math.min(+_this.val()!, inputRightValue - 1));

      this.state.percentageLeft = this.getPercentage(+_this.val()!);
      this.state.valueLeft = +_this.val()!;
      this.settings.valueLeft = +_this.val()!;
    }
    else {
      _this.attr({ 'min': min - 1 });
      _this.val(min - 1)
    }
  };

  changeInputRight(_this: JQuery, inputLeftValue: number): void {
    _this.val(Math.max(+_this.val()!, inputLeftValue + 1))

    this.state.percentageRight = this.getPercentage(+_this.val()!);
    this.state.valueRight = +_this.val()!;
    this.settings.valueRight=+_this.val()!;
  };

  scaleClick(innerHTML: number, inputLeft: JQuery, inputRight: JQuery): void {
    let newText = innerHTML;

    if (this.settings.isDouble) {
      if (+inputLeft.val()! > newText) {
        inputLeft.val(newText);
        this.changeInputLeft(inputLeft, +inputRight.val()!);
      };
      if (+inputRight.val()! < newText) {
        inputRight.val(newText);
        this.changeInputRight(inputRight, +inputLeft.val()!);
      };
    } else {
      if (+inputRight.val()! > newText) {
        inputRight.val(newText);
        this.changeInputRight(inputRight, +inputLeft.val()!);
      };
      if (+inputRight.val()! < newText) {
        inputRight.val(newText);
        this.changeInputRight(inputRight, +inputLeft.val()!);
      };
    }
  };
}
