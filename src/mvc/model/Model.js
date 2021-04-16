export default class Model {
  constructor(settings) {
    this.settings = settings;
    this.state = {
      valueLeft: 0,
      valueRight: 0,
      percentLeft: 0,
      percentRight: 0,
    }
  }

  changeInputLeft(_this) {
    if (isDouble) {
      const { valueLeft, percentLeft } = this.state;
      const { min } = this.settings;
      let min = parseInt(_this.attr('min'));
      let max = parseInt(_this.attr('max'));
      _this.val(Math.min(parseInt(_this.val()), parseInt(inputRight.val()) - 1));

      percentLeft = ((_this.val() - min) / (max - min)) * 100;
      valueLeft = _this.val;

    }
    else {
      _this.attr({ 'min': min - 1 });
      _this.val(min - 1)
    }
  }

  inputLeft(_this) {
    let { percentRight, valueRight } = model.state;

    let min = parseInt(_this.attr('min'));
    let max = parseInt(_this.attr('max'));

    _this.val(Math.max(parseInt(_this.val()), parseInt(inputLeft.val()) + 1))

    percentRight = ((_this.val() - min) / (max - min)) * 100;
    valueRight = _this.val();
  }
}