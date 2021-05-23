import { IView } from '../view/interfaceForView';
import { IModel } from '../model/interfaceForModel';

export default class Controller {
  view: IView;
  model: IModel;

  constructor(model: IModel, view: IView) {
    this.view = view;
    this.model = model;
  }

  init(): void {
    const inputLeft = this.view.inputLeft.input;
    const inputRight: JQuery = this.view.inputRight.input;
    const scale = this.view.scale.divScale;

    inputLeft.bind('input', () => {
      this.model.changeInputLeft(inputLeft, +inputRight.val()!);
      this.view.renderThumbLeft();
    });

    inputRight.bind('input', () => {
      this.model.changeInputRight(inputRight, +inputLeft.val()!);
      this.view.renderThumbRight();
    });

    scale.bind('click', (e: JQuery.ClickEvent<HTMLElement, undefined, HTMLElement, HTMLElement>) => {
      this.model.scaleClick(+e.target.innerHTML, inputLeft, inputRight);
      this.view.renderThumbLeft();
      this.view.renderThumbRight();
    });

    this.view.init();
    this.view.render();
  }
}
