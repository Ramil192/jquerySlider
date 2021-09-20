import { IView } from '../View/interface';
import { IModel, ISettings, IState } from '../Model/interface';
import {
  IObserver,
  IObserverLeftArgument,
  IObserverRightArgument,
  IObserverScaleArgument,
  IObserverTrackArgument,
  IObserverViewArgument,
} from '../Observer/interface';

import Observer from '../Observer/Observer';

export default class Controller {
  private view: IView;
  private model: IModel;

  private observerRender: IObserver<IObserverViewArgument>;
  private observerControllerModelLeft: IObserver<IObserverLeftArgument>;
  private observerControllerModelRight: IObserver<IObserverRightArgument>;
  private observerControllerModelScale: IObserver<IObserverScaleArgument>;
  private observerControllerModelTrack: IObserver<IObserverTrackArgument>;

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
    this.observerRender.addObserver(this.subscriberRender.bind(this));
    this.model.setObserver(this.observerRender);
    this.model.checkSettings();

    this.observerControllerModelLeft.addObserver(this.subscriberThumbLeft.bind(this));
    this.view.setObserverLeft(this.observerControllerModelLeft);

    this.observerControllerModelRight.addObserver(this.subscriberThumbRight.bind(this));
    this.view.setObserverRight(this.observerControllerModelRight);

    this.observerControllerModelScale.addObserver(this.subscriberScale.bind(this));
    this.view.setObserverScale(this.observerControllerModelScale);

    this.observerControllerModelTrack.addObserver(this.subscriberTrack.bind(this));
    this.view.setObserverTrack(this.observerControllerModelTrack);
  }

  private subscriberRender(obj: { settings: ISettings, state: IState }) {
    this.view.render(obj);
  }

  private subscriberThumbLeft(obj: { valueLeft: number, fromLeftEdge?: number, width?: number }) {
    this.model.setStateLeft(obj);
  }

  private subscriberThumbRight(obj: { valueRight: number, fromRightEdge?: number, width?: number }) {
    this.model.setStateRight(obj);
  }

  private subscriberScale(obj: { value: number }) {
    this.model.setStateLeftOrRight(obj);
  }

  private subscriberTrack(obj: { width: number, coordinatesX: number }) {
    this.model.getNewValueForState(obj);
  }
}
