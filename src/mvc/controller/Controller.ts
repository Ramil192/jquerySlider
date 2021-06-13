import { IView } from '../view/interface';
import { IModel } from '../model/interfacel';

export default class Controller {
  view: IView;
  model: IModel;

  constructor(model: IModel, view: IView) {
    this.view = view;
    this.model = model;
  }

  init(): void {
    const { inputLeft,inputRight } = this.view;
    const { scale } = this.view.scale;

    inputLeft.bind('input', () => {
      this.model.changeInputLeft(inputLeft, +inputRight.val()!);
      this.view.renderThumbLeft(
        this.model.settings.isDouble,
        this.model.settings.min,
        this.model.state.valueLeft,
        this.model.state.percentageLeft,
      );
    });

    inputRight.bind('input', () => {
      this.model.changeInputRight(inputRight, +inputLeft.val()!);
      this.view.renderThumbRight(
        this.model.settings.isVertical,
        this.model.state.valueRight,
        this.model.state.percentageRight,
      );
    });

    scale.bind('click', (e: JQuery.ClickEvent<HTMLElement, undefined, HTMLElement, HTMLElement>) => {
      this.model.scaleClick(+e.target.innerHTML, inputLeft, inputRight);
      this.view.renderThumbLeft(
        this.model.settings.isDouble,
        this.model.settings.min,
        this.model.state.valueLeft,
        this.model.state.percentageLeft,
      );
      this.view.renderThumbRight(
        this.model.settings.isVertical,
        this.model.state.valueRight,
        this.model.state.percentageRight,
      );
    });

    this.view.init();
    this.view.render({ ...this.model.settings, ...this.model.state });
  }
}
