export default class Controller {
  constructor(model, view) {
    this.view = view;
    this.model = model;
  }
  init() {
    const inputLeft = this.view.inputLeft.input;
    const inputRight = this.view.inputRight.input;
    const scale = this.view.scale.divScale;
    
    inputLeft.bind('input', () => {
      this.model.changeInputLeft(inputLeft, inputRight.val());
      this.view.renderThumbLeft();
    });
    inputRight.bind('input', () => {
      this.model.changeInputRight(inputRight, inputLeft.val());
      this.view.renderThumbRight();
    });
    
    scale.bind('click', (e) => {
      this.model.scaleClick(e, inputLeft, inputRight);
    });
  }
}