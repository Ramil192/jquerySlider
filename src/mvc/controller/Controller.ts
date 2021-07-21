import { IView } from '../view/interface';
import { IModel } from '../model/interface';

export default class Controller {
  private view: IView;
  private model: IModel;

  constructor(model: IModel, view: IView) {
    this.model = model;
    this.view = view;
  }

  public init(): void {
    const { inputLeft, inputRight } = this.view;

    const { scale } = this.view.scale;

    inputLeft.bind('input', (e) => {
      this.model.setStateForLeftInput(parseInt((<HTMLInputElement>e.target).value, 10));

      this.view.renderThumbLeft(
        this.model.settings.isDouble,
        this.model.settings.min,
        this.model.state.valueLeft,
        this.model.state.percentageLeft,
      );
    });

    inputRight.bind('input', (e) => {
      this.model.setStateForRightInput(parseInt((<HTMLInputElement>e.target).value, 10));

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
    });


    this.view.init();
    this.view.render({ ...this.model.settings, ...this.model.state });
  }
}
