export default class Model {
  constructor(settings) {
    this.settings = settings;
    this.state = {
      valueLeft: this.settings.valueLeft,
      valueRight: this.settings.valueRight,
      percentageLeft: this.getPercentage(this.settings.valueLeft),
      percentageRight: this.getPercentage(this.settings.valueRight),
    }
  }

  getPercentage(val) {
    const { min, max } = this.settings;
    return ((val - min) / (max - min)) * 100;
  }

  changeInputLeft(_this, inputRightValue) {

    if (this.settings.isDouble) {

      _this.val(Math.min(parseInt(_this.val()), parseInt(inputRightValue) - 1));

      this.state.percentageLeft = this.getPercentage(_this.val());
      this.state.valueLeft = _this.val();

    }
    else {
      _this.attr({ 'min': min - 1 });
      _this.val(min - 1)
    }
  };

  changeInputRight(_this, inputLeftValue) {

    _this.val(Math.max(parseInt(_this.val()), parseInt(inputLeftValue) + 1))

    this.state.percentageRight = this.getPercentage(_this.val());
    this.state.valueRight = _this.val();
  };

  scaleClick(event, inputLeft, inputRight) {

    let newText = +event.target.innerHTML;
    if (this.settings.isDouble) {
      if (+inputLeft.val() > newText) {
        inputLeft.val(newText);
        this.changeInputLeft(inputLeft, inputRight.val());
      };
      if (+inputRight.val() < newText) {
        inputRight.val(newText);
        this.changeInputRight(inputRight, inputLeft.val());
      };
    } else {
      if (+inputRight.val() > newText) {
        inputRight.val(newText);
        this.changeInputRight(inputRight, inputLeft.val());
      };
      if (+inputRight.val() < newText) {
        inputRight.val(newText);
        this.changeInputRight(inputRight, inputLeft.val());
      };
    }

  };
}