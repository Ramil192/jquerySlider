import { IView } from '../View/interface';
import { IModel } from '../Model/interface';
import { IObserver, IObserverTrack, IObserverScale, IObserverLeft,IObserverRight } from '../Observer/interface';

import ObserverT from '../Observer/ObserverT';

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

    this.observerRender = new ObserverT();
    this.observerControllerModelLeft = new ObserverT();
    this.observerControllerModelRight = new ObserverT();
    this.observerControllerModelScale = new ObserverT();
    this.observerControllerModelTrack = new ObserverT();
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
