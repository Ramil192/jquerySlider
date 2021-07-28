import { IView } from '../View/interface';
import { IModel } from '../Model/interface';
import { IObserver, IObserverTrack, IObserverScale, IObserverLeft,IObserverRight } from '../Observer/interface';

import Observer from '../Observer/Observer';
import ObserverTrack from '../Observer/ObserverTrack';
import ObserverScale from '../Observer/ObserverScale';
import ObserverLeft from '../Observer/ObserverLeft';
import ObserverRight from '../Observer/ObserverRight';

export default class Controller {
  private view: IView;
  private model: IModel;

  private observerControllerView: IObserver;
  private observerControllerModelLeft: IObserverLeft;
  private observerControllerModelRight: IObserverRight;
  private observerControllerModelScale: IObserverScale;
  private observerControllerModelTrack: IObserverTrack;

  constructor(model: IModel, view: IView) {
    this.model = model;
    this.view = view;

    this.observerControllerView = new Observer();
    this.observerControllerModelLeft = new ObserverLeft();
    this.observerControllerModelRight = new ObserverRight();
    this.observerControllerModelScale = new ObserverScale();
    this.observerControllerModelTrack = new ObserverTrack();
  }

  public init(): void {
    const mainRenderView = this.view.render.bind(this.view, this.model.settings, this.model.state);
    this.observerControllerView.addObserver(mainRenderView);
    this.model.setObserver(this.observerControllerView);
    this.model.checkSettings();

    this.observerControllerModelLeft.addObserver(this.model.setStateForLeftInput.bind(this.model));
    this.view.setObserverLeft(this.observerControllerModelLeft);

    this.observerControllerModelRight.addObserver(this.model.setStateForRightInput.bind(this.model));
    this.view.setObserverRight(this.observerControllerModelRight);

    this.observerControllerModelScale.addObserver(this.model.setStateForInput.bind(this.model));
    this.view.setObserverScale(this.observerControllerModelScale);

    this.observerControllerModelTrack.addObserver(this.model.getValueClickTrack.bind(this.model));
    this.view.setObserverTrack(this.observerControllerModelTrack);

  }
}
