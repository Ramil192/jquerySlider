import { IView } from '../View/interface';
import { IModel } from '../Model/interface';
import { IObserver } from '../Observer/interface';

import Observer from '../Observer/Observer'


export default class Controller {
  private view: IView;
  private model: IModel;
  observerControllerModel: IObserver;
  observerControllerView: IObserver;

  constructor(model: IModel, view: IView) {
    this.model = model;
    this.view = view;
    this.observerControllerModel = new Observer();
    this.observerControllerView = new Observer();
  }


  public init(): void {
    const mainRenderView = this.view.render.bind(this.view, this.model.settings, this.model.state);
    this.observerControllerView.addObserver(mainRenderView);
    this.model.setObserver(this.observerControllerView);
    this.model.checkSettings();

    // тут не получается с  parseInt так как TS ругается что может val() может быть undefined 
    this.observerControllerModel.addObserver(()=>this.model.setStateForRightInput(+this.view.inputRight.val()!));
    this.observerControllerModel.addObserver(()=>this.model.setStateForLeftInput(+this.view.inputLeft.val()!));
    this.view.setObserver(this.observerControllerModel);
  }
}
