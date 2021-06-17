import { IView } from '../view/interface';
import { IModel } from '../model/interfacel';

export default class Controller {
  view: IView;
  model: IModel;

  constructor(model: IModel, view: IView) {
    this.model = model;
    this.view = view;
  }

  init(): void {
    const { inputLeft, inputRight } = this.view;
    const { scale } = this.view.scale;

    inputLeft.bind('input', (e) => {
      this.model.setStateForLeftInput(+(<HTMLInputElement>e.target).value);
      this.view.renderThumbLeft(
        this.model.settings.isDouble,
        this.model.settings.min,
        this.model.state.valueLeft,
        this.model.state.percentageLeft,
      );
    });

    inputRight.bind('input', (e) => {
      this.model.setStateForRightInput(+(<HTMLInputElement>e.target).value);
      this.view.renderThumbRight(
        this.model.settings.isVertical,
        this.model.state.valueRight,
        this.model.state.percentageRight,
      );
    });

    scale.bind('click', (e: JQuery.ClickEvent<HTMLElement, undefined, HTMLElement, HTMLElement>) => {
      this.model.setStateForInput(+e.target.innerHTML);
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
      console.log(e.clientX, e.clientY);
    });

    this.view.init();
    this.view.render({ ...this.model.settings, ...this.model.state });
  }
}
