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

  checkSettings() {
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
      this.settings.valueLeft = min - 1;
    }

    this.state.valueLeft = valueLeft;
    this.state.valueRight = this.settings.valueRight;
    this.state.percentageLeft = this.getPercentage(valueLeft);
    this.state.percentageRight = this.getPercentage(this.settings.valueRight);
  }



  getPercentage(val: number): number {
    const { min, max } = this.settings;
    return ((val - min) / (max - min)) * 100;
  }

  changeInputLeft(_this: JQuery, inputRightValue: number): void {
    const { min } = this.settings;
    if (this.settings.isDouble) {
      _this.val(Math.min(+_this.val()!, inputRightValue - 1));

      this.state.percentageLeft = this.getPercentage(+_this.val()!);
      this.state.valueLeft = +_this.val()!;
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

  // setMin(min) {
  //   const { valueLeft, max } = this.settings;
  //   if (min < max) {
  //     this.settings.min = min;
  //     this.setValueLeft(valueLeft);
  //   }
  // }

  // setMax(max) {
  //   const { valueRight, min } = this.settings;
  //   if (max > min) {
  //     this.settings.max = max;
  //     this.setValueRight(valueRight);
  //   }
  // }

  // setStep(step) {
  //   this.settings.step = step;
  // }

  // setValueLeft(value) {
  //   if (this.checkValueInput(value, true)) {
  //     this.state.valueLeft = value;
  //     this.state.percentageLeft = this.getPercentage(value);
  //   }
  // }

  // setValueRight(value) {
  //   if (this.checkValueInput(value, false)) {
  //     this.state.valueRight = value;
  //     this.state.percentageRight = this.getPercentage(value);
  //   }
  // }

  // checkValueInput(targetValue: number, leftInput: boolean) {
  //   const { min, max, isDouble } = this.settings;
  //   let { valueLeft, valueRight } = this.state;
  //   valueLeft = isDouble ? valueLeft : min;
  //   console.log(min, max, valueLeft, valueRight);
  //   if (leftInput) {
  //     if (targetValue > max || targetValue < min || targetValue > valueRight) {
  //       return false;
  //     }
  //   } else {
  //     if (targetValue > max || targetValue < min || targetValue < valueLeft) {
  //       return false;
  //     }
  //     console.log();
  //   }


  //   return true;
  // }


  // setIsLabel(flag) {
  //   this.settings.isLabel = flag;
  // }

  // setIsScale(flag) {
  //   this.settings.isScale = flag;
  // }

  // setIsDouble(flag) {
  //   this.settings.isDouble = flag;
  // }

  // setIsVertical(flag) {
  //   this.settings.isVertical = flag;
  // }


}
