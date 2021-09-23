import { IView, ViewActionTypes } from '../View/interface';
import { IModel, ModelActionTypes } from '../Model/interface';

export default class Controller {
  private view: IView;
  private model: IModel;

  constructor(model: IModel, view: IView) {
    this.model = model;
    this.view = view;
  }

  public init(): void {
    this.observeModelChange();
    this.observeViewChange();

    this.model.checkSettings();
  }

  private observeModelChange() {
    this.model.addObserver((data) => {
      switch (data.type) {
        case ModelActionTypes.RENDER:
          this.view.render(data.value); break;
        default: () => { };
      }
    });
  }

  private observeViewChange() {
    this.view.addObserver((data) => {
      switch (data.type) {
        case ViewActionTypes.LEFT:
          this.model.setStateLeft(data.value); break;
        case ViewActionTypes.RIGHT:
          this.model.setStateRight(data.value); break;
        case ViewActionTypes.SCALE:
          this.model.setStateLeftOrRight(data.value); break;
        case ViewActionTypes.TRACK:
          this.model.getNewValueForState(data.value); break;
        default: () => { };
      }
    });
  }
}
