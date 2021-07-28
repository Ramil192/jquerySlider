import { IView } from '../View/interface';
import { IModel } from '../Model/interface';
import { IObserver, IObserverTrack, IObserverScale, IObserverLeft, IObserverRight } from '../Observer/interface';

export interface IController {
  view: IView
  model: IModel
  observerControllerView: IObserver;
  observerControllerModel: IObserver;
  observerControllerModelLeft: IObserverLeft;
  observerControllerModelRight: IObserverRight;
  observerControllerModelScale: IObserverScale;
  observerControllerModelTrack: IObserverTrack;

  init(): void
}
