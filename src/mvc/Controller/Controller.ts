import { IView } from '../View/interface';
import { IModel } from '../Model/interface';
import {
  IObserver, IObserverTrack, IObserverScale, IObserverLeft, IObserverRight,
} from '../Observer/interface';

import Observer from '../Observer/Observer';

export default class Controller {
  private view: IView;
  private model: IModel;

  private observerRender: IObserver;
  private observerControllerModelLeft: IObserverLeft;
  private observerControllerModelRight: IObserverRight;
  private observerControllerModelScale: IObserverScale;
  private observerControllerModelTrack: IObserverTrack;

  constructor(model: IModel, view: IView) {
    this.model = model;
    this.view = view;

    this.observerRender = new Observer();
    this.observerControllerModelLeft = new Observer();
    this.observerControllerModelRight = new Observer();
    this.observerControllerModelScale = new Observer();
    this.observerControllerModelTrack = new Observer();
  }

  public init(): void {
    this.observerRender.addObserver(this.view.render.bind(this.view));
    this.model.setObserver(this.observerRender);
    this.model.checkSettings();

    this.observerControllerModelLeft.addObserver(this.model.setStateLeft.bind(this.model));
    this.view.setObserverLeft(this.observerControllerModelLeft);

    this.observerControllerModelRight.addObserver(this.model.setStateRight.bind(this.model));
    this.view.setObserverRight(this.observerControllerModelRight);

    this.observerControllerModelScale.addObserver(this.model.setStateLeftOrRight.bind(this.model));
    this.view.setObserverScale(this.observerControllerModelScale);

    this.observerControllerModelTrack.addObserver(this.model.getNewValueForState.bind(this.model));
    this.view.setObserverTrack(this.observerControllerModelTrack);
  }
}
